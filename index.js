var fs = require('fs');
var extend = require('extend');
var flatten = require('flatten');

function squash(overrides) {
    var defaults = {
        bowerDirectory: 'bower_components',
        bowerFile: 'bower.json',
        outFile: 'vendor.js'
    };

    var opts = extend({}, defaults, overrides);

    fs.readFile(opts.bowerFile, function(err, bowerContent) {
        if(err) {
            console.error('Could not find bower.json file.');
            throw err;
        }
        var bowerJson = JSON.parse(bowerContent);

        var files = [];
        Object.keys(bowerJson.dependencies).forEach(function(dependency) {
            var path = opts.bowerDirectory + '/' + dependency;
            var content = fs.readFileSync(path + '/bower.json');
            var json = JSON.parse(content);

            var mainFiles = flatten([ json.main ]);

            mainFiles.forEach(function(mainFile) {
                if(mainFile.indexOf('.js') > -1) {
                    files.push(path + '/' + mainFile);
                }
            });

        });

        var contents = files.map(function(file) {
            return fs.readFileSync(file, 'UTF-8');
        });

        fs.writeFile(opts.outFile, contents.join('\n'), function(err) {
            if(err) {
                console.error('could not write to ' + opts.outFile + '. Sorry!');
                throw err;
            }

            console.log(files.length + ' file' + (files.length !== 1 ? 's' : '')
                + ' written to ' + opts.outFile + ' for a total of '
                + contents.join('\n').length + ' bytes.');
        });
    });
}

module.exports = squash;

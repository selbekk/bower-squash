var fs = require('fs');
var extend = require('extend');

function squash(overrides) {
    var defaults = {
        bowerDirectory: 'bower_components',
        bowerFile: 'bower.json',
        outFile: 'vendor.js',
        minify: false
    };

    var opts = extend({}, defaults, overrides);

    fs.readdir(opts.bowerDirectory, function(err, dependencies) {
        if(err) {
            console.error('Could not find bower_components directory.');
            throw err;
        }
        var files = [];
        dependencies.forEach(function(dependency) {
            var path = opts.bowerDirectory + '/' + dependency;
            var content = fs.readFileSync(path + '/bower.json');
            var json = JSON.parse(content);

            if(!json.main) {
                return;
            }

            if(json.main.constructor === Array) {
                json.main.forEach(function(mainFile) {
                    files.push(path + '/' + mainFile);
                });
            }
            else {
                files.push(path + '/' + json.main);
            }
        });

        var contents = [];
        files.forEach(function(file) {
            contents.push(fs.readFileSync(file, 'UTF-8'));
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

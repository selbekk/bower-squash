#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');
var squash = require('./');

var args = [
    { short: 'h', full: 'help' },
    { short: 'v', full: 'version' },
    { short: 'b', full: 'bowerJson' },
    { short: 'd', full: 'directory' }
];

function help() {
    console.log('Usage: bower-squash [options]');
    console.log('');
    console.log('Options:');
    console.log('  -h, --help         # Print usage information');
    console.log('  -v, --version      # Print the version');
    console.log('  -b, --bowerJson    # Path to `bower.json`');
    console.log('  -d, --directory    # Your Bower directory');
}

if(argv.v || argv.version) {
    console.log('Version: ' + pkg.version);
    return;
}

if(argv.h || argv.help) {
    help();
    return;
}

var opts = {};
delete argv._;
Object.keys(argv).forEach(function(key) {
    var argument = args.filter(function(arg) { return key === arg.short || key === arg.full })[0];
    if(argument) {
        opts[argument.full] = argv[key];
    }
    else {
        console.error('Warning: Unrecognized option "' + key + '"');
    }
});

squash(opts);

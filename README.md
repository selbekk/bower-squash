# bower-squash

When you want all your ``bower_components`` javascript in a single file.

## Usage

Still only programmatic usage. Planned support for CLI and Gulp integrations.

    npm install --save-dev bower-squash

### Options

Specify options when you squash.

    {
        bowerDirectory: 'bower_components', // Your bower_components directory
        bowerFile: '.', // Path to your bower.json (default is current dir)
        outFile: 'vendor.js'  // Name of the resulting out-file
    }

### Programmatic usage

    var squash = require('bower-squash');
    squash();

## Contributing

Feel free to contribute as much as you want. Pull requests or issues - will love
them both.

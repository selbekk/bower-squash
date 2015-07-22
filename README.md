# bower-squash

When you want all your ``bower_components`` javascript in a single file.

## Usage

CLI and programmatic support so far. Planned support for Gulp integration.
Either way - install it like so:

    npm install --save-dev bower-squash

### Options

Specify options when you squash.

    {
        bowerDirectory: 'bower_components', // Your bower_components directory
        bowerFile: 'bower.json', // Path to your bower.json (default is current dir)
        outFile: 'vendor.js'  // Name of the resulting out-file
    }

### Programmatic usage

    var squash = require('bower-squash');
    squash();

### Command line usage

    $ bower-squash [options]

Available options:

    -b, --bowerJson    # Path to bower.json
    -d, --directory    # Your Bower directory
    -h, --help         # Print usage information
    -v, --version      # Print the version

## Contributing

Feel free to contribute as much as you want. Pull requests or issues - will love
them both.

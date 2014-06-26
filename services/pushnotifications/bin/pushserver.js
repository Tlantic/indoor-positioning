


var config = require('../lib/Config'),
    web = require('../lib/Web'),
    pack = require('../package'),
    program = require('commander'),
    fs = require('fs'),
    path = require('path');


var configPath = "../example.config.json";
if (configPath) {
    configPath = configPath.indexOf('/') === 0 ? configPath : path.join(process.cwd(), configPath);
    console.log(configPath)
    if (!fs.existsSync(configPath)) {
        console.log('The configuration file doesn\'t exist.');
       
    }
} else {
    console.log('You must provide a configuration file.');
   
}

config.initialize(configPath);
web.start();
'use strict';

var express = require('express'),
    appPath = process.cwd(),
    util    = require('./util');



module.exports = function run(config) {

    function bootstrapModels() {
        util.recursiveNavigation(appPath + config.modelsPath, null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    var app = express();

    require('./express')(app, config);

    return app;

}

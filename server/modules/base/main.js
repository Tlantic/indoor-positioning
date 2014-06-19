'use strict';

var express = require('express'),
    appPath = process.cwd(),
    util    = require('./util');



module.exports = function run(security, config) {

    function bootstrapModels() {
        util.recursiveNavigation(appPath + config.modelsPath, null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    var app = express();

    require('./express')(app, security, config);

    return app;

}

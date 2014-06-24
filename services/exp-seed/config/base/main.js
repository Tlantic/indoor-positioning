'use strict';

var express = require('express'),
    appPath = process.cwd(),
    util    = require('./util');



module.exports = function run(config) {

    var app = express();

    require('./express')(app, config);

    return app;

}

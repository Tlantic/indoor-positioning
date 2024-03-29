'use strict';

var express = require('express'),
    appPath = process.cwd(),
    util    = require('./util');

module.exports = function run(security, config) {

    var app = express();

    require('./express')(app, security, config);

    return app;

}

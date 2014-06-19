'use strict';

var _ = require('lodash'),
    fs = require('fs');

process.env.NODE_ENV = ~fs.readdirSync('./config/env').map(function(file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';


module.exports = _.extend(
    require('./env/general'),
    require('./env/' + process.env.NODE_ENV) || {}
);
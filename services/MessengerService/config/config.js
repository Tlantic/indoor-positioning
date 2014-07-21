'use strict';

var  fs = require('fs');

process.env.NODE_ENV = fs.readdirSync('./config/env').map(function(file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';


module.exports =  require('./env/' + process.env.NODE_ENV) || {};
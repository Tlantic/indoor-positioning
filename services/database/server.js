'use strict';
var mongoose = require('mongoose');

// Initializing system variables
var config = require('./config/config');
var db = mongoose.connect(config.db);
var app = require('./config/base/main')(config);


app.listen(config.port, config.hostname);
console.log('App started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');


// Expose app
exports = module.exports = app;
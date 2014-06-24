'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    expressValidator = require('express-validator'),
    appPath = process.cwd(),
    util = require('./util'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {

    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');
    
    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(expressValidator());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json())
    app.use(methodOverride());
    app.use(function(req, res, next) {
      res.contentType('application/json');
      next();
    });
        

    var router = express.Router(); 

    function bootstrapRoutes() {

        util.recursiveNavigation(appPath + '/routes', null, function(path) {
            require(path)(router);
        });
        
    }
    
    bootstrapRoutes();
    
    app.use('/database', router);

   

    app.use(function(err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).send({
                result: err.stack
            });
        });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
            console.log(req.originalUrl);
            res.status(404).send({result:'Url not found!'});
        });

    // Error handler - has to be last
    if (process.env.NODE_ENV === 'development') {
        app.use(errorHandler());
    }

    process.on('uncaughtException', function (err) {
        console.log(" UNCAUGHT EXCEPTION ");
        console.log("[Inside 'uncaughtException' event] " + err.stack || err.message);
    });


};
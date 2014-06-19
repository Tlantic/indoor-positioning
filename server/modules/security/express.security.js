/* jslint node: true */
var jwt = require('jsonwebtoken');
var SecurtyError = require('./error.security')

module.exports = function(options){
    //if (!options || !options.secret) throw new Error('secret should be set');

    return function(req, res, next) {

      var headerKey = options.headerKey || 'auth';

      if(req.headers){
        if(req.headers.hasOwnProperty(headerKey)){
          var token = req.headers[headerKey];

          if(token==undefined){

            res.send(new SecurtyError('credentials_required', { message: 'No Authorization header was found' }));
          }

          jwt.verify(token, options.secret, options, function(err, decoded) {
            if (err) {

              return next('ERROR');
            }

            console.log(decoded);
            req.user = decoded;

            next();
          });

        }
        else{
          res.send(new SecurtyError('credentials_required', { message: 'No Authorization header was found' }));
        }
      }

    };
};
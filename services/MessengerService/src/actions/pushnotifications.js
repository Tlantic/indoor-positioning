var	when = require('when'),
	db 	 = require('tlantic-db'),
	tlanticQueue = require('tlantic-queue'),
	config = require('../../config/config'),
	_ = require('lodash'),
	http = require('http'),
    url = require('url');

exports.send= function(data){
	var d = when.defer();
	
	_request(config.push.url, {
		method: 'POST',
		params: data
	}, function(body, res) {
		d.resolve('PUSH_NOTIFICATION_SENDING');
	}, function(e) {
		d.reject(e);
	});

	return d.promise;
}



_request = function(connection, options, callback, error){
	try{

    var reqUrl = url.parse(connection);
 
    // http.request settings
    var settings = {
        host: reqUrl.hostname,
        port: reqUrl.port || 80,
        path: reqUrl.pathname,
        headers: options.headers || {},
        method: options.method || 'GET'
    };

  
    if(options.params){
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = options.params.length;
    };
 
    var req = http.request(settings);
  
    if(options.params){ req.write(options.params) };

 
    req.on('response', function(res){
    	   
        res.body = '';
        res.setEncoding('utf-8');
 
        res.on('data', function(chunk){ res.body += chunk });
 
        res.on('end', function(){
            callback(res.body, res);
        });
    });

    req.on('error', function(e) {
	  error(e);
	});
 

    req.end();

	}catch(e){
		throw new Error('oops!');
	}
	
}

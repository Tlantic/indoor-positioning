var	when = require('when'),
	db 	 = require('tlantic-db'),
	tlanticQueue = require('tlantic-queue'),
	config = require('../../config/config'),
	_ = require('lodash'),
	http = require('http'),
    url = require('url');


exports.resolve = function(device, rule){
	var d = when.defer();

	var conditions ={
		macAddr:device.mac
	}

	db.find('device', conditions).then(function(result) {
		var device;
		if(!result || result.length!=1)
			d.reject('ERROR_ON_GET_DEVICE');
		else
			device = result[0];

		
		var message = _createMessageBody(device.name, rule.actionParams, device.os);

		if(!message)
			d.reject('ERROR_ON_CREATE_PUSH_MESSAGE');


		var options = {
			key: config.outputQueue.routes[0].key,
			exchanger:config.outputQueue.exchange,
			url: config.outputQueue.url
		}

		tlanticQueue.queueSendToExchanger(JSON.stringify(message), options,
			function success(){
				console.log('SET PUSH MESSAGES IN QUEUE');
				d.resolve(message);
			}, function error(e){
				d.reject(error);
		});
		
		

	}).catch(function(error){
		d.reject(error);
	});


	return d.promise;
}

_createMessageBody = function(sendTo, params, platform) {
	
	if (platform === 'ANDROID') {
		return {
			users: [sendTo],
			android: {
				collapseKey: 'optional',
				data: {
					message: _.where(params, { 'code': 'MESSAGE' })[0].value,
					alert: _.where(params, { 'code': 'MESSAGE' })[0].value
				}
			}
		}
	}

	if (platform === 'IOS') {
		return {
			users: [sendTo],
			ios: {
				badge: 0,
				alert: _.where(params, { 'code': 'MESSAGE' })[0].value,
				sound: "soundName"
			}
		}
	}


	return false;

}




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

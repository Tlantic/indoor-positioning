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
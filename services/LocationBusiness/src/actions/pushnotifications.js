var	when = require('when'),
	db 	 = require('tlantic-db'),
	tlanticQueue = require('tlantic-queue'),
	config = require('../../config/config');


exports.resolve = function(data){
	var d = when.defer();
	

	var conditions ={
		macAddr:data.mac
	}

	db.find('device', conditions).then(function(result) {
		var device;
		if(!result || result.length!=1)
			d.reject('ERROR_ON_GET_DEVICE');
		else
			device = result[0];

		var message = _createMessageBody(device.name, data.actionData.message, device.os);

		if(!message)
			d.reject('ERROR_ON_CREATE_PUSH_MESSAGE');


		var options = {
			key: config.outputQueue.routes[0].key,
			exchanger:config.outputQueue.exchange,
			url: config.outputQueue.url
		}

		tlanticQueue.queueSendToExchanger(JSON.stringify(message), options,
			function success(){
				d.resolve(message);
			}, function error(e){
				d.reject(error);
		});
		
		

	}).catch(function(error){
		d.reject(error);
	});


	return d.promise;
}

_createMessageBody = function(sendTo, message, platform) {
	console.log(platform);
	if (platform === 'ANDROID') {
		return {
			users: [sendTo],
			android: {
				collapseKey: 'optional',
				data: {
					message: message
				}
			}
		}
	}

	if (platform === 'IOS') {
		return {
			users: [sendTo],
			ios: {
				badge: 0,
				alert: message,
				sound: "soundName"
			}
		}
	}

	return false;

}


exports.send= function(data, success){

	/*var rest = new Rest();

	console.log(data);

	rest.post(config.push.url, data, function(msg, response) {
		console.log(msg);
		success();
	});*/

}
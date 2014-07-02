var mqtt = require('mqtt');
var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');

exports.init = function(){
	
	var obj = {	
		username: config.mqtt.user.username,
		password: config.mqtt.user.password
	};

	var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);
	var id=0;
	client.subscribe(config.mqtt.id);
	client.on('message', function(topic, message) {
		id++;
		var resp = JSON.parse(message);
		//rules.manager(resp);
		
		var respMsg = {
			id:id,
			mac:'12:11:22:11',
			area:'A1',
			direction:'in',
			timestamp:'111111'
		}

		var options = {
			key: config.queue.key,
			exchanger:config.queue.exchange,
			url: config.queue.url
		}

		tlanticQueue.queueSendToExchanger(JSON.stringify(respMsg), options,
			function success(){
				console.log('ok');
			}, function error(){
				console.log('error');
			});

	});

}

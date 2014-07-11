var mqtt = require('mqtt');
var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');

exports.init = function() {

	var obj = {
		username: config.mqtt.user.username,
		password: config.mqtt.user.password
	};

	//var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);
	var client = mqtt.createClient(1883, 'test.mosquitto.org', {
		username: '',
		password: ''
	});

	var options = {
		key: config.queue.key,
		exchanger: config.queue.exchange,
		url: config.queue.url
	}

	//CREATE NEW CONNECTION
	var conn = tlanticQueue.connection(options);

	//SEND
	conn.then(function(channel) {
		client.subscribe('newtopic/test');
		client.on('message', function(topic, message) {

			try {

				var resp = JSON.parse(message);

				var respMsg = resp;

				tlanticQueue.send(channel, JSON.stringify(respMsg), options).then(function(result) {
					console.log('SUCCESS_SEND_TO_EXCHANGER');
				});

			} catch (e) {
				console.log('ERROR_ON_PROCESS_MESSAGE');
			}


			/*tlanticQueue.queueSendToExchanger(JSON.stringify(respMsg), options,
			function success() {
				console.log('SUCCESS_SEND_TO_EXCHANGER');
			}, function error() {
				throw new Error('ERROR_ON_SEND_TO_EXCHANGER');
			});*/

		});

	});



}
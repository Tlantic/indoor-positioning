var mqtt = require('mqtt');
var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');

exports.init = function() {

	var obj = {
		username: config.mqtt.user.username,
		password: config.mqtt.user.password
	};

	var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);

	var options = {
		key: config.queue.key,
		exchanger: config.queue.exchange,
		url: config.queue.url
	}

	//CREATE NEW CONNECTION
	var conn = tlanticQueue.connection(options);

	//SEND
	conn.then(function(channel) {
		client.subscribe(config.mqtt.id);
		client.on('message', function(topic, message) {

			var resp = JSON.parse(message);

			var respMsg = resp;

			tlanticQueue.send(channel, JSON.stringify(respMsg), options).then(function(result) {
				console.log('SUCCESS_SEND_TO_EXCHANGER');
			});

			/*tlanticQueue.queueSendToExchanger(JSON.stringify(respMsg), options,
			function success() {
				console.log('SUCCESS_SEND_TO_EXCHANGER');
			}, function error() {
				throw new Error('ERROR_ON_SEND_TO_EXCHANGER');
			});*/

		});

	});



}
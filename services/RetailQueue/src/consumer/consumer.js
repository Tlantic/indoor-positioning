var log = require('tlantic-log'),
 	 db = require('tlantic-db'),
 	 mqtt = require('mqtt'),
 	 config = require('../../config/config');

exports.process = function(){
	
	var obj = {
		username: config.mqttResponse.user.username,
		password: config.mqttResponse.user.password
	};

	var client = mqtt.createClient(config.mqttResponse.port, config.mqttResponse.url, obj);

	client.subscribe(config.mqttResponse.id);
		client.on('message', function(topic, message) {

			var resp = JSON.parse(message);

			console.log(resp);

		});

};
var mqtt = require('mqtt');
var config = require('../config/config');
var rules = require('./rules');

exports.init = function(){

	//rules.manager({direction:'in'});

	var obj = {
		username: config.mqtt.user.username,
		password: config.mqtt.user.password
	};

	var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);

	client.subscribe(config.mqtt.id);
	client.on('message', function(topic, message) {
		
		var resp = JSON.parse(message);
		rules.manager(resp);
	});

}

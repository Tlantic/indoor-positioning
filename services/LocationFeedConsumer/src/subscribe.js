var mqtt = require('mqtt');
var config = require('../config/config');
//var rules = require('./rules');
var sender =  require('./sender');

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
		
	
		sender.sendMsgToQueue("_"+id);

	});

}

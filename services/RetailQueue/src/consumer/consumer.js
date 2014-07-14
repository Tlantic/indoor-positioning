var log = require('tlantic-log'),
 	 db = require('tlantic-db'),
 	 mqtt = require('mqtt'),
 	 config = require('../../config/config'),
 	 when = require('when'),
 	 responseRules = require('./responseRules');

exports.process = function(){
	var self = this;

	var obj = {
		username: config.mqttResponse.user.username,
		password: config.mqttResponse.user.password
	};

	var client = mqtt.createClient(config.mqttResponse.port, config.mqttResponse.url, obj);

	client.subscribe(config.mqttResponse.id);
		client.on('message', function(topic, message) {

			var resp = JSON.parse(message);

			responseRules.work(resp).then(function(result){
				log.info('ok');
			}).catch(function(err){
				log.error(err);
			});

		});

};




var log = require('tlantic-log'),
	db = require('tlantic-db'),
	tlanticQueue = require('tlantic-queue'),
	config = require('../../config/config'),
	mqtt = require('mqtt'),
	when = require('when');

var client;

exports.process = function() {
	var channel;

	var options = {
		url: config.queue.url,
		queue: config.queue.routes[0].queue,
		noAck: false,
		durable: true
	};

	function doWork(msg, ch) {
		var mych = ch,
			mymsg = msg;
		var body = JSON.parse(msg.content.toString());

		_putMessageOnBroker(body).then(function(){
			mych.ack(mymsg);
		}).catch(function(){

		});


	}

	var conn = tlanticQueue.connection(options);

	conn.then(function(channel) {

		tlanticQueue.consumer(channel, options, doWork);

	});
};

exports.putMessageOnBroker = _putMessageOnBroker;

function _putMessageOnBroker(msg) {
	var d = when.defer();
	try {
		var obj = {
			username: config.mqtt.user.username,
			password: config.mqtt.user.password
		};

	

		if (!client){
			client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);
			client.on('connect', function(){
				client.publish(config.mqtt.id, JSON.stringify(msg), function(){		
					d.resolve();
				});
			});	
		}
		else{
			client.publish(config.mqtt.id, JSON.stringify(msg), function(){		
				d.resolve();
			});
		}

		client.on('error', function(err) {
			d.reject();
		});

		d.resolve();
	} catch (err) {
		d.reject();
	}

	return d.promise;

}
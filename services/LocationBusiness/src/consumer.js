var amqp = require('amqplib');
var basename = require('path').basename;
var all = require('when').all;
var config = require('../config/config');
var areaBssRules = require('./areaBssRules');
var tlanticQueue = require('tlantic-queue');

exports.queueConsumer = function(queueName) {

	var options = {
		url: config.queue.url,
		queue: queueName,
		noAck: false,
		durable: true
	};

	function doWork(msg, ch) {
		var mych = ch,
			mymsg = msg;
		var body = JSON.parse(msg.content.toString());
		console.log(" [x] Received '%s'", body.id);

		areaBssRules.resolveMsg(body, function success() {
			console.log('aaa');
			mych.ack(mymsg);
		}, function error(e) {
			console.log(e);
		});

	}

	tlanticQueue.queueConsumer(options, doWork);
}

/*exports.queueConsumer = function(queueName) {
	amqp.connect(config.queue.url).then(function(conn) {
		process.once('SIGINT', function() {
			conn.close();
		});
		return conn.createChannel().then(function(ch) {
			var ok = ch.assertQueue(queueName, {
				durable: true
			});
			ok = ok.then(function() {
				ch.prefetch(1);
			});
			ok = ok.then(function() {
				ch.consume(queueName, doWork, {
					noAck: false
				});
				console.log(" [*] Waiting for messages. To exit press CTRL+C");
			});
			return ok;

			function doWork(msg) {
				var body = JSON.parse(msg.content.toString());
				console.log(" [x] Received '%s'", body.id);
				
				areaBssRules.resolveMsg(body, function success(){
					ch.ack(msg);
				}, function error(e){
					console.log(e);
				});
				
			}



		});
	}).then(null, console.warn);

}*/
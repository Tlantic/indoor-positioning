var amqp = require('amqplib');
var basename = require('path').basename;
var all = require('when').all;
var config = require('../config/config');
var sender = require('./sender');

exports.queueConsumer = function(queueName) {
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
				var body = msg.content.toString();
				console.log(" [x] Received '%s'", body);
				
				sender.sendActionToQueue(body, config.outputQueue.routes[0].key, function success(){
					ch.ack(msg);
				}, function error(e){
					console.log(e);
				});
				/*setTimeout(function() {
					console.log(" [x] Done");
					ch.ack(msg);
				}, 4 * 1000);*/
			}



		});
	}).then(null, console.warn);

}
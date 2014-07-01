var basename = require('path').basename;
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

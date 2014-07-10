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
		
		areaBssRules.resolveMsg(body).then(function(){
			mych.ack(mymsg);
		});

	}

	//tlanticQueue.queueConsumer(options, doWork);

	var conn = tlanticQueue.connection(options);

	conn.then(function(channel) {
		tlanticQueue.consumer(channel, options, doWork);
	});
}


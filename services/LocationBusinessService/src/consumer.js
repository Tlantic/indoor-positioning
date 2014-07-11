var basename = require('path').basename;
var config = require('../config/config');
var areaBssRules = require('./areaBssRules');
var tlanticQueue = require('tlantic-queue');

exports.queueConsumer = function(queueName) {

	var channelIn, channelOut;

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
		
		areaBssRules.resolveMsg(body, channelOut).then(function(){
			mych.ack(mymsg);
		});

	}

	//tlanticQueue.queueConsumer(options, doWork);

	var connIn = tlanticQueue.connection(options);

	var connOut = tlanticQueue.connection(options);

	connIn.then(function(channel) {
		channelIn = channel;
		connOut.then(function(channel2) {
			channelOut = channel2;
			tlanticQueue.consumer(channelIn, options, doWork);
		});
	});
}


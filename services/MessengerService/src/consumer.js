'use strict';

var basename = require('path').basename;
var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');
var pushnotificationAction = require('./actions/pushnotifications');


exports.queueConsumerSendPush = function(queueName) {

	var options = {
		url: config.outputQueue.url,
		queue: queueName,
		noAck: false,
		durable: true
	};

	function doWork(msg, ch) {
		var mych = ch,
			mymsg = msg;
		var body = JSON.parse(msg.content.toString());
		
		pushnotificationAction.send(body).then(function(result){
			console.log(result);
			mych.ack(mymsg);
		}).catch(function(error){
			console.log(error);
		});

	}

	tlanticQueue.queueConsumer(options, doWork);
};

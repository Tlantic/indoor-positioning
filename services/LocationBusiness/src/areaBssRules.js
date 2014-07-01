var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');

exports.resolveMsg = function(data, success, error) {

	var options = {
		key: config.outputQueue.routes[0].key,
		exchanger: config.outputQueue.exchange,
		url: config.outputQueue.url
	};

	tlanticQueue.queueSendToExchanger(JSON.stringify(data), options,
		function fsuccess() {
			success();
		}, function ferro(e) {
			error(e);
		});


}
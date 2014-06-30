var sender = require('./sender');
var config = require('../config/config');

exports.resolveMsg = function(data, success, error) {
	
	var sendMsg;
	console.log(data);
	success();
	/*sender.sendActionToQueue(sendMsg, config.outputQueue.routes[0].key, function() {
		success();
	}, function(e) {
		error();
	});*/


}


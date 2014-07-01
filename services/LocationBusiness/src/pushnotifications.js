var config = require('../config/config')
var Rest = require('node-rest-client').Client;

exports.send= function(data, success){

	var rest = new Rest();

	console.log(data);

	rest.post(config.push.url, data, function(msg, response) {
		console.log(msg);
		success();
	});

}
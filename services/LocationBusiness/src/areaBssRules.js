var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');
var db = require('tlantic-db');
var when = require('when');

exports.resolveMsg = function(data, success, error) {

	var data ={
	  "conditions":{
	  	"organitation": "53b2c57684c1ef0c0f4621e6",
	    "attachType": "AREA",
	    "attachCode": "A1",
	    "status": "A"
	  }
	};

	/*when.all(db.find('rule')).then(function(value) {
		console.log(value);
	}).catch(function handleError(e) {
    	error(e);
});*/

/*db.findById('rule', '53b2c57684c1ef0c0f4621e7').then(function(value) {
		console.log(value);
	}).catch(function handleError(e) {
    	error(e);
});*/

/*var data = {
	name: "Entrada em Loja",
    description: "Entrada em Loja",
    organitation: "53b14b19966bce61441e840b",
    priority: 1,
    restrictions: [],
    action:"SEND_PUSH_NOTIFICATION",
    status: "A",
    attachType:"AREA",
  	attachCode:"A4"
}


db.save('rule', data).then(function(value) {
		console.log(value);
	}).catch(function handleError(e) {
    	error(e);
});*/


/*var data = {
	
  	attachCode:"A4"
}

var conditions = {
	"_id" : "53b32f6d008c6a371f66b4d1",
}


db.update('rule', conditions, data).then(function(value) {
		console.log(value);
	}).catch(function handleError(e) {
    	error(e);
});*/

var conditions = {
	"_id" : "53b32f6d008c6a371f66b4d1",
}


db.delete('rule', conditions).then(function(value) {
		console.log(value);
	}).catch(function handleError(e) {
    	error(e);
});


	/*var options = {
		key: config.outputQueue.routes[0].key,
		exchanger: config.outputQueue.exchange,
		url: config.outputQueue.url
	};

	tlanticQueue.queueSendToExchanger(JSON.stringify(data), options,
		function fsuccess() {
			success();
		}, function ferro(e) {
			error(e);
		});*/


}
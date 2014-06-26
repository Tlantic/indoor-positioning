var mqtt = require('mqtt');
var config = require('./config/config');
var request = require('request');
var Rest = require('node-rest-client').Client;
var sender = require('./sender');

var obj = {
	username: config.mqtt.user.username,
	password: config.mqtt.user.password
};




var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);

client.subscribe(config.mqtt.id);
client.on('message', function(topic, message) {
	var sendMsg = '';
	var resp = JSON.parse(message);
	console.log(resp);		

	if(resp.direction==='in')
		sendMsg = "Bem-vindo ao Continente";
	else
		sendMsg = "Obrigado pela sua visita";

	var args = {
		data: {"users":["samsung"],"android":{"collapseKey":"optional","data":{"message":"You message here","alert":sendMsg}},"ios":{"badge":0,"alert":"Your message here","sound":"soundName"}},
		headers: {
			"Content-Type": "application/json"
		}
	};

	var rest = new Rest();
	sender.sendMsgToQueue('msg to queue');

	rest.post("http://localhost:9002/send", args, function(data, response) {
		
	});

});
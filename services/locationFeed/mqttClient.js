var mqtt 	= require('mqtt');
var config 	= require('./config/config'); 
var request = require('request');

var obj = {
        username: config.mqtt.user.username,
        password: config.mqtt.user.password
  };

var client = mqtt.createClient(config.mqtt.port, config.mqtt.url, obj);

client.subscribe(config.mqtt.id);
client.on('message', function(topic, message) {
  console.log(message);
  
/*	request(config.endpoint, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) 
	  }
	});*/

});

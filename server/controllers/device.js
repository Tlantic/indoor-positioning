var Client = require('node-rest-client').Client;


var zmq = require('zmq');
var sender = zmq.socket('push');
sender.bindSync("tcp://*:5557");

exports.info = function(req, res, next) {

var client = new Client();
client.registerMethod("jsonMethod", "http://localhost:9000/database/device/53a9b2935cdf5a630696cf0c", "GET");

client.methods.jsonMethod(function(data,response){

     res.send({
        result:JSON.parse(data).result
    })
});
	
    
};


exports.queue=function(req, res, next){
	sender.send('add to queue');
	 res.send({
        result:'ok'
    })
}
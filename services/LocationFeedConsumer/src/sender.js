var amqp = require('amqplib');
var when = require('when');
var config = require('../config/config');
var key = config.queue.key;

exports.sendMsgToQueue = function(sendMsg){
	amqp.connect(config.queue.url).then(function(conn) {
  return when(conn.createChannel().then(function(ch) {
    var ex = config.queue.exchange;
    
      ch.publish(ex, key, new Buffer(sendMsg));
      console.log(" [x] Sent %s:'%s'", key, sendMsg);
  	
     return ch.close();
   
  })).ensure(function() { conn.close(); })
}).then(null, console.log);
}
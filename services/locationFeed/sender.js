var amqp = require('amqplib');
var when = require('when');
var config = require('./config/config');

exports.sendMsgToQueue = function(sendMsg){
	amqp.connect(config.queue.url).then(function(conn) {
	  return when(conn.createChannel().then(function(ch) {
	    var q = config.queue.taskName;
	    var ok = ch.assertQueue(q, {durable: true});
	    
	    return ok.then(function() {
	      var msg = sendMsg;
	      ch.sendToQueue(q, new Buffer(msg), {deliveryMode: true});
	      console.log(" [x] Sent '%s'", msg);
	      return ch.close();
	    });
	  })).ensure(function() { conn.close(); });
	}).then(null, console.warn);
}
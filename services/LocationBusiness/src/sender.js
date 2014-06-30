var amqp = require('amqplib');
var when = require('when');
var config = require('../config/config');

exports.sendActionToQueue = function(data, key, success, error) {
	var err;
	amqp.connect(config.queue.url).then(function(conn) {
		return when(conn.createChannel().then(function(ch) {
			var ex = config.outputQueue.exchange;
			try{
				ch.publish(ex, key, new Buffer(data));
				console.log(" [x] Sent %s,  %s:'%s'", ex, key, data);
			}catch(e){
				err=e;
			}
			
			return ch.close();

		})).ensure(function() {
			conn.close();
			if(err)
				error(e);
			else
				success();
		})
	}).then(null, console.log);
}
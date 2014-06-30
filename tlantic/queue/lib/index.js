//Load modules
var amqp = require('amqplib');

//Declare Internals
var internals = {};

/**
    Rabbit Queue Consumer
    
    @method queueConsumer
    @param options {Object} queue options
    @param action {Function} queue consumer action
    @returns null

    options = {
		url:'',
		queue:'',
		noAck: true||false,
		durable: true||false
	}
**/
exports.queueConsumer = function(options, action) {
	amqp.connect(options.url).then(function(conn) {
		process.once('SIGINT', function() {
			conn.close();
		});
		return conn.createChannel().then(function(ch) {
			var ok = ch.assertQueue(queueName, {
				durable: options.durable || true
			});
			ok = ok.then(function() {
				ch.prefetch(1);
			});
			ok = ok.then(function() {
				ch.consume(queueName, doWork, {
					noAck: options.noAck || false
				});
			});

			return ok;

			action(msg, ch);
		});
	}).then(null, console.warn);
};


/**
    Rabbit Send Message to exchanger
    
    @method queueConsumer
    @param msg {Object} queue options
    @param key {String} queue route key
    @param exchange {String} queue exchange name
    @param success {Function} success send message
    @param error {Function} error send message
    @returns null

**/
exports.queueSendToExchanger = function(msg, key, exchange, success, error) {
	var err;
	amqp.connect(config.queue.url).then(function(conn) {
		return when(conn.createChannel().then(function(ch) {
			var ex = exchange;
			try {
				ch.publish(ex, key, new Buffer(msg));
				console.log(" [x] Sent %s,  %s:'%s'", ex, key, msg);
			} catch (e) {
				err = e;
			}

			return ch.close();

		})).ensure(function() {
			conn.close();
			if (err)
				error(e);
			else
				success();
		})
	}).then(null, console.log);
}


exports.restAdapter = function() {

};

exports.simpleAdapter = function() {

};
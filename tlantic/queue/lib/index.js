//Load modules
var amqp = require('amqplib');
var when = require('when');
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
	console.log(options);
	amqp.connect(options.url).then(function(conn) {

		process.once('SIGINT', function() {
			conn.close();
		});
		return conn.createChannel().then(function(ch) {
			var ok = ch.assertQueue(options.queue, {
				durable: options.durable || true
			});
			console.log(ok);
			ok = ok.then(function() {
				ch.prefetch(1);
			});
			ok = ok.then(function() {
				ch.consume(options.queue, work, {
					noAck: options.noAck || false
				});
			});

			return ok;
			function work(msg){
				action(msg, ch);
			}
			
		});
	}).then(null, console.warn);
};


/**
    Rabbit Send Message to exchanger
    
    @method queueConsumer
    @param msg {Object} queue options
    @param key {String} queue route key
    @param options {Object} queue options
    @param success {Function} success send message
    @param error {Function} error send message
    @returns null

**/
exports.queueSendToExchanger = function(msg, options, success, error) {
	var err;
	amqp.connect(options.url).then(function(conn) {
		return when(conn.createChannel().then(function(ch) {
			try {
				ch.publish(options.exchanger, options.key, new Buffer(msg));
				//console.log(" [x] Sent %s,  %s: %s ", options.exchanger, options.key, msg);
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
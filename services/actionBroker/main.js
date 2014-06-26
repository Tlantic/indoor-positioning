#!/usr/bin/env node
// Process tasks from the work queue
var push = require('./src/pushnotifications');
var amqp = require('amqplib');
var config = require('./config/config');

amqp.connect(config.queue.url).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    var ok = ch.assertQueue(config.queue.taskName, {durable: true});
    ok = ok.then(function() { ch.prefetch(1); });
    ok = ok.then(function() {
      ch.consume(config.queue.taskName, doWork, {noAck: false});
      console.log(" [*] Waiting for messages. To exit press CTRL+C");
    });
    return ok;

    function doWork(msg) {
      var body = msg.content.toString();
      console.log(body);
      var data = JSON.parse(body);
      if(data.operation==='PUSH_NOTIFICATION')
      	push.send(data.data, function(){
      		ch.ack(msg);	
      	});
      	
    }
  });
}).then(null, console.warn);
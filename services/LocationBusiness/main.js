var consumer = require('./src/consumer');
var config = require('./config/config');

console.log("***************************");
console.log("ACTION CONSUMER INIT     ");
console.log("***************************");

consumer.queueConsumer(config.queue.routes[0].queue);







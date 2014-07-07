var consumer = require('./src/consumer');
var config = require('./config/config');

console.log("***************************");
console.log("LOCATION BUSINESS INIT     ");
console.log("***************************");

consumer.queueConsumer(config.queue.routes[0].queue);








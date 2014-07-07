var consumer = require('./src/consumer');
var config = require('./config/config');

console.log("***************************");
console.log("MESSENGER SERVICE INIT     ");
console.log("***************************");

consumer.queueConsumerSendPush(config.outputQueue.routes[0].queue);

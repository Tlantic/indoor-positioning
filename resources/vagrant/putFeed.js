
var sys = require('sys')

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
	exec("mosquitto_pub -t newtopic/test -h test.mosquitto.org -m '{\"ts\":1404998754,\"dev\":\"48:5A:3F:0F:B7:66\",\"zone\":1,\"direction\":\"in\"}'", puts);
 }

//for(var i=0; i<100000; i++){
exec("mosquitto_pub -t newtopic/test -h test.mosquitto.org -m '{\"ts\":1404998754,\"dev\":\"48:5A:3F:0F:B7:66\",\"zone\":1,\"direction\":\"in\"}'", puts);
//}


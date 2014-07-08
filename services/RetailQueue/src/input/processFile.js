var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('your/file');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
  // process line here
});

rl.on('close', function() {
  // do something on finish here
});
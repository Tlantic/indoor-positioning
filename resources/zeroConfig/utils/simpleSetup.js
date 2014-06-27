var http = require('http');

var loadFile = function(filePath) {
	console.log('simpleSetup:', 'Loading file content', filePath);

	// Load raw file
	var raw = require('../' + filePath);

	executeContent(raw.setup);

	console.log('simpleSetup:', 'Done');
}

var executeContent = function(raw) {
	console.log('simpleSetup:', 'Processing content');

	// Load config
	var httpOptions = {
		hostname: raw.endpoint.host,
		path: raw.endpoint.path,
		port: raw.endpoint.port,
		method: raw.endpoint.method,
		headers: {'Content-Type': 'application/json'}
	};

	console.log('simpleSetup:', 'Submiting to', httpOptions.hostname + httpOptions.path);

	// Execute
	if (raw.data.length > 0) {
		for(var i = 0; i < raw.data.length; i++) {
			try {
				var req = http.request(httpOptions);
				req.write(JSON.stringify(raw.data[i]));
				req.end();
			} catch (error) {
				console.log('Error executing ', filePath, '#', error);
			}
		}
	}

	console.log('simpleSetup:', 'Executed', raw.data.length, 'instructions');

};

exports.run = loadFile;
exports.runContent = executeContent;
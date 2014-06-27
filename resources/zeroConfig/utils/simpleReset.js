var http = require('http');

var loadFile = function(filePath) {
	console.log('simpleReset:', 'Loading file content', filePath);

	// Load raw file
	var raw = require('../' + filePath);

	executeContent(raw.reset);

	console.log('simpleReset:', 'Done', filePath);
}

var executeContent = function(raw) {
	// Load config
	var httpOptions = {
		hostname: raw.endpoint.host,
		path: raw.endpoint.path,
		port: raw.endpoint.port,
		method: raw.endpoint.method,
		headers: {'Content-Type': 'application/json'}
	};

	var req = http.request(httpOptions);
	req.write(JSON.stringify(raw.data || {}));
	req.end();
};

exports.run = loadFile;
exports.runContent = executeContent;
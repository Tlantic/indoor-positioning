var http = require('http');

var loadFile = function(filePath) {
	console.log('Starting', filePath);

	// Load raw file
	var raw = require(filePath);

	// Load config
	var httpOptions = {
		hostname: raw.endpoint.host,
		path: raw.endpoint.path,
		port: raw.endpoint.port,
		method: raw.endpoint.method,
		headers: {'Content-Type': 'application/json'}
	};

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

	console.log('Executed', raw.data.length, 'instructions');

	console.log('Exiting', filePath);
}

loadFile('./ruleOperators.json');
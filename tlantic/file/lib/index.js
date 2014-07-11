var readline = require('readline'),
	fs = require('fs'),
	stream = require('stream'),
	when = require('when'),
	path = require("path");


exports.readFile = function(path, lineWork) {

	var d = when.defer();
	try {

		if (!path)
			d.reject("FILE_NOT_FOUND");

		var instream = fs.createReadStream(path);
		var outstream = new stream;
		var rl = readline.createInterface(instream, outstream);

		rl.on('line', function(line) {
			lineWork(line);
		});

		rl.on('close', function() {
			d.resolve();
		});

	} catch (e) {
		d.reject(e);
	}

}


exports.getDirFiles = function(basePath, lineWork) {

	var d = when.defer();

	fs.readdir(basePath, function(err, files) {
		if (err) {
			d.reject(err);
		}
		d.resolve(files);
	});
	
	return d.promise;

}
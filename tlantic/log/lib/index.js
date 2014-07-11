var winston = require('winston');

var internals = {};

internals.types = {
	console:new(winston.transports.Console)(),
	file:new(winston.transports.File)({filename: 'main.log'})
}

internals.getLogger = function(types){
	var transports = [];
	if(!types){
		transports.push(internals.types.console);
	}
	else {
		
		if( typeof types === 'string' ) {
		    types = [ types ];
		}	
		
		for(var i=0; i<types.length; i++ ){
			if(internals.types[types[i]]){
				transports.push(internals.types[types[i]]);
			}
		}
		
	}
	if(transports.length===0)
		transports.push(internals.types.CONSOLE);

	var logger = new(winston.Logger)({
		transports: transports
	});

	return logger;
}


exports.info = function(message, types){
	internals.getLogger(types).info(message);
}

exports.warn = function(message, types){
	internals.getLogger(types).warn(message);
}

exports.error = function(message, types){
	internals.getLogger(types).error(message);
}

exports.types = internals.types;

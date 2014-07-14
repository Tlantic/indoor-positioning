var ifile  = require('./input/inputFileProcessor');
  outData  = require('./output/send');

exports.execute = function(type){
	
	if(type.toUpperCase()==='READ'){
		ifile.process();
	}
	if(type.toUpperCase()==='SEND'){
		outData.process();
	}
}
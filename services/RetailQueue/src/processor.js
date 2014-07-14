var ifile  = require('./input/inputFileProcessor');
  outData  = require('./output/sendToQueue'),
  externalData  = require('./output/externalInfo'),
  consumer = require('./consumer/consumer');

exports.execute = function(type){
	
	if(type.toUpperCase()==='READ'){
		ifile.process();
	}
	if(type.toUpperCase()==='SEND'){
		outData.process();
	}
	if(type.toUpperCase()==='CONSUMER'){
		consumer.process();
	}
	if(type.toUpperCase()==='EXTERNAL'){
		externalData.process();
	}
}
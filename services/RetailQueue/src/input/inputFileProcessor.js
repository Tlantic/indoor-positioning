var fl  = require('tlantic-file');
 config = require('../../config/config'),
 	log = require('tlantic-log'),
 	 db = require('tlantic-db'),
   when = require('when'),
   tlanticQueue = require('tlantic-queue');


exports.process = function() {
	fl.getDirFiles(config.dir.input).then(function(result){
		var files = result;
		for(var i=0; i<files.length; i++)
		{	
			fl.readFile(config.dir.input, files[i], _processLine).then(function(name){
				fl.move(config.dir.input+name, config.dir.out+name, function(result){
				})
			}).catch(function(error){
				log.error(error);
			})
		}
	}).catch(function(error){
		log.error(error);
	});	

}


function _processLine(line, lineId, name) {
	

	var ln = line.split(';');
	if (ln.length < 5 || ln.length > 5) {
		fl.write(config.dir.error, name, line);
	}

	log.info(ln);

	db.find('poi', {internalCode: ln[3], organizationCode: ln[4]}).then(function(result) {
		if(result.length===1){
				var ps = {
				internalCode: result[0].internalCode,
				externalCode: result[0].externalCode
			};

			var transaction = {
				code: ln[0],
				value: ln[1],
				status: "R",
				date: ln[2],
				poi: ps,
				line: line,
				level:"A",
				organizationCode:ln[4]
			}

			db.save('transaction', transaction).then(function(result) {
				
			}).catch(function(err) {
				fl.write(config.dir.error, name, line);
			});


		}
		else{
			fl.write(config.dir.error, name, line);
		}
	

	}).catch(function(err) {
		fl.write(config.dir.error, name, line);
	});

	

}
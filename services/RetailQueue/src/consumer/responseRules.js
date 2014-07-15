var when = require('when'),
	responseAdapter = require('./responseAdapter'),
	db = require('tlantic-db');

exports.work = function(resp){

	var d = when.defer();
	
	if(!responseAdapter.isValid(resp))
		d.reject('RESPONSE_IS_NULL');

	var msg = responseAdapter.getResponse(resp);
	
	var findTrans = db.findById('transaction', msg.id);

	findTrans.then(function(trans){
		if(trans.length!==1)
			return d.reject('TRANSACTION_NOT_FOUND');
		
		var trs = trans[0];

		var updData={};
		
		//IF DEVICE NOT FOUND CHANGE TRANSACTION STATE
		if(msg.dev.length===0){
			var nextLevel = getNextLevel(trs.level);
			if(nextLevel==="X")
				updData = {level:nextLevel};
			else
				updData = {level:nextLevel, status:'R'};
		}
		else{
			//UPDATE TRANS
			updData= {result:msg};
		}

		var upd = db.update('transaction',{_id:msg.id}, updData);
		upd.then(function(result){
			d.resolve('TRANSACTION_UPDATED');
		}).catch(function(err){
			return d.reject(err);
		});

	}).catch(function(err){
		return d.reject('TRANSACTION_NOT_FOUND:'+err);
	});

	return d.promise;
}

function getNextLevel(level){
	if(level==='A')
		return 'B';
	if(level==='B')
		return 'C';

	return "X";
}

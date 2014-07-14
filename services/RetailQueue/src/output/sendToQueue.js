var tlanticQueue = require('tlantic-queue'),
	config = require('../../config/config'),
	db = require('tlantic-db'),
	when = require('when'),
	log = require('tlantic-log');

var conn;
var options = {
	key: config.queue.routes[0].key,
	exchanger: config.queue.exchange,
	url: config.queue.url
}

function _init(){
	var d = when.defer();
	var conn = tlanticQueue.connection(options);
	conn.then(function(channel) {
		d.resolve(channel);
	});
	return d.promise;

}


exports.process = _process;

function _process() {
	var ok = _init();

	ok.then(function(channel) {
		var list = db.find('transaction', {
			status: 'R'
		});

		list.then(function(result) {
			for (var i = 0; i < result.length; i++) {
				_send(result[i], channel);
			}
		});
	})
}


exports.send = _send;

function _send(trs, channel) {

 	_createMsg(trs).then(function(msg){
 		tlanticQueue.send(channel, JSON.stringify(msg), options).then(function(result) {
			db.update('transaction', {_id: trs._id}, {	status: 'S', level:'B'	});
			log.info('ON_PUT_MESSAGE_IN_QUEUE');
		});
 	}).catch(function(error){
 		log.error('ERROR_ON_PUT_MESSAGE_IN_QUEUE')
 	});


}

function _createMsg(data){
	try{
		var d = when.defer();

		var gap = 0;

		if(data.level==='B')
			gap = 15;
		if(data.level==='C')
			gap = 30;
		if(data.level==='D')
			gap = 45;

		var findOrg = db.find('organization', {code: data.organizationCode});

		findOrg.then(function(result){
			
			if(result.length!==1)
				d.reject();
			else{	
				var msg = {
					id : data._id,
					initial_ts : parseInt(data.date) - gap,
					final_ts : parseInt(data.date) + gap,
					poi : [data.poi.externalCode],
					store : result[0].externalCode
				};
				
				d.resolve(msg);
			}
			
		}).catch(function(error){
			d.reject(error);
		});
		

	}catch(e){
		d.reject(error);
	}

	return d.promise;
}
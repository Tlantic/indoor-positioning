var mongoose = require('mongoose'),
	Device = mongoose.model('Device');

	
function _save(data, success, error) {
	try {
		var device = new Device(data);
		device.save(function(err, dv) {
			if (err) {
				error(err);
			}
			success(dv);
		});
	}catch(e){
		error(e);
	}
};

function _update(conditions, data, success, error) {
	try{
		Device.update(conditions, data, { multi: true }, function (err, numberAffected, raw) {
		  if (err) return error(err);
		  success({
		  	numberAffected: numberAffected,
		  	raw:raw
		  });
		});
	}catch(e){
		error(e);
	}
	
};

function _delete(conditions, success, error) {
	try{
		Device.remove(conditions, function(err, numberAffected){
			if(err)
				error(err);
			else
				success({
					numberAffected:numberAffected
				});
		});
	}catch(e){
		error(e);
	}
	
};

function _find(conditions, fields, options, success, error){
	
	try{
		Device.find(conditions, fields, options, function (err, docs) {
			if(err)
				error(err);
			else
				success(docs);
		});

	}catch(e){
		error(e);
	};
	
};


exports.save 	= _save;
exports.update 	= _update;
exports.delete 	= _delete;
exports.find 	= _find;



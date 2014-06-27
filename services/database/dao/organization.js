var mongoose = require('mongoose'),
	Organization = mongoose.model('Organization');

	
function _save(data, success, error) {
	try {
		var org = new Organization(data);
		org.save(function(err, dv) {
			if (err) {
				return error(err);
			}
			success(dv);
		});
	}catch(e){
		error(e);
	}
};

function _update(conditions, data, success, error) {
	try{
		Organization.update(conditions, data, { multi: true }, function (err, numberAffected, raw) {
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
		Organization.remove(conditions, function(err, numberAffected){
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
		Organization.find(conditions, fields, options, function (err, docs) {
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



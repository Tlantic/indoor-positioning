var mongoose = require('mongoose'),
	DeviceGroup = mongoose.model('DeviceGroup');

exports.save = function(data, success, error) {
	try {
		var deviceGroup = new DeviceGroup(data);
		deviceGroup.save(function(err, dvGroup) {
			if (err) {
				error(err);
			}
			success(dvGroup);
		});
	}catch(e){
		error(e);
	}
};
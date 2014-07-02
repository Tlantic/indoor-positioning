var when = require('when'),
	pushnotificationAction = require('./pushnotifications');


var PUSH_NOTIFICATION = 'SEND_PUSH_NOTIFICATION';

exports.resolve = function(action, data, device){
	var d = when.defer();

	var dataToResolve = {
		actionData:data,
		device:device
	};

	if(action.code === PUSH_NOTIFICATION){
		pushnotificationAction.resolve(dataToResolve).then(function(data){
			d.resolve(data);
		}).catch(function(error){
			d.reject('ERROR_ON_RESOLVE_PUSH_NOTIFICATION');
		});
		
	}
	else
		d.reject('ACTION_TYPE_NOT_FOUND');

	return d.promise;
}
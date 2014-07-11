var when = require('when'),
	pushnotificationAction = require('./pushnotifications');


var PUSH_NOTIFICATION = 'SEND_PUSH_NOTIFICATION';

exports.resolve = function(rule, device, channel){
	var d = when.defer();

	if(rule.action.code === PUSH_NOTIFICATION){
		pushnotificationAction.resolve(device, rule, channel).then(function(data){
			d.resolve(data);
		}).catch(function(error){
			d.reject('ERROR_ON_RESOLVE_PUSH_NOTIFICATION');
		});
		
	}
	else
		d.reject('ACTION_TYPE_NOT_FOUND');

	return d.promise;
}
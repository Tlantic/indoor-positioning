var when = require('when');

var PUSH_NOTIFICATION = 'SEND_PUSH_NOTIFICATION';

exports.resolve = function(action, data){
	var d = when.defer();
	console.log(action);
	console.log(data);

	if(action.code === PUSH_NOTIFICATION)
		d.resolve('put in queue');
	else
		d.reject('');

	return d.promise;
}
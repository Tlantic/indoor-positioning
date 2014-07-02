var when = require('when');

var PUSH_NOTIFICATION = 'SEND_PUSH_NOTIFICATION';

exports.resolve = function(data){
	var d = when.defer();
	console.log(data);

	if(data.code === PUSH_NOTIFICATION)
		d.resolve('put in queue');
	else
		d.reject('');

	return d.promise;
}
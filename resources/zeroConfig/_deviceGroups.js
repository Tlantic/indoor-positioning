var Q = require("q"),
	request = require('request-json'),
    client = request.newClient('http://localhost:9000/database/'),
    simpleSetup = require('./utils/simpleSetup.js');

var _data = {};

function parseData(item) {
	var deferred = Q.defer();

    // Get organization ID
    client.post(
    	'organization/find',
    	{
    		conditions: {
    			name: item.organization
    		}
    	},
    	function(err, res, body) {
			if (body.result.length === 0) {
				item.organization = '';
				return;
			}

			item.organization = body.result[0]._id;
			deferred.resolve(item);
		});

    return deferred.promise;
}

function submit() {
	simpleSetup.runContent(_data);
}

exports.init = function() {

	// Get raw data
	_data = require('./resources/deviceGroups.json');

	// For each data to send, populate with correct values
	var promises = [];

	for(var i = 0; i < _data.data.length; i++) {
		promises.push(parseData(_data.data[i]));
	}

	// Wait for all
	Q.all(promises).then(
		function onSuccess() {
			submit();
		}
	);
}
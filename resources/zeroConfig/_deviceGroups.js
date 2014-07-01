var Q = require("q"),
	request = require('request-json'),
    client = request.newClient('http://localhost:9000/database/'),
    simpleSetup = require('./utils/simpleSetup.js'),
	simpleReset = require('./utils/simpleReset.js');

var _data = {};

function parseData(item) {
	var deferred = Q.defer();

    var getOrganization = function() {
    	var deferred = Q.defer();
    	client.post(
	    	'organization/find',
	    	{
	    		conditions: {
	    			name: item.organization
	    		}
	    	},
	    	function(err, res, body) {
				if (body.data.length === 0) {
					item.organization = '';
					deferred.reject();;
				}

				item.organization = body.data[0]._id;
				deferred.resolve(item);
			});
    	return deferred.promise;
    };

    Q.all([
    	getOrganization()
    ]).then(function() {
    	deferred.resolve();
    });

    return deferred.promise;
}

function submit() {
	simpleSetup.runContent(_data);
}

exports.setup = function() {

	// Get raw data
	_data = require('./resources/deviceGroups.json');
	_data = _data.setup;

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
};

exports.reset = function() {
	simpleReset.run('resources/deviceGroups.json');	
};
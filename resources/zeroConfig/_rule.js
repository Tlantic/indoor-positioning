var Q = require("q"),
	request = require('request-json'),
    client = request.newClient('http://localhost:9000/database/'),
    simpleSetup = require('./utils/simpleSetup.js'),
	simpleReset = require('./utils/simpleReset.js');

var _data = {};

var getAction = function(item) {
	var deferred = Q.defer();
	client.post(
    	'ruleAction/find',
    	{
    		conditions: {
    			code: item.action
    		}
    	},
    	function(err, res, body) {
			if (body.data.length === 0) {
				item.action = '';
				deferred.reject();
			}

			item.action = body.data[0]._id;
			deferred.resolve(item);
		});
	return deferred.promise;
};

var getRestrictions = function(item) {
	var deferred = Q.defer();

	var promises = [];

	for(var i = 0; i < item.restrictions.length; i++) {
		promises.push(getRuleVar(item.restrictions[i]));
		promises.push(getRuleOperator(item.restrictions[i]));
	}

    Q.all(promises).then(function() {
    	deferred.resolve();
    });

    return deferred.promise;
};

var getRuleVar = function(item) {
	var deferred = Q.defer();
	client.post(
    	'ruleVar/find',
    	{
    		conditions: {
    			name: item.variable
    		}
    	},
    	function(err, res, body) {
			if (body.data.length === 0) {
				item.variable = '';
				deferred.reject();
			}

			item.variable = body.data[0]._id;
			deferred.resolve(item);
		});
	return deferred.promise;
};

var getRuleOperator = function(item) {
	var deferred = Q.defer();
	client.post(
    	'ruleOperator/find',
    	{
    		conditions: {
    			code: item.operator
    		}
    	},
    	function(err, res, body) {
			if (body.data.length === 0) {
				item.operator = '';
				deferred.reject();
			}

			item.operator = body.data[0]._id;
			deferred.resolve(item);
		});
	return deferred.promise;
};


function parseData(item) {
	var deferred = Q.defer();

    Q.all([
    	getAction(item),
    	getRestrictions(item)
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
	_data = require('./resources/rule.json');
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
		},
		function onError() {
			console.error("Rule", "Failed");
		}
	);
};

exports.reset = function() {
	simpleReset.run('resources/rule.json');	
};
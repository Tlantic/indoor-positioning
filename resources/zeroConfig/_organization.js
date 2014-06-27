var simpleSetup = require('./utils/simpleSetup.js'),
	simpleReset = require('./utils/simpleReset.js');

exports.setup = function() {
	simpleSetup.run('resources/organization.json');
};

exports.reset = function() {
	simpleReset.run('resources/organization.json');	
}
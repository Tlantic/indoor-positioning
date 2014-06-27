var simpleSetup = require('./utils/simpleSetup.js'),
	simpleReset = require('./utils/simpleReset.js');

exports.setup = function() {
	simpleSetup.run('resources/ruleActions.json');
};

exports.reset = function() {
	simpleReset.run('resources/ruleActions.json');	
}
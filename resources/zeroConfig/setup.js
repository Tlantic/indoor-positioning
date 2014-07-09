var Q = require('q');

function loadActionFile(filePath) {
	console.log('');
	console.log('------', 'Processing', filePath);

	var module = require(filePath);

	if (!module)
		return;

	var reset = function() {
		if (!module.reset)
			return;
		console.log('-----', 'Reset', filePath);
		return module.reset();
	};

	var setup = function() {
		if (!module.setup)
			return;
		console.log('-----', 'Setup', filePath);
		return module.setup();
	};

	reset();
	setup();
}

setTimeout(function() {
	loadActionFile('./_ruleActions.js');
}, 0);

setTimeout(function() {
	loadActionFile('./_ruleOperators.js');
}, 2000);
setTimeout(function() {
	loadActionFile('./_ruleVars.js');
}, 4000);
setTimeout(function() {
	loadActionFile('./_organization.js');
}, 6000);
setTimeout(function() {
	loadActionFile('./_deviceGroups.js');
}, 8000);
setTimeout(function() {
	loadActionFile('./_device.js');
}, 10000);
setTimeout(function() {
	loadActionFile('./_rule.js');
}, 12000);
setTimeout(function() {
	loadActionFile('./_area.js');
}, 14000);






function loadActionFile(filePath) {
	var module = require(filePath);

	if (!module)
		return;

	if (module.reset)
		module.reset();

	if (module.init)
		module.init();
}

loadActionFile('./_ruleActions.js');
loadActionFile('./_ruleOperators.js');
loadActionFile('./_ruleVars.js');
loadActionFile('./_organization.js');
loadActionFile('./_deviceGroups.js');
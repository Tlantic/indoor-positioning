var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');
var db = require('tlantic-db');
var when = require('when');
var _ = require('lodash');
var rulesEngine = require('./rulesEngine')
var actions = require('./actions/actions')

var defaultType = config.default.defaultType,
activeState = config.default.activeState;


exports.resolveMsg = function(data) {
	var d = when.defer();

	var conditions = {
		organitationCode: config.default.organitation,
		attachType: defaultType,
		attachCode: data.zone,
		status: activeState
	};


	//GET ALL RULES FOR THIS AREA
	db.find('rule', conditions).then(function(result) {
		if (result && result.length > 0) {

			var rules = result;
			var rule, activeRule;

			for (var i = 0; i < rules.length; i++) {
				activeRule = rulesEngine.checkRule(data, rules[i]);
				if (activeRule) {
					rule = rules[i];
					break;
				}
			}
		
			var device = {
				mac: data.device
			};

			actions.resolve(rule, device).then(function(result) {
				d.resolve(result);
			}).catch(function(error) {
				d.reject(error);
			});
		}
		else {
			d.resolve();
		}
	}).
	catch(function handleError(e) {
		d.reject(e);
	});

	return d.promise;

}
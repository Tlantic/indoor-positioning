var config = require('../config/config');
var tlanticQueue = require('tlantic-queue');
var db = require('tlantic-db');
var when = require('when');
var _ = require('lodash');
var rulesEngine = require('./rulesEngine')
var actions = require('./actions/actions')

var defaultType = 'AREA'
	activeState = 'A';


exports.resolveMsg = function(data, success, error) {

	var conditions= {
		organitation: "53b2c57684c1ef0c0f4621e6",
		attachType: defaultType,
		attachCode: data.area,
		status: activeState
	};

	//GET ALL RULES FOR THIS AREA
	db.find('rule', conditions).then(function(result) {
		if(result && result.length>0){
			
			var rules = result;
			var rule, activeRule;

			for(var i=0; i<rules.length;i++){
				activeRule = rulesEngine.checkRule(data, rules[i]);
				if(activeRule){
					rule = rules[i];
					break;
				}
			}
			
			actions.resolve(rule.action).then(function(result){
				console.log(result);
			}).catch(function(error){
				console.log(error);
			});
		}
		
	}).
	catch (function handleError(e) {
		error(e);
	});



}



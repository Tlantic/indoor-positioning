var mongoose = require('mongoose'),
	Rule = mongoose.model('Rule'),
	RuleVarDao = require('../dao/ruleVar'),
	RuleOperatorDao = require('../dao/ruleOperator'),
	Q = require("q"),
	RuleVar = mongoose.model('RuleVar'),
	RuleOperator = mongoose.model('RuleOperator'),
	OrganizationDao = require('../dao/organization'),
	Organization = mongoose.model('Organization'),
	RuleAction = mongoose.model('RuleAction'),
	RuleActionDao = require('../dao/ruleAction');

	
function _save(data, success, error) {
	try {
		
		OrganizationDao.find({_id:data.organization}, undefined, undefined, function(result) {
	    	if(!result)
	    		error("ORGANIZATION_NOT_FOUND");
	    	
	    	var vOrganization = new Organization(result[0]);
	    	getRuleAction(vOrganization)

	    }, function(error){
	    	error("ORGANIZATION_NOT_FOUND");
	    });

		function getRuleAction(vOrganization){
			RuleActionDao.find({code:data.action}, undefined, undefined, function(result) {
	    	if(!result)
	    		error("ACTION_NOT_FOUND");
	    	
		    	var vAction = new RuleAction(result[0]);
		    	insert(vOrganization, vAction)

		    }, function(error){
		    	error("ACTION_NOT_FOUND");
		    });
		}
	    

		function insert(vOrganization, vAction){

			data.organitation=vOrganization;
			data.action=vAction;
			var rule = new Rule(data);
			rule.save(function(err, dv) {
				if (err) {
					return error(err);
				}
				success(dv);
			});
		}

	}catch(e){
		error(e);
	}
};

function _update(conditions, data, success, error) {
	try{
		Rule.update(conditions, data, { multi: true }, function (err, numberAffected, raw) {
		  if (err) return error(err);
		  success({
		  	numberAffected: numberAffected,
		  	raw:raw
		  });
		});
	}catch(e){
		error(e);
	}
	
};

function _delete(conditions, success, error) {
	try{
		Rule.remove(conditions, function(err, numberAffected){
			if(err)
				error(err);
			else
				success({
					numberAffected:numberAffected
				});
		});
	}catch(e){
		error(e);
	}
	
};

function _find(conditions, fields, options, success, error){
	
	try{
		Rule.find(conditions, fields, options).populate('action').populate('restrictions.variable').populate('restrictions.operator').sort('priority').exec(function (err, docs) {
			if(err)
				error(err);
			else
				success(docs);
		});

	}catch(e){
		error(e);
	};
	
};

function _addRestrictions(id, ruleVarCod, ruleOperatorCod, value, success, error){

	try{

		RuleOperatorDao.find({code:ruleOperatorCod}, undefined, undefined, function(result) {
	    	if(!result)
	    		error("RULE_OPERATOR_NOT_FOUND");

	    	var vRuleOperator = new RuleOperator(result[0]);
	    	getRuleVar(vRuleOperator)

	    }, function(error){
	    	error("RULE_OPERATOR_NOT_FOUND");
	    });


	    function getRuleVar(vRuleOperator){
	    	RuleVarDao.find({code:ruleVarCod}, undefined, undefined, function(result) {
	    	if(!result)
	    		error("RULE_VAR_NOT_FOUND");

	    	var vRuleVar = new RuleVar(result[0]);
	    	saveRestrictions(vRuleOperator, vRuleVar);

		    }, function(error){
		    	error("RULE_VAR_NOT_FOUND");
		    });
	    }

	    function saveRestrictions(vRuleOperator, vRuleVar){
	    	var data = {
		    	variable: vRuleVar,
		    	operator: vRuleOperator,
		    	value: value
		    }

		    console.log(id);

	    	_update({_id:id}, {$push:{restrictions:data}}, function(result){
	    		success(result);
	    	}, function(error){
	    		error(error);
	    	})
	    }

	}catch(e){
		error(e);
	}

    

	/*Rule.find({
        _id: req.params.id
    }, undefined, undefined, function success(result) {
        res.json(new Response().success(result));

    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });*/
}


exports.save 	= _save;
exports.update 	= _update;
exports.delete 	= _delete;
exports.find 	= _find;
exports.addRestrictions = _addRestrictions;



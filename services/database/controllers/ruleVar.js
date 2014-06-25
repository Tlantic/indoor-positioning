var RuleVar    = require('../dao/RuleVar');

exports.save = function(req, res, next) {
   	var ruleVar = req.body;
   	
   	RuleVar.save(ruleVar, function success(result){
   		res.json({
	        result:result
	    });

   	},function error(error){
   		 res.status(400).send(error);
   	});    
};

exports.update=function(req, res, next){
	var conditions = req.body.conditions;
  var data = req.body.data;
  RuleVar.update(conditions, data, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
	
};

exports.delete=function(req, res, next){
  var conditions = req.body.conditions;
  RuleVar.delete(conditions, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
  
};

exports.findById=function(req, res, next){
    RuleVar.find({_id:req.params.id}, undefined, undefined, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
};

exports.find=function(req, res, next){

    var conditions = req.body.conditions;
    var fields = req.body.fields;
    var options = req.body.options;

    RuleVar.find(conditions, fields, options, function success(result){
      res.send({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
};



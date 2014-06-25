var Device    = require('../dao/Device');
var Response  = require('../config/response');

exports.save = function(req, res, next) {
   	var device = req.body;
   	
   	Device.save(device, function success(result){
   		res.json(new Response().success(result));

   	},function error(error){
   		 res.status(500).send(new Response().error(error));
   	});    
};

exports.update=function(req, res, next){
	var conditions = req.body.conditions;
  var data = req.body.data;
  Device.update(conditions, data, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
	
};

exports.delete=function(req, res, next){
  var conditions = req.body.conditions;
  Device.delete(conditions, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
  
};

exports.findById=function(req, res, next){
    Device.find({_id:req.params.id}, undefined, undefined, function success(result){
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

    Device.find(conditions, fields, options, function success(result){
      res.send({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
};



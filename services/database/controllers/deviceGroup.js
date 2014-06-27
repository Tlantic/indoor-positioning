var DeviceGroup = require('../dao/DeviceGroup'),
    Response = require('../config/response');

exports.save = function(req, res, next) {
    var device = req.body;
    
    DeviceGroup.save(device, function success(result){
     
      res.json(new Response().success(result));

    },function error(error){
        res.status(500).send(new Response().error(error));
    });    
};

exports.update=function(req, res, next){
  var conditions = req.body.conditions;
  var data = req.body.data;
  DeviceGroup.update(conditions, data, function success(result){
      res.json(new Response().success(result));

    },function error(error){
       res.status(500).send(new Response().error(error));
    });
  
};

exports.delete=function(req, res, next){
  var conditions = req.body.conditions;
  DeviceGroup.delete(conditions, function success(result){
     
     res.json(new Response().success(result));

    },function error(error){
        res.status(500).send(new Response().error(error));
    });
  
};

exports.findById=function(req, res, next){
    DeviceGroup.find({_id:req.params.id}, undefined, undefined, function success(result){
      res.json(new Response().success(result));

    },function error(error){
       res.status(500).send(new Response().error(error));
    });
};

exports.find=function(req, res, next){

    var conditions = req.body.conditions;
    var fields = req.body.fields;
    var options = req.body.options;

    DeviceGroup.find(conditions, fields, options, function success(result){
     
     res.json(new Response().success(result));

    },function error(error){
       res.status(500).send(new Response().error(error));
    });
};



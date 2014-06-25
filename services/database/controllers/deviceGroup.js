var DeviceGroup    = require('../dao/DeviceGroup');

exports.save = function(req, res, next) {
    var device = req.body;
    
    DeviceGroup.save(device, function success(result){
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
  DeviceGroup.update(conditions, data, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
  
};

exports.delete=function(req, res, next){
  var conditions = req.body.conditions;
  DeviceGroup.delete(conditions, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
  
};

exports.findById=function(req, res, next){
    DeviceGroup.find({_id:req.params.id}, undefined, undefined, function success(result){
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

    DeviceGroup.find(conditions, fields, options, function success(result){
      res.send({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
};



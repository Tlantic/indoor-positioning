var Area    = require('../dao/Area');

exports.save = function(req, res, next) {
   	var area = req.body;
   	
   	Area.save(area, function success(result){
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
  Area.update(conditions, data, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
	
};

exports.delete=function(req, res, next){
  var conditions = req.body.conditions;
  Area.delete(conditions, function success(result){
      res.json({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
  
};

exports.findById=function(req, res, next){
    Area.find({_id:req.params.id}, undefined, undefined, function success(result){
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

    Area.find(conditions, fields, options, function success(result){
      res.send({
          result:result
      });

    },function error(error){
       res.status(400).send(error);
    });
};



var DeviceGroupDao    = require('../dao/DeviceGroup');

exports.save = function(req, res, next) {
   	var deviceGroup = req.body;
   	console.log(deviceGroup);
   	DeviceGroupDao.save(deviceGroup, function success(result){
   		res.send({
	        result:result
	    });

   	},function error(error){
   		 res.status(400).send(error);
   	});
    
  
};


exports.queue=function(req, res, next){
	
	 res.send({
        result:'ok'
    })
}
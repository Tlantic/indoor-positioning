var mongoose = require('mongoose'),
    DeviceGroup = mongoose.model('DeviceGroup');



exports.info = function(req, res, next) {
   
    res.send({
        result:'Home'
    })
  
};
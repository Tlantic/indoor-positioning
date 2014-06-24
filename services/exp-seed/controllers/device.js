


exports.info = function(req, res, next) {
   
    res.send({
        result:'Home'
    })
  
};


exports.queue=function(req, res, next){
	
	 res.send({
        result:'ok'
    })
}
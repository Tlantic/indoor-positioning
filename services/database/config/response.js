function Response () {

  this.error = function(data, status){
  	return {
  		data : data,
	  	status : "ERROR"
  	}
  };

  this.success = function(data, status){
  	return {
  		data : data,
	  	status : "OK"
  	}
  };
}

Response.prototype.constructor = Response;

module.exports = Response;
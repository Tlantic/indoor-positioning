function SecurityError (code, error) {
  Error.call(this, error.message);
  this.message = error.message;
  this.code = code;
  this.status = 401;
  this.inner = error;
}

SecurityError.prototype = Object.create(Error.prototype);
SecurityError.prototype.constructor = SecurityError;

module.exports = SecurityError;
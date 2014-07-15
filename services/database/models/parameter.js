var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ParameterSchema = new Schema({
    code: {type: String, default: ''},
    value: {type: String, default: ''},
    organizationCode: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


ParameterSchema.path('code').validate(function(code){
    return code.length;
}, 'Code cannot be blank');

ParameterSchema.path('value').validate(function(value){
    return value.length;
}, 'Value cannot be blank');


ParameterSchema.pre('save', function(next){
   next();
});


mongoose.model('Parameter', ParameterSchema);
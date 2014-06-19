var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesOperatorsSchema = new Schema({
    name: {type: String, default: ''},
    code: {type: String, default: ''},
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


RulesOperatorsSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');

RulesOperatorsSchema.path('code').validate(function(name){
    return code.length;
}, 'Code cannot be blank');


RulesOperatorsSchema.pre('save', function(next){
   next();
});


mongoose.model('RulesOperators', RulesOperatorsSchema);
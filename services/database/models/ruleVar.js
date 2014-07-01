var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesVarsSchema = new Schema({
    name: {type: String, default: ''},
    group: {type: String, default: ''},
    type: {type: String, enum: ['area', 'poi'], default: ''},
    status: {type: String, default: ''},
    code: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


RulesVarsSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


RulesVarsSchema.pre('save', function(next){
   next();
});


mongoose.model('RuleVar', RulesVarsSchema);
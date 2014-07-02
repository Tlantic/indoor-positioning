var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesActionsSchema = new Schema({
    name: {type: String, default: ''},
    code: {type: String, default: ''},
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now},
    actionParams: [{
        code: {type: String, default: ''},
        name: {type: String, default: ''},
        value: {type: String, default: ''}
    }]
});


RulesActionsSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


RulesActionsSchema.pre('save', function(next){
   next();
});


mongoose.model('RuleAction', RulesActionsSchema);
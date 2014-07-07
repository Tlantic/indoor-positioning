var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesSchema = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    organitationCode: {type: String, default: ''},
    priority: {type: Number, default: 0},
    restrictions: [{
    	variable: {type: Schema.Types.ObjectId, ref: 'RuleVar'},
    	operator: {type: Schema.Types.ObjectId, ref: 'RuleOperator'},
    	value: {type: String, default: ''}
    }],
    action: {type: Schema.Types.ObjectId, ref: 'RuleAction'},
    status: {type: String, default: ''},
    attachType: {type: String, default: ''},
    attachCode: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now},
    actionParams: [{
        code: {type: String, default: ''},
        name: {type: String, default: ''},
        value: {type: String, default: ''}
    }]
});


RulesSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


RulesSchema.pre('save', function(next){
   next();
});


mongoose.model('Rule', RulesSchema);
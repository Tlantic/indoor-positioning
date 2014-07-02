var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesSchema = new Schema({
    name: {type: String, default: ''},
    type: {type: String, enum: ['area', 'poi'], default: ''},
    description: {type: String, default: ''},
    organitation: {type: Schema.Types.ObjectId, ref: 'Organization'},
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
    actionData: {type:String, default: ''}
});


RulesSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


RulesSchema.pre('save', function(next){
   next();
});


mongoose.model('Rule', RulesSchema);
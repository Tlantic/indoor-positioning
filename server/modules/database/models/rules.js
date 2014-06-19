var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RulesSchema = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    organitation: {type: Schema.Types.ObjectId, ref: 'Organization'},
    priority: {type: Number, default: 0},
    restrictions: [{
    	variable: {type: Schema.Types.ObjectId, ref: 'RulesVars'},
    	operator: {type: Schema.Types.ObjectId, ref: 'RulesOperators'},
    	value: {type: String, default: ''}
    }],
    action: {type: Schema.Types.ObjectId, ref: 'RulesActions'},
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


RulesSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


RulesSchema.pre('save', function(next){
   next();
});


mongoose.model('Rules', RulesSchema);
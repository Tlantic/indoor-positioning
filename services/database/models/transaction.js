var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransactionSchema = new Schema({
    code: {type: String, default: ''},
    value: {type: Number, default: ''},
    status: {type: String, enum: ['R', 'S', 'P'], default: ''},
    date: {type: String, default: ''},
    line: {type: String, default: ''},
    poi: {type:Object},
    level: {type: String, default: ''},
    organizationCode: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now},
    result:{type:Object}
});


TransactionSchema.path('code').validate(function(code){
    return code.length;
}, 'Code cannot be blank');

TransactionSchema.path('status').set(function(value){
    return value.toUpperCase();
});

TransactionSchema.path('value').validate(function(value){
    return value>0;
}, 'Value > 0');

TransactionSchema.path('poi').validate(function(poi){
    return poi;
}, 'Poi cannot be null');


TransactionSchema.pre('save', function(next){
   next();
});


mongoose.model('Transaction', TransactionSchema);
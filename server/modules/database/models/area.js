var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AreaSchema = new Schema({
    name: {type: String, default: ''},
    organitation: {type: Schema.Types.ObjectId, ref: 'Organization'},
    poi: [{type: Schema.Types.ObjectId, ref: 'POI'}],
    rules: [{type: Schema.Types.ObjectId, ref: 'Rules'}],
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


AreaSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


AreaSchema.pre('save', function(next){
   next();
});


mongoose.model('Area', AreaSchema);
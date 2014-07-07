var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AreaSchema = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    organitationCode: {type: String, default: ''},
    points: [{x: Number, y: Number}],
    status: {type: String, default: ''},
    code: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


AreaSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


AreaSchema.pre('save', function(next){
   next();
});


mongoose.model('Area', AreaSchema);
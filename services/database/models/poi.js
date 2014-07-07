var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var POISchema = new Schema({
    name: {type: String, default: ''},
    organitationCode: {type: String, default: ''},
    radius: {type: Number, default: 0.0},
    coordinates: [{latitude: Number, longitude: Number}],
    rules: [{type: Schema.Types.ObjectId, ref: 'Rules'}],
    status: {type: String, default: ''},
    code: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


POISchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


POISchema.pre('save', function(next){
   next();
});


mongoose.model('Poi', POISchema);
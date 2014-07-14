var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var POISchema = new Schema({
    name: {type: String, default: ''},
    organizationCode: {type: String, default: ''},
    radius: {type: Number, default: 0.0},
    coordinates: [{latitude: Number, longitude: Number}],
    status: {type: String, default: ''},
    internalCode: {type: String, default: ''},
    type: {type: String, enum: ['POS', 'PROMO', 'ZONE'], default: ''},
    externalCode: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


POISchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


POISchema.pre('save', function(next){
   next();
});


mongoose.model('Poi', POISchema);
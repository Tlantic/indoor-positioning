var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var DeviceGroupSchema = new Schema({
    name: {type: String, default: ''},
    orgId: {type: String, default: ''},
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


DeviceGroupSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


DeviceGroupSchema.pre('save', function(next){
   next();
});


mongoose.model('DeviceGroup', DeviceGroupSchema);
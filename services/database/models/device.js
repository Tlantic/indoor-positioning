var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var DeviceSchema = new Schema({
    name: {type: String, default: ''},
    macAddr: {type: String, default: ''},
    uuid: {type: String, default: ''},
    os: {type: String, default: ''},
    lastAccessDate: {type: String, default: ''},
    deviceGroup: {type: Schema.Types.ObjectId, ref: 'DeviceGroup'},
    status: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


DeviceSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


DeviceSchema.pre('save', function(next){
   next();
});


mongoose.model('Device', DeviceSchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var OrganizationSchema = new Schema({
    name: {type: String, default: ''},
    status: {type: String, default: ''},
    code: {type: String, default: ''},
    externalCode: {type: String, default: ''},
    _createdAt: {type:Date, default: Date.now}
});


OrganizationSchema.path('name').validate(function(name){
    return name.length;
}, 'Name cannot be blank');


OrganizationSchema.pre('save', function(next){
   next();
});


mongoose.model('Organization', OrganizationSchema);
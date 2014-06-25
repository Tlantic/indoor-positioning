var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PacketAreaSchema = new Schema({
    device: {type: Schema.Types.ObjectId, ref: 'Device'},
    organitation: {type: Schema.Types.ObjectId, ref: 'Organization'},
    event: {
    	type: {type: String, enum: ['in','out','near']},
    	fromArea: {type: Schema.Types.ObjectId, ref: 'Area'},
    	toArea: {type: Schema.Types.ObjectId, ref: 'Area'},
    	inside: {type: Boolean},
    },
    distance: {type: Number},
    direction: {type: String, enum: ['forward','backward']},
    timestamp: {type: Date, default: Date.now},
    _createdAt: {type:Date, default: Date.now}
});


PacketAreaSchema.path('event.type').set(function(value){
    return value.toLowerCase();
});


PacketAreaSchema.pre('save', function(next){
   next();
});


mongoose.model('PacketArea', PacketAreaSchema);
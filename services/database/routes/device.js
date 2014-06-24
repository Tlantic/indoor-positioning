'use strict';

var device = require('../controllers/device');

module.exports = function(r) {

	r.route('/device')
        .post(device.save);

    r.route('/device')
        .put(device.update);

    r.route('/device')
        .delete(device.delete);

    r.route('/device/:id')
        .get(device.findById);

    r.route('/device/find')
        .post(device.find);

    
}
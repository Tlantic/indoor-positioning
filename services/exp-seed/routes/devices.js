'use strict';

var device = require('../controllers/device');

module.exports = function(r) {

	r.route('/device')
        .get(device.info);

    r.route('/device/queue')
    	.get(device.queue);
}
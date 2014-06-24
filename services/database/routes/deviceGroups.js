'use strict';

var device = require('../controllers/deviceGroup');

module.exports = function(r) {

	r.route('/deviceGroup/save')
        .post(device.save);

    
}
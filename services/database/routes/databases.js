'use strict';

var device = require('../controllers/database');

module.exports = function(r) {

	r.route('/collections')
        .get(device.collections);

    
}
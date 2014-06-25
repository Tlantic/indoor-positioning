'use strict';

var deviceGroup = require('../controllers/deviceGroup');

module.exports = function(r) {

	r.route('/deviceGroup')
        .post(deviceGroup.save);

    r.route('/deviceGroup')
        .put(deviceGroup.update);

    r.route('/deviceGroup')
        .delete(deviceGroup.delete);

    r.route('/deviceGroup/:id')
        .get(deviceGroup.findById);

    r.route('/deviceGroup/find')
        .post(deviceGroup.find);

    
}
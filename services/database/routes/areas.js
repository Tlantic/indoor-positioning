'use strict';

var area = require('../controllers/area');

module.exports = function(r) {

	r.route('/area')
        .post(area.save);

    r.route('/area')
        .put(area.update);

    r.route('/area')
        .delete(area.delete);

    r.route('/area/:id')
        .get(area.findById);

    r.route('/area/find')
        .post(area.find);

    
}
'use strict';

var poi = require('../controllers/poi');

module.exports = function(r) {

	r.route('/poi')
        .post(poi.save);

    r.route('/poi')
        .put(poi.update);

    r.route('/poi')
        .delete(poi.delete);

    r.route('/poi/:id')
        .get(poi.findById);

    r.route('/poi/find')
        .post(poi.find);

    
}
'use strict';

var parameter = require('../controllers/parameter');

module.exports = function(r) {

	r.route('/parameter')
        .post(parameter.save);

    r.route('/parameter')
        .put(parameter.update);

    r.route('/parameter')
        .delete(parameter.delete);

    r.route('/parameter/:id')
        .get(parameter.findById);

    r.route('/parameter/find')
        .post(parameter.find);

    
}
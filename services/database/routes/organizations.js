'use strict';

var organization = require('../controllers/organization');

module.exports = function(r) {

	r.route('/organization')
        .post(organization.save);

    r.route('/organization')
        .put(organization.update);

    r.route('/organization')
        .delete(organization.delete);

    r.route('/organization/:id')
        .get(organization.findById);

    r.route('/organization/find')
        .post(organization.find);

    
}
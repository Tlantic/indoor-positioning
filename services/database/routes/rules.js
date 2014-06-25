'use strict';

var rule = require('../controllers/rule');

module.exports = function(r) {

	r.route('/rule')
        .post(rule.save);

    r.route('/rule')
        .put(rule.update);

    r.route('/rule')
        .delete(rule.delete);

    r.route('/rule/:id')
        .get(rule.findById);

    r.route('/rule/find')
        .post(rule.find);

    
}
'use strict';

var ruleOperator = require('../controllers/ruleOperator');

module.exports = function(r) {

	r.route('/ruleOperator')
        .post(ruleOperator.save);

    r.route('/ruleOperator')
        .put(ruleOperator.update);

    r.route('/ruleOperator')
        .delete(ruleOperator.delete);

    r.route('/ruleOperator/:id')
        .get(ruleOperator.findById);

    r.route('/ruleOperator/find')
        .post(ruleOperator.find);

    
}
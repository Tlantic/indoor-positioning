'use strict';

var ruleAction = require('../controllers/ruleAction');

module.exports = function(r) {

	r.route('/ruleAction')
        .post(ruleAction.save);

    r.route('/ruleAction')
        .put(ruleAction.update);

    r.route('/ruleAction')
        .delete(ruleAction.delete);

    r.route('/ruleAction/:id')
        .get(ruleAction.findById);

    r.route('/ruleAction/find')
        .post(ruleAction.find);

    
}
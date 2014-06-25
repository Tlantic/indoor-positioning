'use strict';

var ruleVar = require('../controllers/ruleVar');

module.exports = function(r) {

	r.route('/ruleVar')
        .post(ruleVar.save);

    r.route('/ruleVar')
        .put(ruleVar.update);

    r.route('/ruleVar')
        .delete(ruleVar.delete);

    r.route('/ruleVar/:id')
        .get(ruleVar.findById);

    r.route('/ruleVar/find')
        .post(ruleVar.find);

    
}
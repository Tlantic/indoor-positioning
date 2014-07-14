'use strict';

var transaction = require('../controllers/transaction');

module.exports = function(r) {

	r.route('/transaction')
        .post(transaction.save);

    r.route('/transaction')
        .put(transaction.update);

    r.route('/transaction')
        .delete(transaction.delete);

    r.route('/transaction/:id')
        .get(transaction.findById);

    r.route('/transaction/find')
        .post(transaction.find);

    
}
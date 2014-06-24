var mongoose = require('mongoose');

exports.collections = function(req, res, next){
	mongoose.connection.db.collectionNames(function (err, names) {
        console.log(names); 
       

        res.send(names);
    });

};
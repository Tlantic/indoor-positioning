'use strict';

var fs = require('fs'),
path = require('path');

var recursiveNavigation = function(modulesPath, excludeDir, callback){

	 fs.readdirSync(modulesPath).forEach(function(file) {
        var newPath = path.join(modulesPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile() && /(.*)\.(js)$/.test(file)) {
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir) {
            walk(newPath, excludeDir, callback);
        }
    });

}


module.exports.recursiveNavigation = recursiveNavigation;
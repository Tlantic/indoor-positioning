#!/usr/bin/env node
var basename = require('path').basename,
		       _ = require('lodash'),
      config = require('./config/config'),
   processor = require('./src/processor'),
         log = require('tlantic-log'); 

var type;


log.info("RETAIL QUEUE SERVICE INIT");

var args = process.argv.slice(2);

if (args.length < 1) {
  log.error('Run: %s params not found '+basename(process.argv[1]));
  process.exit(1);
}

if(_.contains(config.modes, args[0])){
	type = args[0];
	log.info('Run in '+type+' mode');
}
else
{
  log.error('Run: '+basename(process.argv[1])+' type '+tp+' not found ');
  process.exit(1);
}

processor.execute(type);




'use strict';

module.exports = {

	queue:{
    	exchange:'tlantic_ex_retail_queue',
    	url:'amqp://localhost',
    	routes:[
    		{
    			key:'detection',
    			queue:'tlantic_retail_queue'
    		}
    	]
    },
    dir:{
        input:'/home/vagrant/work/files/in/',
        error:'/home/vagrant/work/files/error/',
        out:'/home/vagrant/work/files/out/'
    },

    modes:['read', 'send']

};
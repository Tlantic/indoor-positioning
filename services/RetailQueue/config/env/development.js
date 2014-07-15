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

    modes:['read', 'send', 'consumer', 'external'],

    mqtt: {
    	user: {
	        username: 'mqttauth',
	        password: '1234'
	    },
	    port:21883,
	    url:'5.9.153.213',
	    id:'tlantic/uc2/query'
    },
    mqttResponse: { 
        user: {
            username: 'mqttauth',
            password: '1234'
        },
        port:21883,
        url:'5.9.153.213',
        id:'tlantic/uc2/response_closer'
    }

};
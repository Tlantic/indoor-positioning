'use strict';

module.exports = {
    mqtt: {
    	user: {
	        username: 'mqttauth',
	        password: '1234'
	    },
	    port:21883,
	    url:'5.9.153.213',
	    id:'tri_data/tlantic/+'
    },

    queue:{
    	exchange:'tlantic_ex_feed',
    	url:'amqp://localhost',
        key:'area'
    }
    

};
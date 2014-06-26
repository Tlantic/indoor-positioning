'use strict';

module.exports = {
    mqtt: {
    	user: {
	        username: 'mqttauth',
	        password: '1234'
	    },
	    port:21883,
	    url:'5.9.153.213',
	    id:'tlantic/poi/office'
    },

    queue:{
    	taskName:'output_action_queue',
    	url:'amqp://localhost'
    }
    

};
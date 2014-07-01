'use strict';

module.exports = {
    queue:{
    	exchange:'tlantic_ex_feed',
    	url:'amqp://localhost',
    	routes:[
    		{
    			key:'area',
    			queue:'tlantic_area_queue'
    		},
    		{
    			key:'poi',
    			queue:'tlantic_poi_queue'
    		}
    	]
    },
    outputQueue:{
    	exchange:'tlantic_ex_notification',
    	url:'amqp://localhost',
    	routes:[
    		{
    			key:'push',
    			queue:'tlantic_pushnotification_queue'
    		},
    		{
    			key:'email',
    			queue:'tlantic_email_queue'
    		}
    	]
    },
    push:{
    	url:'http://localhost:9002/send'
    },

    types:{
        PUSH_NOTIFICATIONS:'pushnotifications',
        EMAIL:'email'
    }
    

};
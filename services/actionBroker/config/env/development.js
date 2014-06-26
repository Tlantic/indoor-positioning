'use strict';

module.exports = {
    queue:{
    	taskName:'output_action_queue',
    	url:'amqp://localhost'
    },
    push:{
    	url:'http://localhost:9002/send'
    }
    

};
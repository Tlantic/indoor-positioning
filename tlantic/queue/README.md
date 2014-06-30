# Tlantic Queue Module

Provides an api for manipulating queues

#### Methods

+ queueConsumer
```js
	  Rabbit Queue Consumer
    
    method queueConsumer
    param options {Object} queue options
    param action {Function} queue consumer action
    returns null

    options = {
		url:'',
		queue:'',
		noAck: true||false,
		durable: true||false
	}

```
+ queueSendToExchanger

```js
	Rabbit Send Message to exchanger
    
    @method queueConsumer
    @param msg {Object} queue options
    @param key {String} queue route key
    @param options {Object} queue options
    @param success {Function} success send message
    @param error {Function} error send message
    @returns null
    
```


#### Adapters

+ simpleAdapter
+ restAdapter

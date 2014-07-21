var _ = require('lodash');
var i=0;
var setTT;
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function minuteRequest() {
	var arr = [];
	for (var i = 0; i <= 10; i++) {
		arr.push({
			'value': getRandomInt(1, 60)
		});
	}
	return arr;
}

function proc(arr) {
	i = i + 1;
		
	var vv = _.filter(arr, {
		'value': i
	});
	
	console.log(vv, i);


}

function init(arr) {
	
	setTT = setInterval(proc, 1000,arr);
	
}


function start() {

	var arr = _.chain(minuteRequest()).sortBy('value').value()
	init(arr);

	setInterval(function() {
		i=0
		clearInterval(setTT);
		var arr = _.chain(minuteRequest()).sortBy('value').value()
		init(arr);
	}, 60000);

}

start();
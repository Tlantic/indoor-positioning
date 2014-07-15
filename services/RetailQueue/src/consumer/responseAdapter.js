exports.getResponse = function(response) {
	return {
		ant: response.ant,
		rssi: response.rssi,
		id: response.id,
		ts: response.ts,
		dev: response.dev
	}
}

exports.isValid = function(response) {
	console.log(response);
	if (!response){
		console.log('1');
		return false;
	}
	if (response.ant===undefined){
		return false;
	}
	if (response.rssi===undefined){
		console.log('3');
		return false;
	}
	if (response.id===undefined){
		console.log('4');
		return false;
	}
	if (response.ts===undefined){
		console.log('5');
		return false;
	}
	if (response.dev===undefined){
		console.log('6');
		return false;
	}

	return true;
}
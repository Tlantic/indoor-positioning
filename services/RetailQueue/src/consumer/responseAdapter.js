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
	if (!response)
		return false;
	if (!response.ant)
		return false;
	if (!response.rssi)
		return false;
	if (!response.id)
		return false;
	if (!response.ts)
		return false;
	if (!response.dev)
		return false;

	return true;
}
var sender =  require('./sender');

exports.manager = function(resp){

	if(resp.direction==='in')
		sendMsg = "Bem-vindo ao Continente";
	else
		sendMsg = "Obrigado pela sua visita";

	var args = {
		data: {"users":["samsung"],"android":{"collapseKey":"optional","data":{"message":"You message here","alert":sendMsg}},"ios":{"badge":0,"alert":"Your message here","sound":"soundName"}},
		headers: {
			"Content-Type": "application/json"
		}
	};

	var msgToQueue = {
		operation:"PUSH_NOTIFICATION",
		data:args
	}
	
	sender.sendMsgToQueue(msgToQueue);

}
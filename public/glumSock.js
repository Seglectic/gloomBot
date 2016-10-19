/*
				glumSock.js
		Simple socket client for web
		connectivity to glumNet!
*/


this.sock = io.connect('http://localhost:9001'); //Connect to the ledServe socket

var testData = function(){
	console.log('Sending data to socket..');
	var ranData = String(Math.floor(Math.random()*100));
	this.sock.emit('test','HERE IS SOME DATA: '+ranData); //Send Data
}

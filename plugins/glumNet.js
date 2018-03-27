/*
					 glumNet.js
		"The net's foremost contender in all things gloomy and glum!"

		glumNet hosts a web display for users to see those who are banned
		as well as anything else that needs displaying from the 'public' dir.
*/
var express = require('express');
var app = express();	 								//Make express instance
app.use(express.static(__dirname + './../public/'));					//Static file routing
var port = 8080;			 						//Define port
var server = app.listen(port,function(){						//Start server instance from express.
	console.log("glumNet web server started on port",port);
});


/*
	Setup socket.io for web
	client communication
*/
var sPort = 9001 									//Socket port to use for comms
var http = require('http').Server(express);
var io = require('socket.io')(http);

io.on('connection',function(sock){
	console.log('Client connected~');

	sock.on('disconnect',function(){
		console.log('Client disconnected!!');
	});

	sock.on('test',function(testData){
		console.log(testData)
	});

});



console.log('glumNet socket hosted on port',sPort)
http.listen(sPort);

/*
								glumNet.js
		"The net's foremost contender in all things gloomy and glum!"

		glumNet hosts a web display for users to see those who are banned
		as well as anything else that needs displaying from the 'public' dir
*/
var express = require('express');
var app = express();	 							//Make express instance
app.use(express.static(__dirname + '/public'));		//Static file routing
var port = 80;			 							//Define port
var server = app.listen(port,function(){			//Start server instance from express.
	console.log("glumNet server started on port",port);
});
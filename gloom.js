/*
	
				 ❤ Gloom IRC bot ❤  
	Gloom is a bot designed specifically for the #depression
	channel on irc.rizon.net. Gloom's goal is to manage channel
	bans with a user viewable web interface and scalable plugin
	functionality.

	Gloom uses the node 'irc'  library for connectivity and 
	communication. IRC API available at: https://goo.gl/w9rsns
		
		-Segger 2016
*/


/*
	Include libraries
*/

var express = require('express');
var irc = require('irc');
var fs = require('fs');


fs.readdir('plugins',function(err,items){
	for (var i = items.length - 1; i >= 0; i--) {
		if(items[i].split('.')[1]=='js'){
			console.log("Loaded "+items[i]+" plugin.");
			require('./plugins/'+items[i]);
		}
	}
});



/*
	Setup express for web hosting 
*/
var app = express();	 							//Make express instance
app.use(express.static(__dirname + '/public'));		//Static file routing
var port = 80;			 							//Define port
var server = app.listen(port,function(){			//Start server instance from express.
	console.log("Web server started on port",port);
});



var Gloom = {
	name: "Gloom",
	server: 'irc.rizon.net',
	options: {
		userName: "Gloom",
		realName: "Gloom",
		channels:['#momoLab'],
		autoRejoin: false,
		floodProtection: true,
		floodProtectionDelay: 500,
		retryCount: 9999,
		retryDelay: 5000
	},

}

Gloom.chat = new irc.Client(Gloom.server,Gloom.name,Gloom.options)

/*
			Join Event
	Welcomes users to channel
*/
Gloom.chat.addListener("join",function(target,nick){
	if(nick == Gloom.chat.opt.nick){return;} //If self joins.
	var msgs = ['Welcome, '+nick+'!','Hi '+nick, 'Sup '+nick]; //Array of random msgs
	var msg = msgs[Math.floor(Math.random()*msgs.length)];		//Choose 1
	Gloom.chat.say(target,msg);
});

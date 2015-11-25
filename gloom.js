/*
			Gloom IRC bot
	A bot specific to the #depression
	channel on irc.rizon.net
*/

var irc = require('irc');
var fs = require('fs');

var ircConfig = {
	userName: "Gloom",
	realName: "Gloom",
	channels:["#momoLab"],
	autoRejoin: true,
	autoConnect:true,
}

gloom = new irc.Client('irc.rizon.net','Gloom',ircConfig);

/*
			Join Event
	Welcomes users to channel
*/
gloom.addListener("join",function(target,nick){
	if(nick == gloom.opt.nick){return;} //If self joins.
	var msgs = ['Welcome, '+nick+'!','Hi '+nick, 'Sup '+nick]; //Array of random msgs
	var msg = msgs[Math.floor(Math.random()*msgs.length)];		//Choose 1
	gloom.say(target,msg);
});



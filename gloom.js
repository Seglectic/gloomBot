/*
				 ❤ Gloom IRC bot ❤
	Gloom is a bot designed specifically for the #depression
	channel on irc.rizon.net. Gloom's goal is to manage channel
	bans with a user viewable web interface and scalable plugin
	functionality.

	Gloom uses the node 'irc' library for connectivity and
	communication. IRC API available at: https://goo.gl/w9rsns

		-Segger 2016
*/


/*
	Include static libraries
*/
var irc = require('irc');
var fs = require('fs');

/*
	Load plugins
*/
fs.readdir('plugins',function(err,items){
	var loadPlugs = "";
	for (var i = items.length - 1; i >= 0; i--) {
		if(items[i].split('.')[1]=='js'){
			require('./plugins/'+items[i]);
			loadPlugs+=" | "+items[i];
		}
	}
	console.log("\n*** Loaded plugins:"+loadPlugs+".\n");
});

/*
	Creates the main 'Gloom' object
*/

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

/*
	Gloom's IRC object
*/
Gloom.chat = new irc.Client(Gloom.server,Gloom.name,Gloom.options)
console.log("\n|| Gloom initialized :3 ||" )


/*
		MOTD Event
*/
Gloom.chat.addListener('motd',function(motd){
	console.log('\n IRC connection established. ( ˘ ³˘)♥\n')
});

/*
		Join Event
*/
Gloom.chat.addListener("join",function(targ,nick){
	welcum(Gloom,targ,nick);

});

/*
		Message Event
*/
Gloom.chat.addListener('message',function(nick,targ,msg){
	console.log('['+targ+'] ' +nick+": "+ msg)
	var smsg = msg.split(' ');  //Split message into array
	var command = smsg[0].toLowerCase(); 					  //First word of msg can be assumed a command

	//Processes commands
	switch(command){
		case "!slap": slap(Gloom,nick,targ,smsg); break;
		case "!mew": updateJSON();break;
	}

});

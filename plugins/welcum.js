/*
					welcum.js
	This plugin welcomes users to the channel
	Selects a random greeting for new users

	To avoid spam, welcum should:
		Wait a short while before welcoming
		
		Have a cooldown per-nick/host to not
		welcome the same users over and over

	Welcum should also welcome back regular or voiced users :3
*/


welcum = function(Gloom,targ,nick){
	if(nick == Gloom.chat.opt.nick){return;} //If self joins.
	var msgs = [
		'Welcome, '+nick+'!', //Array of random msgs
		"Hi "+nick, 
		"Sup "+nick,
		"Hey look, it's "+nick+"!"
	]; 
	var msg = msgs[Math.floor(Math.random()*msgs.length)]; //Selects a random msg
	Gloom.chat.say(targ,msg);
}
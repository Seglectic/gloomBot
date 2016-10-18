/*
					slap.js
		Somewhat generic slapping script
		to use as an example for commands
*/

var tally = [ //How many we slappin with?
	'some',
	'a few',
	'like a million',
	'inumerable',
	'a dozen',
	'a handful',
	'a bag of',
	'a truckload of',
];

var adject = [ //Adjective for slap object
	'dirty',
	'filthy',
	'smelly',
	'spiffy',
	'elegant',
	'snazzy',
	'chic',
	'grubby',
	'grimy',
	'convoluted',
	'intricate',
];

var slapject = [ //Object to slap with
	'goats',
	'panties',
	'trout',
	'cod',
	'nipples',
	'mealworms',
	'tacos',
];

slap = function(Gloom,nick,targ,smsg){
	if (smsg.length<2){return};
	var t = tally[Math.floor(Math.random()*tally.length)];
	var a = adject[Math.floor(Math.random()*adject.length)];
	var s = slapject[Math.floor(Math.random()*slapject.length)];
	var slapMsg = nick+" slapped "+smsg[1]+" with "+t+" "+a+" "+s+"!";
	Gloom.chat.say(targ,slapMsg);

}
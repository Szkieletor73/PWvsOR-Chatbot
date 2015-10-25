// EXPRESS BLOCK for avoiding Heroku's R10 error
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
// END OF EXPRESS BLOCK

var Discord = require("discord.js");
var bot = new Discord.Client();

//Initialize MAGGIE table
var maggies = ["http://www.hellomagazine.com/imagenes/profiles/margaret-thatcher/6043-margaret-thatcher.jpg","http://www.abc.net.au/news/image/3980674-3x4-700x933.jpg","http://i.telegraph.co.uk/multimedia/archive/02530/Thatcher2_2530641b.jpg","http://www.barbarapijan.com/bpa/Politics/ThatcherMargaret198x.jpg"];

//Called on message, basically chat commands
bot.on("message", function(message){
		//anti lolz
		// if(message.author.username === "Lolzrfunni"){
		// bot.reply(message, "fackorrf");
		// }else{

			//make message content only check the first word
			var commandsArr = message.content.split(' ');
			var command = commandsArr[0];
			
			//anti lolz
			if(message.author.username === "Lolzrfunni"){
				if(command === "eejitry" || command === "eejitry."){
					bot.reply(message, "fackorff");
				}
			}
			//version info
			if(command === "\\author" || command === "\\creator" || command === "\\info"){
				bot.sendMessage(message.author, "Bot based on discord.js. Bot creator: /u/szkieletor on reddit.\nSource on GitHub: https://github.com/Szkieletor73/PWvsOR-Chatbot\nContact my creator if you've encountered any problems!");
			}

			//help
			if(command === "\\help"){
				bot.sendMessage(message.author, "All commands work in PMs and in channels:\n\\roll XdY - roll X Y-sided dice\n\\chromamap (alias: \\map) - get a link to interactive map\n\\info (aliases: \\creator, \\author) - get contact details of my creator.\n\\troops (alias: \\trooptypes) - get basic troop type flowchart\n\\chromabot (aliases: \\chromabotcommands, \\battlecommands, \\chromacommands) - gives you a list of chromabot commands as well as a direct link to chromabot's /user/page.\n\\links - gives you a list of useful chroma-related links.\n\\rules - gives you chat rules. They're also linked in \\links\nMore to come.");
			}
			
			//simple testing message
			// if(command === "marco"){
				// bot.reply(message, "Polo!");
			// }
			
			//rolling dice
			if(command === "\\roll"){
				var roll = message.content.split(' '); //split the command into !roll, and separate xdx for interpretation
				roll.shift(); // removing first word, that is, !roll
				//roll = roll.join(' '); //rejoin the string without !roll
				roll = roll[0]; //now roll is only XdY
				roll = roll.split('d'); //split by d, so 1d6 becomes array(1,6)
				var diceAmmount = roll[0]; //diceAmmount is first number of roll array
				var diceType = roll[1]; //diceType is second number of roll array
				if (diceType != ""){
					if(diceAmmount == ""){
						diceAmmount = 1;
					}
					var total = 0;
					var result = "";
					if(diceAmmount != 1) {
						for (i = 0; i < diceAmmount; i++) {
							var currentRoll = 0;
							currentRoll = Math.floor(Math.random() * diceType) + 1;
							total = total + currentRoll;
							if ((diceAmmount-i) != 1){
								result = result + currentRoll + ", ";
							}else{
								result = result + currentRoll;
							}
						}
						bot.reply(message, "you rolled " + total + "(" + result + ")");
					}else{
					total = Math.floor(Math.random() * diceType) + 1;
					bot.reply(message, "you rolled " + total);
					}
				}else{
					bot.reply(message, "please use \\roll XdY format, where X is number of dice, and Y is number of sides!");
				}
			}
			
			//send a pm with map link
			if(command === "\\map" || command === "\\chromamap"){
				bot.sendMessage(message.author, "http://periwinklevsorangered.com/map/index.php");
			}
			
			//troop types!
			if(command === "\\troops" || command === "\\trooptypes"){
				bot.sendMessage(message.author, "OPPOSE: Cavalry beats Infantry, Infantry beats Ranged, Ranged beats Cavalry\nSUPPORT: Cavalry for Ranged, Ranged for Infantry, Infantry for Cavalry");
			}
			
			//don't even ask why I did this
			if(command === "\\maggie" || command === "\\thatcher" || command === "\\margaret"){
				var maggie = maggies[Math.floor(Math.random()*maggies.length)];
				bot.sendMessage(message.channel, "INSTANT MAGGIE PROTOCOL ACTIVATED.\nDEPLOYING MAGGIE: " + maggie);
			}
			
			//chromabot commands
			if(command === "\\chromabot" || command === "\\chromabotcommands" || command === "\\chromacommands"){
				bot.sendMessage(message.author, "Full documentation: https://www.reddit.com/r/councilofkarma/wiki/bot_commands\nChromabot's userpage: https://www.reddit.com/user/chromabot\nstatus - gives you a status on your troops\ntime - bot will reply with the time it think it is\nlead - lead your troops\nextract - emergency unstuck command, moves your troops to your capital\nattack / support / oppose - battle commands\ndefect - change your team. Usable only if you haven't taken *any other action* yet.\ncodeword - set up a codeword for your troops, in format \"codeword some word or phrase is troopType\". Supports reddit markdown formatting.\ncodeword status - replies with your set codewords");
			}
			
			//links
			if(command === "\\links"){
				bot.sendMessage(message.author, "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit\nChromabot's userpage: https://www.reddit.com/user/chromabot\nCouncil of Karma: https://www.reddit.com/r/councilofkarma\nPeriwinkle: https://www.reddit.com/r/periwinkle\nOrangered: https://www.reddit.com/r/orangered\nChromanauts: https://www.reddit.com/r/chromanauts\nField of Karmic Glory: https://www.reddit.com/r/FieldOfKarmicGlory\nChromalore: https://www.reddit.com/r/Chromalore\nInteractive map: http://periwinklevsorangered.com/map/index.php\nGMP Dubtrack: https://www.dubtrack.fm/join/goodmorningperiwinkle");
			}
			
			//rules
			if(command === "\\rules"){
				bot.sendMessage(message.author, "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit");
			}
			
		// } //anti lolz ends here hopefully we never have to deploy it again
} )

//fired when new person enters the server
bot.on("serverNewMember", function(user, server){
	bot.sendMessage(server.defaultChannel, "Welcome to Periwinkle vs Orangered Discord Chat! I'm a resident bot. Type \"\\help\" to get a list of available commands. Type \"\\rules\" to get current chat rules!\nIf you have any questions, ask a moderator!");
})

//fired on logout/login
// bot.on("presence", function(dataObject){
	// if(dataObject.status === "online"){
		// bot.sendMessage(dataObject.server.defaultChannel, "*" + dataObject.user + " is now online.*");
	// }
	// if(dataObject.status === "offline"){
		// bot.sendMessage(dataObject.server.defaultChannel, "*" + dataObject.user + " went offline.*");
	// }
// })
//TEMPORARILY DISABLED, we'll see if it will stay that way

bot.login("szkieletorpp@gmail.com", "169806");
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
			if(command === "eejitry" && message.author.username === "Lolzrfunni"){
				bot.reply(message, "fackorff");
			}
			
			//version info
			if(command === "\\version" || command === "\\author" || command === "\\creator" || command === "\\info"){
				var version = "0.1.2";
				bot.sendMessage(message.author, "Current version: " + version + ". Bot creator: /u/szkieletor on reddit. Contact my creator if you've encountered any problems!");
			}

			//help
			if(command === "\\help"){
				bot.sendMessage(message.author, "All commands work in PMs and in channels:\n\\roll XdY - roll X Y-sided dice\n\\chromamap (alias: \\map) - get a link to interactive map\n\\info (aliases: \\creator, \\author, \\version) - get contact details of my creator, as well as my version.\n\\troops (alias: \\trooptypes) - get basic troop type flowchart\nMore to come.");
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
		// } //anti lolz ends here hopefully we never have to deploy it again
} )

//fired when new person enters the server
bot.on("serverNewMember", function(user){
	bot.sendMessage(user, "Welcome to Periwinkle vs Orangered Discord Chat! I'm a resident bot. Send me \"\\help\" to get a list of commands.\nIf you have any questions, ask a moderator!");
})

//fired on logout/login
bot.on("presence", function(dataObject){
	//if(dataObject.status === "online"){
		bot.sendMessage(dataObject.server.defaultChannel, dataObject.user + " has had a presence update: " + dataObject.status);
	//}
})

bot.login("szkieletorpp@gmail.com", "169806");
// EXPRESS BLOCK for avoiding Heroku's R10 error
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
// END OF EXPRESS BLOCK


var Discord = require("discord.js"); //load discord.js node module
var bot = new Discord.Client();

//Initialize MAGGIE
var maggies = ["http://www.hellomagazine.com/imagenes/profiles/margaret-thatcher/6043-margaret-thatcher.jpg",
	"http://www.abc.net.au/news/image/3980674-3x4-700x933.jpg",
	"http://i.telegraph.co.uk/multimedia/archive/02530/Thatcher2_2530641b.jpg",
	"http://www.barbarapijan.com/bpa/Politics/ThatcherMargaret198x.jpg"];
var stringMaggie = "INSTANT MAGGIE PROTOCOL ACTIVATED.\nDEPLOYING MAGGIE: ";

//Initialize facepalm
var facepalm = ["https://teacherorwildlifetrainer.files.wordpress.com/2015/08/double_facepalm.png",
	"https://i.imgur.com/iWKad22.jpg",
	"https://upload.wikimedia.org/wikipedia/commons/3/3b/Paris_Tuileries_Garden_Facepalm_statue.jpg",
	"https://pbs.twimg.com/profile_images/1596470229/facepalm1.jpg"];

//Initialize eightball
var eightball = ["It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes, definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
	"Reply hazy, try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful"];
	
//Initialize away array
var away = [];

//Initialize status messages
// var statusmessages = false;
var statusmessages = [];

//Initialization of message strings
var stringInfo = "Bot based on discord.js: http://hydrabolt.github.io/discord.js/\n Bot creator: /u/szkieletor on reddit.\nSource on GitHub: https://github.com/Szkieletor73/PWvsOR-Chatbot\nContact my creator if you've encountered any problems, and/or make a pull request if you can fix them!";
var stringHelp = "All commands work in PMs and in channels:\n\\roll XdY - roll X Y-sided dice\n\\chromamap (alias: \\map) - get a link to interactive map\n\\info (aliases: \\creator, \\author) - get contact details of my creator.\n\\troops (alias: \\trooptypes) - get basic troop type flowchart\n\\chromabot (aliases: \\chromabotcommands, \\battlecommands, \\chromacommands) - gives you a list of chromabot commands as well as a direct link to chromabot's /user/page.\n\\links - gives you a list of useful chroma-related links.\n\\rules - gives you chat rules. They're also linked in \\links\n\\emotes - lists all available emotes.";
var stringMap = "http://periwinklevsorangered.com/map/index.php";
var stringTroops = "OPPOSE: Cavalry beats Infantry, Infantry beats Ranged, Ranged beats Cavalry\nSUPPORT: Cavalry for Ranged, Ranged for Infantry, Infantry for Cavalry";
var stringCommands = "Full documentation: https://www.reddit.com/r/councilofkarma/wiki/bot_commands\nChromabot's userpage: https://www.reddit.com/user/chromabot\nstatus - gives you a status on your troops\ntime - bot will reply with the time it think it is\nlead - lead your troops\nextract - emergency unstuck command, moves your troops to your capital\nattack / support / oppose - battle commands\ndefect - change your team. Usable only if you haven't taken *any other action* yet.\ncodeword - set up a codeword for your troops, in format \"codeword some word or phrase is troopType\". Supports reddit markdown formatting.\ncodeword status - replies with your set codewords";
var stringLinks = "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit\nChromabot's userpage: https://www.reddit.com/user/chromabot\nCouncil of Karma: https://www.reddit.com/r/councilofkarma\nPeriwinkle: https://www.reddit.com/r/periwinkle\nOrangered: https://www.reddit.com/r/orangered\nChromanauts: https://www.reddit.com/r/chromanauts\nField of Karmic Glory: https://www.reddit.com/r/FieldOfKarmicGlory\nChromalore: https://www.reddit.com/r/Chromalore\nInteractive map: http://periwinklevsorangered.com/map/index.php\nGMP Dubtrack: https://www.dubtrack.fm/join/goodmorningperiwinkle";
var stringRules = "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit";
var stringEmotes = "Emotes:\n\\bazza\n\\kappa\n\\biblethump\n\\frankerz\n\\kreygasm\n\\failfish\n\\this\n\\nelson\n\\gg\n\\damson\n\\vu\n\\tottenham\n\\tfc\n\\tfc2\n\\sounders\n\\avfc\n\\troy\n\\lied\n\\hyper\n\\hug\n\\everton\n\\evertonfc\n\\potato\n\\hotpm\n\\dansgame\n\\pogchamp\n\\swiftrage\n\\memes\n\\orangeturd\n\\blueturd\n\\lol\n\\comrade\n\\wot\n\\szkieletor\n\\sick\n\\pierdole\nHave emote requests? Pester /u/szkieletor or make a pull request on GitHub!";

//Functions: Roll. For rolling dice. A function made specifically to roll dice. Dice's function.
function roll(ammount, type) {
	if (type != ""){
		if(ammount == ""){
			ammount = 1; //catcher for unspecified dice ammount, default to 1
		}
		var total = 0; //initialize total as 0
		var result = ""; //initialize result as empty string
		if(ammount != 1) { //if rolling more than one dice, use a different method and output.
			for (i = 0; i < ammount; i++) { //run the loop the number of times equal to our dice ammount
				var currentRoll = 0; //initialize current roll result as 0
				currentRoll = Math.floor(Math.random() * type) + 1; //actuall roll
				total = total + currentRoll; //increase total by current roll
				if ((ammount-i) != 1){ //this if block will add a comma after all elements except the last one, so it looks nicer
					result = result + currentRoll + ", "; //add current roll to result string to display each roll in parentheses
				}else{
					result = result + currentRoll; //ditto, but without a comma because it's the last element and "(1, 1, )" looks bad
				}
			}
			return " rolled " + total + " (" + result + ")"; //output in format "@username rolled total (each dice roll separately)"
		}else{
		total = Math.floor(Math.random() * type) + 1; //since we're only rolling one dice, we don't need currentRoll and we're inputting straight into total
		return " rolled " + total;
		}
	}else{
		return ", please use \\roll XdY format, where X is number of dice, and Y is number of sides!"; //if the argument format is wrong, return helper.
	}
}

//Called on message, basically chat commands
bot.on("message", function(message){
	if(message.content.charAt(0) == "\\"){ //check if the message starts with "\", the command modifier
		//if message starts with "\", parse the rest
		var commandsArr = message.content.substring(1).split(' '); //remove first character, "\", and then split into an array
		switch(commandsArr[0]){ //check first element of commandsArr, that is, the first word of a command, and try to match it to any existing commands. No "default", so if no match, nothing will happen
			//info
			case "author":
			case "creator":
			case "info":
				bot.sendMessage(message.author, stringInfo);
				break;
				
			//help
			case "help":
				bot.sendMessage(message.author, stringHelp);
				break;
			
			//dice rolling
			//one more billion dice throw and I swear foggy I'll make a limiter just for you
			case "roll":
				var dice = message.content.split(' '); //split the command into !roll, and separate xdx for interpretation
				dice = dice[1]; //now dice is only XdY
				dice = dice.split('d'); //split by d, so 1d6 becomes dice[1,6]
				bot.sendMessage(message.channel, message.author + roll(dice[0],dice[1]));
				break;
				
			//map link
			case "map":
			case "chromamap":
				bot.sendMessage(message.author, stringMap);
				break;
			
			//troop types cheat sheet
			case "troops":
			case "trooptypes":
				bot.sendMessage(message.author, stringTroops);
				break;
				
			//no regrets
			case "maggie":
			case "thatcher":
			case "margaret":
				bot.sendMessage(message.channel, stringMaggie + maggies[Math.floor(Math.random()*maggies.length)]);
				break;
			
			//chromabot commands reference
			case "chromabot":
			case "chromabotcommands":
			case "chromacommands":
			case "battlecommands":
				bot.sendMessage(message.author, stringCommands);
				break;
			
			//useful chroma-related links
			case "links":
				bot.sendMessage(message.author, stringLinks);
				break;
			
			//chat rules
			//straight from innovations since I can't be bothered to make my own
			case "rules":
				bot.sendMessage(message.author, stringRules);
				break;
				
			//facepalm
			case "facepalm":
				if(commandsArr.length == 1){ //check if commands only consists of one word and continue accordingly
					//basic \facepalm
					bot.sendMessage(message.channel, facepalm[Math.floor(Math.random()*facepalm.length)]);
				}else{
					//facepalm with an argument, for that extra screw you
					bot.sendMessage(message.channel, "Damnit, " + commandsArr[1] + "!\n" + facepalm[Math.floor(Math.random()*facepalm.length)]);
				}
				break;
				
			//8ball!
			case "8ball":
				if(message.author.username == "Lolzrfunni"){ //how mean is too mean?
					bot.sendMessage(message.channel, "fackorff, " + message.author);
					//bot.addMemberToRole(message.author, shame_corner); //this. this mean is too mean.
				}else{
					bot.sendMessage(message.channel, eightball[Math.floor(Math.random()*eightball.length)] + ", " + message.author);
				}
				break;
				
			case "statusmessages":
				if(statusmessages.indexOf(message.author) == -1){
					//if user calling doesn't exist in array
					statusmessages.push(message.author); //put user into the array
					bot.sendMessage(message.author, "Got it, you will be receiving status messages until the bot restarts!");
				}else{
					bot.sendMessage(message.author, "Understood, no more status messages.");
					statusmessages.splice(statusmessages.indexOf(message.author),1);
				}
				break;
				
			//emotes
			case "emotes":
				bot.sendMessage(message.author, stringEmotes);
				break;
			
			////
			//EMOTES
			////
			//to add new emote, add case "emote_name":, and a file named emote_name.png or emote_name.gif. It has to be in .png or .gif format.
			//If it's a .gif, add the case under the next block
			//PNGs
			case "bazza":
			case "biblethump":
			case "kappa":
			case "frankerz":
			case "kreygasm":
			case "failfish":
			case "this":
			case "nelson":
			case "gg":
			case "damson":
			case "vu":
			case "tottenham":
			case "tfc":
			case "tfc2":
			case "avfc":
			case "sounders":
			case "everton":
			case "evertonfc":
			case "potato":
			case "hotpm":
			case "dansgame":
			case "pogchamp":
			case "swiftrage":
			case "heresy":
			case "memes":
			case "orangeturd":
			case "blueturd":
			case "comrade":
			case "wot":
			case "szkieletor":
			case "sick":
			case "pierdole":
				bot.deleteMessage(message); //delete invoking message for that neat look
				bot.sendFile(message.channel, "./emotes/"+commandsArr[0]+".png", commandsArr[0]+".png");
				break;
			
			//GIFs
			case "hyper":
			case "troy":
			case "lied":
			case "hug":
			case "lol":
				bot.deleteMessage(message); //delete invoking message for that neat look
				bot.sendFile(message.channel, "./emotes/"+commandsArr[0]+".gif", commandsArr[0]+".gif");
				break;
		}
	}else{
	//if message doesn't start with "\", don't do anything since it's not a command so why bother
	}
} )

//fired when new person enters the server
bot.on("serverNewMember", function(server, user){
	//it will also send this thing for any other server I deploy it too, but I'm too lazy to actually check the server so fuck it, no one will notice
	bot.sendMessage(user, "Welcome to Periwinkle vs Orangered Discord Chat! I'm a resident bot. Type \"\\help\" to get a list of available commands. Type \"\\rules\" to get current chat rules.\nType \"\\info\" to get my creator's contact details and a link to GitHub repo with my code.\nIf you have any questions, ask a moderator!");
})

//fired on logout/login
bot.on("presence", function(dataObject){
	//check if anyone is signed up for presence updates. If not, don't bother doing anything.
	//it still doesn't check which server the user disconnected from. And the bot's deployed on 3 servers right now, one is for testing. So if someone sees nicknames of people that don't exist, it's normal. You're not haunted.
	if(statusmessages.length > 0){
		if((dataObject.status != "offline" && dataObject.status != "away") && away.indexOf(dataObject.user.username) == -1){
			//username doesn't exist in away array, send message
			away.push(dataObject.user.username); // add username to away array if already online, so it doesn't get called when in-game status changes
			for(var i = 0; i < statusmessages.length; i++){
				bot.sendMessage(statusmessages[i], "*" + dataObject.user + " is now online.*");
			}
		}
		if(dataObject.status === "offline"){
			if(away.indexOf(dataObject.user.username) != -1){
				away.splice(away.indexOf(dataObject.user.username),1);
			}
		}
	}
})

var AuthDetails = require("./auth.json");
bot.login(AuthDetails.email, AuthDetails.password);

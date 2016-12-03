"use strict";
// EXPRESS BLOCK for avoiding Heroku's R10 error
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

//For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
// END OF EXPRESS BLOCK


const Discord = require("discord.js"); //load discord.js node module
const bot = new Discord.Client();
//var botClient = new Discord.ClientUser();
const token = 'MTg1NDU1NDYyNDc1MzY2NDAw.Ck65mg.HLkvCNjES6I-r6uwOinmY01XLUQ';

bot.login(token);

// FLUFF
var nowPlaying = [
  "Goat Simulator",
  "with your emotions",
  "you like a damn fiddle",
  "Team PLUM",
  "Horselad Adventures",
  "Whack'a'Bazza",
  "Banhammer Simulator 2016",
  "Chroma",
  "InfinichainZ",
  "TroopDumper Deluxe",
  "FERT",
  "Chroma's Game Alpha 0.01"
];
// END FLUFF

bot.on('ready', () => {
  console.log('READY FOR ACTION');
  bot.user.setStatus('online', nowPlaying[Math.floor(Math.random() * nowPlaying.length)])
    .then(user => console.log('Changed status!'))
    .catch(console.log);
});

//GitLab handling for Chroma's Game server
var channelid = '199809356567412737'; //"199809356567412737" is the ID of #git_monitor channel on Chroma's Game server
var assigneeName;

app.use(bodyParser.json());

app.post('/', function (req, res) {
  switch(req.body.object_kind) {
    case "push":
      bot.channels.get(channelid).sendMessage("New commit from " + req.body.commits[0].author.name +
      "\nTimestamp: " + req.body.commits[0].timestamp +
      "\nURL: " + req.body.commits[0].url +
      "\nMessage: " + req.body.commits[0].message);
      break;

    case "issue":
      if(req.body.hasOwnProperty("assignee".name)) {
        assigneeName = req.body.assignee.name;
      } else {
        assigneeName = "No one";
      }
      if(req.body.object_attribues.action == "open") {
        bot.channels.get(channelid).sendMessage("New issue from " + req.body.user.name + ": " + req.body.object_attributes.title +
        "\nDescription: " + req.body.object_attributes.description +
        "\nAssigned to: " + assigneeName +
        "\nTimestamp: " + req.body.object_attributes.created_at +
        "\nURL: " + req.body.object_attributes.url);
      } else {
        bot.channels.get(channelid).sendMessage("An issue has been modified.\n" + req.body.object_attribues.title + "\n" +
        "State: " + req.body.object_attribues.state +
        "\nAssignee: " + req.body.object_attribues.assignee.name +
        "\nURL: " + req.body.object_attribues.url)
      }
      break;

    case "merge_request":
      bot.channels.get(channelid).sendMessage("New merge event.\n" +
      "Source branch: " + req.body.object_attribues.source_branch +
      "\nTarget branch: " + req.body.object_attribues.target_branch +
      "\nEvent type: " + req.body.object_attribues.state +
      "\nURL: " + req.body.object_attribues.url)

    default:
      bot.channels.get(channelid).sendMessage("Received HTTP Post request that didn't match any preset cases. Unless this is a test, something went wrong.\nobject_kind = " + req.body.object_kind);
  }
  res.sendStatus(200);
});
//Initialize MAGGIE
var maggies = ["http://www.hellomagazine.com/imagenes/profiles/margaret-thatcher/6043-margaret-thatcher.jpg",
    "http://www.abc.net.au/news/image/3980674-3x4-700x933.jpg",
    "http://i.telegraph.co.uk/multimedia/archive/02530/Thatcher2_2530641b.jpg",
    "http://www.barbarapijan.com/bpa/Politics/ThatcherMargaret198x.jpg"
];
var stringMaggie = "INSTANT MAGGIE PROTOCOL ACTIVATED.\nDEPLOYING MAGGIE: ";
var maggieCounter = 0;

//Initialize facepalm
var facepalm = ["https://teacherorwildlifetrainer.files.wordpress.com/2015/08/double_facepalm.png",
    "https://i.imgur.com/iWKad22.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3b/Paris_Tuileries_Garden_Facepalm_statue.jpg",
    "https://pbs.twimg.com/profile_images/1596470229/facepalm1.jpg"
];

//Initialize eyebleach
var eyebleach = ["https://i.imgur.com/GleAY3f.jpg", "https://i.imgur.com/dv1QgwX.jpg",
    "https://i.imgur.com/s4TunGX.jpg",
    "https://i.imgur.com/thO0kf0.jpg",
    "https://i.imgur.com/S1OPVB6.jpg",
    "https://s-media-cache-ak0.pinimg.com/236x/c2/f7/44/c2f7446525943879b7312783e1329343.jpg",
    "https://upload.wikimedia.org/wikipedia/en/b/be/Red_Panda_in_a_Gingko_tree.jpg",
    "http://smatterist.com/wp-content/uploads/2014/03/tumblr_n160beu4tc1s8mgkyo10_400.jpg",
    "http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7pS2VP2wnKyN8wxywmXtY0-FwsgxpiuVPF2kd2hbXjqLHGJtFDXwZKqYe_cWCCvgaE3P0pg9/",
    "http://www.photographyblogger.net/wp-content/uploads/2009/05/puppy2.jpg",
    "http://www.funpedia.net/imgs/sep13/adorable_kittens_02.jpg",
    "http://images4.fanpop.com/image/photos/18000000/Adorable-kittens-cats-18082611-600-602.jpg",
    "http://www.furrytalk.com/wp-content/uploads/2011/11/2.jpg",
    "http://i.imgur.com/MhzrX6p.png",
    "http://i.imgur.com/SAyUyRY.jpg"
];
var stringEyebleach = "EYEBLEACH PROTOCOL ACTIVATED. \nDEPLOYING: ";

//Initialize trains
var stringTrains = "CHOO CHOO\n";
var trains = ["https://i.imgur.com/5X816B7.jpg",
    "https://i.imgur.com/KlMahSA.jpg",
    "https://i.imgur.com/3NI1LgH.jpg",
    "https://i.imgur.com/R3uSmVM.jpg",
    "https://i.imgur.com/IgcyraL.jpg",
    "https://i.imgur.com/4HJmEXq.jpg",
    "https://i.imgur.com/KRxE3dE.jpg",
    "https://i.imgur.com/B4pNrmr.jpg",
    "https://i.imgur.com/hSwIICf.jpg",
    "https://i.imgur.com/YpFyJtm.jpg",
    "https://i.imgur.com/nqDnSdx.jpg",
    "https://i.imgur.com/5ZmCe.jpg",
    "http://www.traintesting.com/images/IC225_DVT_Leeds.jpg",
    "https://cdn.discordapp.com/attachments/105035609030029312/124610980985569281/323.jpg"
];
var trainsCounter = 0;

//Initialize quotes
var quotes = [
            ["You poop regularly, you're a much happier person!", "Foggy"],
            ["I hate you guys so fucking much.", "bleekicker"],
            ["I love Szkieletor", "Arrem"],
            ["memes", "TheAllStarrBand"]
            ];
var quotesRand;

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
    "Very doubtful"
];

//Initialize away array
var away = [];

//Initialize status messages
// var statusmessages = false;
var statusmessages = [];

//Initialization of message strings
var stringInfo = "Bot based on discord.js: http://hydrabolt.github.io/discord.js/\n Bot creator: /u/szkieletor on reddit.\nSource on GitHub: https://github.com/Szkieletor73/PWvsOR-Chatbot\nContact my creator if you've encountered any problems, and/or make a pull request if you can fix them!";
var stringHelp = "All commands work in PMs and in channels:\n\\roll XdY - roll X Y-sided dice\n\\chromamap (alias: \\map) - get a link to interactive map\n\\info (aliases: \\creator, \\author) - get contact details of my creator.\n\\troops (alias: \\trooptypes) - get basic troop type flowchart\n\\chromabot (aliases: \\chromabotcommands, \\battlecommands, \\chromacommands) - gives you a list of chromabot commands as well as a direct link to chromabot's /user/page.\n\\links - gives you a list of useful chroma-related links.\n\\rules - gives you chat rules. They're also linked in \\links\n\\emotes - lists all available emotes.";
var stringMap = "http://periwinklevsorangered.com/map/index.php";
var stringTroops = "OPPOSE: ♘Cavalry beats ♙Infantry, ♙Infantry beats ♗Ranged, ♗Ranged beats ♘Cavalry";
var stringCommands = "Full documentation: https://www.reddit.com/r/councilofkarma/wiki/bot_commands\nChromabot's userpage: https://www.reddit.com/user/chromabot\nstatus - gives you a status on your troops\ntime - bot will reply with the time it think it is\nlead - lead your troops\nextract - emergency unstuck command, moves your troops to your capital\nattack / support / oppose - battle commands\ndefect - change your team. Usable only if you haven't taken *any other action* yet.\ncodeword - set up a codeword for your troops, in format \"codeword some word or phrase is troopType\". Supports reddit markdown formatting.\ncodeword status - replies with your set codewords";
var stringLinks = "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit\nChromabot's userpage: https://www.reddit.com/user/chromabot\nCouncil of Karma: https://www.reddit.com/r/councilofkarma\nPeriwinkle: https://www.reddit.com/r/periwinkle\nOrangered: https://www.reddit.com/r/orangered\nChromanauts: https://www.reddit.com/r/chromanauts\nField of Karmic Glory: https://www.reddit.com/r/FieldOfKarmicGlory\nChromalore: https://www.reddit.com/r/Chromalore\nInteractive map: http://periwinklevsorangered.com/map/index.php\nGMP Dubtrack: https://www.dubtrack.fm/join/goodmorningperiwinkle";
var stringRules = "Chat rules: https://docs.google.com/document/d/1j7I3VLkRWft0oBvhuQGUx0rMu7PXmfTS8k1uPXdallI/edit";

//initialize variables
var total;
var result;
var currentRoll;
var commandsArr;
var dice;

//Initialize emote list
var arrayEmotes = ["\n\\bazza", "\n\\kappa","\n\\biblethump","\n\\frankerz","\n\\kreygasm","\n\\failfish","\n\\nelson","\n\\gg","\n\\damson","\n\\vu","\n\\tottenham","\n\\tfc","\n\\tfc2","\n\\sounders","\n\\avfc",
                  "\n\\lied","\n\\hyper","\n\\hug","\n\\everton","\n\\evertonfc","\n\\potato","\n\\dansgame","\n\\pogchamp","\n\\swiftrage","\n\\lol","\n\\sick","\n\\glimmerclap","\n\\skarofleet","\n\\paf",
                  "\n\\notea","\n\\geoff","\n\\confetti","\n\\doubt","\n\\rpck","\n\\purging","\n\\shrug","\n\\haha","\n\\benis","\n\\weiss","\n\\angel","\n\\ok","\n\\upset","\n\\troy",
                  "\n\\telepls","\n\\dispopcorn","\n\\french","\n\\yugoslavia","\n\\uossr", "\n\\popcorn", "\n\\spurdodance", "\n\\rsl", "\n\\disgust", "\n\\tiercel", "\n\\rockdale",
                  "\n\\ohsnap", "\n\\burn", "\n\\icy", "\n\\rem"];
var stringEmotes = "Emote list (sorted alphabetically):\n" + arrayEmotes.sort() + "\nIf you have any requests for emotes, pester /u/Szkieletor or make a pull request on GitHub! Bear in mind all emotes will be voted on in the mod channel prior to implementation and may be rejected.";

//Functions: Roll. For rolling dice. A function made specifically to roll dice. Dice's function.
function roll(ammount, type) {
    if ((type != "") && (type < 10000) && (ammount < 10000)) {
        if (ammount == "") {
            ammount = 1; //catcher for unspecified dice ammount, default to 1
        }
        total = 0; //initialize total as 0
        result = ""; //initialize result as empty string
        if (ammount != 1) { //if rolling more than one dice, use a different method and output.
            for (int i = 0; i < ammount; i++) { //run the loop the number of times equal to our dice ammount
                currentRoll = 0; //initialize current roll result as 0
                currentRoll = Math.floor(Math.random() * type) + 1; //actuall roll
                total = total + currentRoll; //increase total by current roll
                if ((ammount - i) != 1) { //this if block will add a comma after all elements except the last one, so it looks nicer
                    result = result + currentRoll + ", "; //add current roll to result string to display each roll in parentheses
                } else {
                    result = result + currentRoll; //ditto, but without a comma because it's the last element and "(1, 1, )" looks bad
                }
            }
            return "Rolled " + total + " (" + result + ")"; //output in format "@username rolled total (each dice roll separately)"
        } else {
            total = Math.floor(Math.random() * type) + 1; //since we're only rolling one dice, we don't need currentRoll and we're inputting straight into total
            return "Rolled " + total;
        }
    } else {
        return ", please use \\roll XdY format, where X is number of dice, and Y is number of sides. Maximum allowed value for both X and Y is 9999."; //if the argument format is wrong, return helper.
    }
}

//Called on message, basically chat commands
bot.on("message", message => {
    if (message.content.charAt(0) == "\\") { //check if the message starts with "\", the command modifier
        //if message starts with "\", parse the rest
        commandsArr = message.content.substring(1).split(' '); //remove first character, "\", and then split into an array
        switch (commandsArr[0]) { //check first element of commandsArr, that is, the first word of a command, and try to match it to any existing commands. No "default", so if no match, nothing will happen
            //info
            case "author":
            case "creator":
            case "info":
                message.author.sendMessage(stringInfo);
                break;

                //help
            case "help":
                message.author.sendMessage(stringHelp);
                break;

                //dice rolling
            case "roll":
                dice = message.content.split(' '); //split the command into !roll, and separate xdx for interpretation
                dice = dice[1]; //now dice is only XdY
                dice = dice.split('d'); //split by d, so 1d6 becomes dice[1,6]
                message.channel.sendMessage(roll(dice[0], dice[1]));
                break;

                //map link
            case "map":
            case "chromamap":
                message.author.sendMessage(stringMap);
                break;

                //troop types cheat sheet
            case "troops":
            case "trooptypes":
                message.author.sendMessage(stringTroops);
                break;

              //quotes
            case "quote":
              quotesRand = Math.floor(Math.random() * quotes.length);
              message.channel.sendMessage("_\"" + quotes[quotesRand][0] + "\"_" + "** - " + quotes[quotesRand][1] + "**");
              break;

                //yay
            case "eyebleach":
                message.channel.sendMessage(stringEyebleach + eyebleach[Math.floor(Math.random() * eyebleach.length)]);
                break;

                //chromabot commands reference
            case "chromabot":
            case "chromabotcommands":
            case "chromacommands":
            case "battlecommands":
                message.author.sendMessage(stringCommands);
                break;

                //useful chroma-related links
            case "links":
                message.author.sendMessage(stringLinks);
                break;

                //chat rules
                //straight from innovations since I can't be bothered to make my own
            case "rules":
                message.author.sendMessage(stringRules);
                break;

                //facepalm
            case "facepalm":
                if (commandsArr.length == 1) { //check if commands only consists of one word and continue accordingly
                    //basic \facepalm
                    message.channel.sendMessage(facepalm[Math.floor(Math.random() * facepalm.length)]);
                } else {
                    //facepalm with an argument, for that extra screw you
                    message.channel.sendMessage("Damnit, " + commandsArr[1] + "!\n" + facepalm[Math.floor(Math.random() * facepalm.length)]);
                }
                break;

                //8ball!
            case "8ball":
                //if (message.author.username == "Lolzrfunni") { //how mean is too mean?
                //    message.channel.sendMessage("fackorff, " + message.author);
                    //bot.addMemberToRole(message.author, shame_corner); //this. this mean is too mean.
                //} else {
                    message.channel.sendMessage(eightball[Math.floor(Math.random() * eightball.length)] + ", " + message.author);
                //}
                break;

                //emotes
            case "emotes":
                message.author.sendMessage(stringEmotes);
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
                //case "this":
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
                //case "hotpm":
            case "dansgame":
            case "pogchamp":
            case "swiftrage":
            case "heresy":
                //case "memes":
                //case "orangeturd":
                //case "blueturd":
                //case "comrade":
                //case "wot":
                //case "szkieletor":
            case "sick":
                //case "pierdole":
            case "skarofleet":
                //case "sans":
                //case "yugoslavia":
            case "paf":
                //case "yugoslavia2":
                //case "josip":
                //case "biscuits":
            case "notea":
            case "geoff":
            case "doubt":
            case "rpck":
                //case "plebtea":
                //case "papyrus":
                //case "poplar":
            case "haha":
            case "benis":
                //case "chicken":
            case "angel":
                //case "dogs":
                //case "vintagemaymay":
            case "ok":
            case "telepls":
            case "dispopcorn":
            case "french":
            case "uossr":
            case "yugoslavia":
            case "rsl":
            case "rockdale":
            case "icy":
            case "rem":
            case "TheAllStarrBand":
                message.channel.sendFile("./emotes/" + commandsArr[0] + ".png", commandsArr[0] + ".png");
                message.delete; //delete invoking message for that neat look
                break;

                //GIFs
            case "hyper":
            case "troy":
            case "lied":
            case "hug":
            case "lol":
            case "glimmerclap":
            case "confetti":
            case "purging":
            case "shrug":
            case "weiss":
            case "upset":
            case "popcorn":
                //case "ruby":
            case "spurdodance":
            case "tiercel":
            case "disgust":
            case "ohsnap":
            case "burn":
                message.channel.sendFile("./emotes/" + commandsArr[0] + ".gif", commandsArr[0] + ".gif");
                message.delete; //delete invoking message for that neat look
                break;
        }
    }
});


//fired when new person enters the server
bot.on('guildMemberAdd', (guild, member) => {
  if (guild.id == "104529181072699392") {
      guild.defaultChannel.sendMessage("Welcome to Periwinkle vs Orangered Discord Chat, " + user + "! I'm a resident bot. Type \"\\help\" to get a list of available commands. Type \"\\rules\" to get current chat rules.\nType \"\\info\" to get my creator's contact details and a link to GitHub repo with my code.\nIf you have any questions, ask a moderator!");
  }
});

//var AuthDetails = require("./auth.json");
//bot.loginWithToken("MTg1NDU1NDYyNDc1MzY2NDAw.Ck65mg.HLkvCNjES6I-r6uwOinmY01XLUQ");

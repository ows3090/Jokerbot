const SlackBot = require('slackbots');
const axios = require('axios');
const route = require('./Routers/route');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';

const bot = new SlackBot({
    token : "xoxb-582582124755-587875604934-mceAxq9E58uHT4WRkqSbcibU",
    name : "Joker"
});

// Start Handler
bot.on('start', () =>{
    const face = {
        icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('everyone', 'Feeling tired??? Have some fun with @Joker!'
    , face);
});

// Error Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }

    console.log(data);
    handleMessage(data.text);

});


// Responding to Data
function handleMessage(message){

    if(message.includes(' yomama')){
        route.startdb.yomamaJoke();
    }
    else if(message.includes(' general')){
        route.randomJoke();
    }

    else if(message.includes(' random')){
        randomJoke();
    }
    
    else if(message.includes(' programming')){
      route.startdb()
   
    }
    else if(message.includes(' help')){
        route.startdb.runHelp();
    }
}

randomJoke= ()=>{
    MongoClient.connect('mongodb://localhost:27017', function (err, client){
    if (err) throw err; 
    var db = client.db('jokeapi');

    json_max = 376;
    function getRandomInt() {
        min = Math.ceil(1);
        max = Math.floor(376);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    random = getRandomInt();
    result = db.collection('jokes').findOne({id: random});   
    
    user = result;
    user.then(function(total){
        question = total.setup;
        joke = total.punchline;
        const face = {
            icon_emoji: ':laughing:'
        };
        function firstFunction(channel){
            bot.postMessageToChannel(channel, joke, face);
            console.log("허무개그 전송~~~~!");
        }
        
        function secondFunction(channel, callback){
            bot.postMessageToChannel(channel, question, face);
            console.log("질문 불려짐")
            firstFunction(channel);
        }
        secondFunction('everyone',firstFunction);
        // bot.postMessageToChannel('everyone', question, face);
        // bot.postMessageToChannel('full-stack-web', question, joke, face);
        // bot.postMessageToChannel('bot_test', question, face);
        // bot.postMessageToChannel('everyone', joke, face);
        // bot.postMessageToChannel('full-stack-web', joke, face);
        // bot.postMessageToChannel('bot_test', joke, face);
    })
    client.close();
    })
}

const SlackBot = require('slackbots');
const axios = require('axios');
const route = require('./Routers/route');

const bot = new SlackBot({
    token : "xoxb-582582124755-587875604934-rRhFVlXlB0StEMnlrmsQlcac",
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
    if(message.includes('chucknorris')){
        route.chuckJoke()
        .then((err, res)=>{
            if(err)throw err;
            res("ChuckJoke function activated");
        });
    }
    else if(message.includes(' yomama')){
        route.yoMamaJoke()
        .then((err, res)=>{
            if(err)throw err;
            res("yoMamaJoke function activated");
});
    }
    else if(message.includes(' random')){
        route.randomJoke()
        .then((err, res)=>{
            if(err)throw err
            res("randomJoke function activated");    
    });
}

    else if(message.includes(' help')){
        route.runHelp()
        .then((err, res)=>{
            if(err)throw err
            res(" function activated");  
    });
    }
}
const SlackBot = require('slackbots');
const axios = require('axios');

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
        chuckJoke();
    }
    else if(message.includes(' yomama')){
        yoMamaJoke();
    }
    else if(message.includes(' random')){
        randomJoke();
    }
    else if(message.includes(' help')){
        runHelp();
    }
}


// Tell a Chuck Norris Joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res =>{
        const joke = res.data.value.joke;
        
        const face = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel('everyone', `Chuck Norris: ${joke}`,face);
        bot.postMessageToChannel('full-stack-web', `Yo mama: ${joke}`,face);
        bot.postMessageToChannel('bot_test', `Yo mama: ${joke}`,face);
    });
}

// Tell a yomama Joke
function yoMamaJoke(){
    axios.get('http://api.yomomma.info/')
    .then(res =>{
        const joke = res.data.joke;
        
        const face = {
            icon_emoji: ':laughing:'
        };
        
        bot.postMessageToChannel('everyone', `Yo mama: ${joke}`,face);
        bot.postMessageToChannel('full-stack-web', `Yo mama: ${joke}`,face);
        bot.postMessageToChannel('bot_test', `Yo mama: ${joke}`,face);
       
    });
}
//Tell random joke
function randomJoke(){
    const rand = Math.floor(Math.random() * 2) +1;
    if(rand ===1){
        chuckJoke();
    }
    else if(rand === 2){
        yoMamaJoke();
    }
}
function runHelp(){
    const face = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel('everyone', "Type @joker and write a joke that you would like\n ex- @joker random",face);
    bot.postMessageToChannel('full-stack-web', "Type @joker and write a joke that you would like\n ex- @joker random",face);
}
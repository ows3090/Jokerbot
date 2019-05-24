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

module.exports = route;
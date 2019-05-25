const MongoClient = require('mongodb').MongoClient;
const dboperation = require('../operations');
const dbname =  'jokeapi';
const collec = 'jokes';
const url = 'mongodb://localhost:27017/';


exports.randomJoke= ()=>{
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
    
        bot.postMessageToChannel('everyone', question, joke, face);
        bot.postMessageToChannel('full-stack-web', question, joke, face);
        bot.postMessageToChannel('bot_test', question, joke, face);
    })
    client.close();
    })
}

        function generalJoke(){
            dboperation.getdata(dbname, collec, "general")
            .then((data) =>{
                var query = { state: 'OK' };
                var n = data.count(query);
                var r = Math.floor(Math.random() * n);
                var randomElement = data.find(query).limit(1).skip(r);
                var question = randomElement.setup;
                var joke = randomElement.punchline;
                const face = {
                    icon_emoji: ':laughing:'
                };
            
                bot.postMessageToChannel('everyone', question, joke, face);
                bot.postMessageToChannel('full-stack-web', question, joke, face);
                bot.postMessageToChannel('bot_test', question, joke, face);
            });
        };
        
        // Tell a yomama Joke
        function yomamaJoke(){
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
        };
        //Tell random joke
        function runhelp(){
            const face = {
                icon_emoji: ':question:'
            };
        
            bot.postMessageToChannel('everyone', "Type @joker and write a joke that you would like\n ex- @joker random",face);
            bot.postMessageToChannel('full-stack-web', "Type @joker and write a joke that you would like\n ex- @joker random",face);
        };

const MongoClient = require('mongodb').MongoClient;
const SlackBot = require('slackbots');
const dbname =  'jokeapi';
const collec = 'jokes';
const url = 'mongodb://localhost:27017/';

exports.startbot = ()=>{
    // Get authorization to use the slackbot
    const bot = new SlackBot({
        token : "xoxb-582582124755-587875604934-86ISu22wmEaDhGWtQmpvumbR",
        name : "Joker"
    });
    
    // Start the slackbot
    bot.on('start', () =>{
        const face = {
            icon_emoji: ':laughing:'
        };
    
        bot.postMessageToChannel('everyone', 'Have some fun with @Joker!\nFor commands write @joker help'
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

    if(message.includes(' knockknock')){
        knockknockJoke();
    }
    else if(message.includes(' general')){
        generalJoke();
    }

    else if(message.includes(' random')){
        console.log(message);
        randomJoke();
    }
    
    else if(message.includes(' programming')){
        programmingJoke();
    }
    else if(message.includes(' help')){
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
        const face = {
            icon_emoji: ':laughing:'
        };
        
        function firstFunction(channel){
            bot.postMessageToChannel(channel, question, face);
        }
        firstFunction('everyone');
        console.log('질문 불려짐');
        return total;


        // bot.postMessageToChannel('everyone', question, face);
        // bot.postMessageToChannel('full-stack-web', question, joke, face);
        // bot.postMessageToChannel('bot_test', question, face);
        // bot.postMessageToChannel('everyone', joke, face);
        // bot.postMessageToChannel('full-stack-web', joke, face);
        // bot.postMessageToChannel('bot_test', joke, face);
    })
    .then((all)=>{
        joke = all.punchline;
        const face = {
            icon_emoji: ':laughing:'
        };
        function secondFunction(channel){
            bot.postMessageToChannel(channel, joke, face);
            console.log( "허무개그 전송~~~~!")
        }
        secondFunction('everyone');
    })
    client.close();
    })
}
generalJoke= ()=>{
        MongoClient.connect(url, function (err, client){
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
            if(total.type != "general"){
                client.close();
                programmingJoke();
            }
            else if(total.type === "general"){
                question = total.setup;
                joke = total.punchline;
            }   
            const face = {
                icon_emoji: ':laughing:'
            };
            function firstFunction(channel){
                bot.postMessageToChannel(channel, joke, face);
                console.log("일반 허무개그 전송~~~~!");
            }
            
            function secondFunction(channel, callback){
                bot.postMessageToChannel(channel, question, face);
                console.log("일반 질문 불려짐")
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
programmingJoke= ()=>{
        MongoClient.connect(url, function (err, client){
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
                if(total.type === "programming"){
                    question = total.setup;
                    joke = total.punchline;
                    channel = 'everyone';
                    const face = {
                        icon_emoji: ':laughing:'
                    };
                    ques_and_joke = [question, joke, face, channel];
                    return ques_and_joke;
                }
                else if(total.type != "programming"){
                    client.close();
                    programmingJoke();
                }
            
            // bot.postMessageToChannel('everyone', question, face);
            // bot.postMessageToChannel('full-stack-web', question, joke, face);
            // bot.postMessageToChannel('bot_test', question, face);
            // bot.postMessageToChannel('everyone', joke, face);
            // bot.postMessageToChannel('full-stack-web', joke, face);
            // bot.postMessageToChannel('bot_test', joke, face);
        })
        .then((joke_info)=>{
            function askQuestion(){
                bot.postMessageToChannel(joke_info[3], joke_info[0], joke_info[2]);
                console.log("프로그래밍 질문 불려짐");
            }
            askQuestion();
            return joke_info;
        })
        .then((info)=>{
            bot.postMessageToChannel(info[3], info[1], info[2]);
            return;
        })
        client.close();
        })
    }

knockknockJoke= ()=>{
        MongoClient.connect(url, function (err, client){
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
                if(total.type === "knock-knock"){
                    question = total.setup;
                    joke = total.punchline;
                    channel = 'everyone';
                    const face = {
                        icon_emoji: ':laughing:'
                    };
                    ques_and_joke = [question, joke, face, channel];
                    return ques_and_joke;
                }
                else if(total.type != "knock-knock"){
                    client.close();
                    programmingJoke();
                }
            
            // bot.postMessageToChannel('everyone', question, face);
            // bot.postMessageToChannel('full-stack-web', question, joke, face);
            // bot.postMessageToChannel('bot_test', question, face);
            // bot.postMessageToChannel('everyone', joke, face);
            // bot.postMessageToChannel('full-stack-web', joke, face);
            // bot.postMessageToChannel('bot_test', joke, face);
        })
        .then((joke_info)=>{
            function askQuestion(){
                bot.postMessageToChannel(joke_info[3], joke_info[0], joke_info[2]);
                console.log("프로그래밍 질문 불려짐");
            }
            askQuestion();
            return joke_info;
        })
        .then((info)=>{
            bot.postMessageToChannel(info[3], info[1], info[2]);
            return;
        })
        client.close();
        })
    }
}


        // function generalJoke(){
        //     dboperation.getdata(dbname, collec, "general")
        //     .then((data) =>{
        //         var query = { state: 'OK' };
        //         var n = data.count(query);
        //         var r = Math.floor(Math.random() * n);
        //         var randomElement = data.find(query).limit(1).skip(r);
        //         var question = randomElement.setup;
        //         var joke = randomElement.punchline;
        //         const face = {
        //             icon_emoji: ':laughing:'
        //         };
            
        //         bot.postMessageToChannel('everyone', question, joke, face);
        //         bot.postMessageToChannel('full-stack-web', question, joke, face);
        //         bot.postMessageToChannel('bot_test', question, joke, face);
        //     });
        // };
        
        // // Tell a yomama Joke
        // function yomamaJoke(){
        //     axios.get('http://api.yomomma.info/')
        //     .then(res =>{
        //         const joke = res.data.joke;
                
        //         const face = {
        //             icon_emoji: ':laughing:'
        //         };
                
        //         bot.postMessageToChannel('everyone', `Yo mama: ${joke}`,face);
        //         bot.postMessageToChannel('full-stack-web', `Yo mama: ${joke}`,face);
        //         bot.postMessageToChannel('bot_test', `Yo mama: ${joke}`,face);
               
        //     });
        // };
        // //Tell random joke
        // function runhelp(){
        //     const face = {
        //         icon_emoji: ':question:'
        //     };
        
        //     bot.postMessageToChannel('everyone', "Type @joker and write a joke that you would like\n ex- @joker random",face);
        //     bot.postMessageToChannel('full-stack-web', "Type @joker and write a joke that you would like\n ex- @joker random",face);
        // };

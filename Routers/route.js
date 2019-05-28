const MongoClient = require('mongodb').MongoClient;
const SlackBot = require('slackbots');
const dbname =  'jokeapi';
const collec = 'jokes';
const url = 'mongodb://localhost:27017/';

exports.startbot = ()=>{
    // Get authorization to use the slackbot
    const bot = new SlackBot({
        token : "xoxb-582582124755-587875604934-oewQRL6lzHXLkybUrg4CWJVJ",
        name : "Joker"
    });
    
    // Start the slackbot
    bot.on('start', () =>{
        const face = {
            icon_emoji: ':bowtie:'
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
    handleMessage(data.text, data.channel, data.user);
});


// Responding to Data
function handleMessage(message, channel, user){
    console.log(message);

    if(message.includes(' tell me')){
        if(message.includes(' knock')){
            knockknockJoke();
        }
        else if(message.includes(' general')){
            generalJoke();
        }

        else if(message.includes(' random')){
            randomJoke();
        }
        else if(message.includes(' a joke')){
            randomJoke();
        }
    
        else if(message.includes(' programming')){
            programmingJoke();
        }
        else if(message.includes(' me  ')){
            bot.postMessageToChannel('everyone', "Tell you what??? :nomouth:", embarrased);
        }
        else{
            const embarrased = {
                icon_emoji: ':flushed:'
            };
            comment = "Sorry I dont' have that kind of joke.....:droplet::droplet::droplet:\nPlease use @joker --help to know what I can do!";
            bot.postMessageToChannel('everyone', comment, embarrased);

        }
        
    }
    else if(message.includes(' help')){
        
    }
    else if(message.includes(' what jokes')){
        jokeTypes = ["general", 'programming', 'knock-knock'];
        const face = {
            icon_emoji: ':thumbsup:'
        };
        bot.postMessageToChannel("everyone", `I have ${jokeTypes[0]}, ${jokeTypes[1]}, ${jokeTypes[2]} jokes!! :thumbsup: :thumbsup:`, face);
        return;
    }
    // else{
    //     const embarrased = {
    //         icon_emoji: ':flushed:'
    //     };
    //     const sweat = {
    //         icon_emoji: ':droplet:'
    //     };
    //     comment = "Sorry I'm not smart enough to understand this.....\nPlease use @joker help to know what I can do!";
    //     bot.postMessageToChannel('everyone', comment, embarrased);
        
    // }
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
        setTimeout(function secondFunction(){
           bot.postMessageToChannel('everyone', `${joke}:stuck_out_tongue_winking_eye::laughing:`, face)
            console.log( "허무개그 전송~~~~!")
        }, 3000);
        
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
            max = Math.floor(json_max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        random = getRandomInt();
        result = db.collection('jokes').findOne({id: random});   
        user = result;
        user.then(function(total){
                if(total.type === "general"){
                    question = total.setup;
                    joke = total.punchline;
                    channel = 'everyone';
                    const face = {
                        icon_emoji: ':laughing:'
                    };
                    ques_and_joke = [question, joke, face, channel];
                    return ques_and_joke;
                }
                else if(total.type != "general"){
                    client.close();
                    generalJoke();
                }
            
        })
        .then((joke_info)=>{
            function askQuestion(){
                bot.postMessageToChannel(joke_info[3], joke_info[0], joke_info[2]);
                console.log("일반 질문 불려짐");
            }
            askQuestion();
            return joke_info;
        })
        .then((info)=>{
            setTimeout(function secondFunction(){
                bot.postMessageToChannel(info[3], `${info[1]}:stuck_out_tongue_winking_eye::laughing:`, info[2])
                 console.log( "허무개그 전송~~~~!")
             }, 3000);
        })
        client.close();
        })
    };
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
            setTimeout(function secondFunction(){
                bot.postMessageToChannel(info[3], `${info[1]}:stuck_out_tongue_winking_eye::laughing:`, info[2])
                 console.log( "허무개그 전송~~~~!")
             }, 3000);
        })
        client.close();
        })
    };

knockknockJoke= ()=>{
    MongoClient.connect(url, function (err, client){
        if (err) throw err; 
        var db = client.db('jokeapi');
    
        json_max = 61;
        function getRandomInt() {
            min = Math.ceil(1);
            max = Math.floor(json_max);
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
                    knockknockJoke();
                }
            
        })
        .then((joke_info)=>{
            function askQuestion(){
                bot.postMessageToChannel(joke_info[3], joke_info[0], joke_info[2]);
                console.log("똑똑 질문 불려짐");
            }
            askQuestion();
            return joke_info;
        })
        .then((info)=>{
            setTimeout(function secondFunction(){
                bot.postMessageToChannel(info[3], `${info[1]}:stuck_out_tongue_winking_eye::laughing:`, info[2])
                 console.log( "허무개그 전송~~~~!")
             }, 3000);
        })
        client.close();
        })
    }
runHelp = () =>{
    
    const face = {
        icon_emoji: ':question:'
    };
    comment = "Thanks for using Joker bot!:ghost::ghost:laugh:\nBot info: type '@joker --help'\nBot functions: @joker tell me [something] "
    bot.postMessageToChannel('everyone', "Type @joker and write a joke that you would like\n ex- @joker random",face);
    
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
        // }

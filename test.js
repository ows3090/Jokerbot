//
const joke = require('./jokes/jokes.json');
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017', function (err, client){
    if (err) throw err; 
    var db = client.db('jokeapi');

    question = [];
    punchline = [];
    count = 0;
    json_max = 376;
    random = function getRandomArbitrary() {
        return Math.random() * (376 - 1) + 1;
    }
    for(var i=1; i< json_max+1; i++){
        result = db.collection('jokes').findOne({id: i,type:"programming"});
        
        if(result === null)
        return;
        else if(result)
        {
            ++count;
            question.push(result.setup);
            punchline.push(result.punchline);
            // var n = result.count(result);
            // var r = Math.floor(Math.random() * n);
            // var randomElement = result.find().limit(1).skip(r);
            // var question = randomElement.setup;
            // var joke = randomElement.punchline;
            // console.log(question); 
            // console.log(joke);
            // console.log(question);
            // console.log(punchline);
            //console.log(question);
        }
    }    
    client.close();
    console.log(question);
});


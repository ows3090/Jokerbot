const MongoClient = require('mongodb').MongoClient;


//Get Random Joke
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
    console.log(random);
    result = db.collection('jokes').findOne({id: random});   
    
    user = result;
    user.then(function(total){
        console.log(total.setup);
        console.log(total.setup);
    })
    client.close();
})

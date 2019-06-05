const MongoClient = require('mongodb').MongoClient;
const jokedoc = require('../joke_data/user.json');
const dbname =  'userdb';
const collec = 'user';
const dboperation = require('./operations.js');
var url = "mongodb://13.124.65.242:27017/userdb";

//Create database
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//Create collection
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("userdb");
    dbo.createCollection("user", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });


//Storing data jokes.json data into mongodb
MongoClient.connect(url,{ useNewUrlParser: true }).then((client) => {

    console.log('Connected correctly to server');
 
 
    const db = client.db(dbname);

    dboperation.insertDocument(db, jokedoc, collec)
        .then((result) => {
            console.log("Inserted Document:\n", result.ops);

            return dboperation.findDocuments(db, collec);
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));









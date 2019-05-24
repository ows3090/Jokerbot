const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperation = require('./operations');
const jokedoc = require('./jokes/jokes.json');
const url = 'mongodb://localhost:27017/';
const dbname =  'jokeapi';
const collec = 'jokes';

var url = "mongodb://localhost:27017/jokeapi";

// Code for Creating database
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// Code for Creating a Collection
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("jokeapi");
//     dbo.createCollection("joke", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });

//
MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
}).catch((err)=> console.log(err));
 /*
    const db = client.db(dbname);

    dboperation.insertDocument(db, jokedoc, collec)
        .then((result) => {
            console.log("Inserted Document:\n", result.ops);

            return dboperation.findDocuments(db, collec);
        })
        .catch((err) => console.log(err));

})
*/
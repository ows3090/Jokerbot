const MongoClient = require('mongodb').MongoClient;
const jokedoc = require('./joke_data/jokes.json');
const dbname =  'jokeapi';
const collec = 'jokes';

var url = "mongodb://localhost:27017/jokeapi";

//Create database
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//Create collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("jokeapi");
    dbo.createCollection("joke", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });


//Storing data jokes.json data into mongodb
MongoClient.connect(url).then((client) => {

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













// //will encapsulate all that database operations
// const assert = require('assert');

// exports.insertDocument = (db, document, collection, callback) =>{
//     const coll = db.collection(collection);
//     return coll.insert(document);
// };

// exports.findDocuments = (db, collection, input,callback)=>{
//     const coll = db.collection(collection);
//     return coll.find({"type": input}).toArray();
// }

// exports.removeDocuments = (db, document , collection, callback)=>{
//     const coll = db.collection(collection);
//     return coll.deleteone(document);
// }

// exports.updateDocuments = (db, document , update ,collection, callback)=>{
//     const coll = db.collection(collection);
//     return coll.updateOne(document, {$set: update}, null);
// }

// exports.getdata = (db, document, collection, input, callback =>{
//     result = findDocuments(db,collection);
//     return result;
// })
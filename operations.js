//will encapsulate all that database operations
const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments = (db, collection, input)=>{
    const coll = db.collection(collection);
    return coll.find({"type": input}).toArray();
}

exports.removeDocuments = (db, document , collection, callback)=>{
    const coll = db.collection(collection);
    return coll.deleteone(document);
}

exports.updateDocuments = (db, document , update ,collection, callback)=>{
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: update}, null);
}

exports.getdata = (db, collection, input, callback) =>{
    const coll = db.collection(collection);
    result= coll.find({"type": input});
    console.log(result);
    return result;
}
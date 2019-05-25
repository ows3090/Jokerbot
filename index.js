const SlackBot = require('slackbots');
const axios = require('axios');
const route = require('./Routers/route');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';


//Before activating must connect to mongodb to interface
//Connecting code [mongod --dbpath=data --bind_ip 127.0.0.1] at mongodb directory

route.startbot();

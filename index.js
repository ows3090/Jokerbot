const route = require('./Routers/route');
// var express=require('express');
// var app=express();
// //Before activating must connect to mongodb to interface
// //Connecting code [mongod --dbpath=data --bind_ip 127.0.0.1] at mongodb directory
// app.get('/slack/bot',function(req,res){

// })
// app.listen(3000,function(){
//     console.log("Connetect 3000 port!!");
// })

route.startbot();

const route = require('./Routers/route');

//Before activating must connect to mongodb to interface
//Connecting code [mongod --dbpath=data --bind_ip 127.0.0.1] at mongodb directory

route.startbot();

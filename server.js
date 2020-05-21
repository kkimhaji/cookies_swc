
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

// [ CONFIGURE mongoose ]

mongoose.connect('mongodb://root:root@localhost:27017/admin', { dbName : 'testDB'});

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongo server");
});


// DEFINE MODEL
var OBJ = require('./models/obj');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE ROUTER]
const router = require('./routes')(app, OBJ);

const server = app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
});



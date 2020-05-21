// require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
 
// [ CONFIGURE mongoose ]

mongoose.connect('mongodb://localhost:27017/testDB');

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
 
 // GET ALL OBJECTS
 app.get('/api/objs', function(req,res){
    OBJ.find(function(err, objs){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(objs);
    })
});

// GET SINGLE OBJECTS
app.get('/api/objs/:objs_id', function(req, res){
    res.end();
});

// GET OBJECTS BY AUTHOR
app.get('/api/objs/author/:author', function(req, res){
    OBJ.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, objs){
        if(err) return res.status(500).json({error: err});
        if(objs.length === 0) return res.status(404).json({error: 'obj not found'});
        res.json(objs);
    })
});

// CREATE OBJECTS
app.post('/api/objs', function(req, res){
    var obj = new OBJ();
    obj.title = req.body.name;
    obj.author = req.body.author;
    obj.published_date = new Date(req.body.published_date);

    obj.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

// UPDATE THE OBJECTS
app.put('/api/objs/:objs_id', function(req, res){
    OBJ.findById(req.params.obj_id, function(err, obj){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!obj) return res.status(404).json({ error: 'obj not found' });

        if(req.body.title) obj.title = req.body.title;
        if(req.body.author) obj.author = req.body.author;
        if(req.body.published_date) obj.published_date = req.body.published_date;

        obj.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'obj updated'});
        });

    });
});

// DELETE OBJECTS
app.delete('/api/objs/:objs_id', function(req, res){
    OBJ.remove({ _id: req.params.obj_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        /*
        실제로 존재하는 데이터를 삭제하였는지 확인해주는 코드
        ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "obj not found" });
        res.json({ message: "obj deleted" });
        */
        
        res.status(204).end();
    })
});

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
});



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('obj', objSchema);

// DEFINE MODEL
var OBJ = mongoose.model('obj', objSchema);

var obj = new OBJ({
    name: "NodeJS Tutorial",
    author: "velopert"
});
obj.save(function(err, obj){
    if(err) return console.error(err);
    console.dir(obj);
});


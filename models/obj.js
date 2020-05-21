var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('obj', objSchema);

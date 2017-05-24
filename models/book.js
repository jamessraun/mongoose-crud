var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var matchIsbn = [/^\d{3}-\d{1}-\d{5}-\d{3}-\d{1}$/,'invalid isbn!']


var bookSchema = new Schema({
  isbn: {type:String,required:true,unique:true,match:matchIsbn},
  title: {type:String,required:true},
  author: {type:String,required:true},
  category: {type:String,required:true},
  stock: {type:Number,required:true},
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;

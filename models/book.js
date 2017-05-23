var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  isbn: String,
  tittle: String,
  author: String,
  category: String,
  stock: Number,
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;

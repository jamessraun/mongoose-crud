var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Book = require('../models/book')


var getAllBooks = (req,res) => {
    Book.find((err,books) => {
      res.send(books)
    })
}

var createBook = (req,res) => {
    Book.create(req.body,(err,books) => {
      res.send(books)
    })
}

var updateBook = (req,res) => {
  Book.findById(req.params.id,(err, book) => {
    if (err) res.send(err);

    book.isbn = req.body.isbn || book.isbn
    book.title = req.body.title || book.title
    book.author =req.body.author || book.author
    book.category =req.body.category || book.category
    book.stock =req.body.stock || book.stock

    book.save( (err, updatedBook) => {
      if (err) res.send(err);
      res.send(updatedBook);
    });
  });
}


var deleteBook = (req,res) => {
  Book.findById(req.params.id,(err, book) => {

    if (err) res.send(err);
    book.remove((err, message) => {
      if (err) res.send(err);
      res.send(message);
    });
  });
}



module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
};

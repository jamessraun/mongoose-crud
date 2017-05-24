var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Book = require('../models/book')


var getAllBooks = (req,res) => {
    Book.find((err,books) => {
      res.json(books)
    })
}

var createBook = (req,res) => {
    Book.create(req.body,(err,books) => {
      if(err) res.json({message:'validation failed'})
      res.json(books)
    })
}

var updateBook = (req,res) => {
  Book.findById(req.params.id,(err, book) => {
    if (err) res.json(err);

    book.isbn = req.body.isbn || book.isbn
    book.title = req.body.title || book.title
    book.author =req.body.author || book.author
    book.category =req.body.category || book.category
    book.stock =req.body.stock || book.stock

    book.save( (err, updatedBook) => {
      if (err) res.json(err);
      res.json(updatedBook);
    });
  });
}


var deleteBook = (req,res) => {
  Book.findById(req.params.id,(err, book) => {

    if (err) res.json(err);
    book.remove((err, message) => {
      if (err) res.json(err);
      res.json(message);
    });
  });
}



module.exports = {
  getAllBooks:getAllBooks,
  createBook:createBook,
  updateBook:updateBook,
  deleteBook:deleteBook
};

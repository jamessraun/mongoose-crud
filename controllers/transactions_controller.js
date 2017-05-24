var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Transaction = require('../models/transaction')
var Book = require('../models/book')
var calculate_date = require('../helpers/calculate_date')
var calculate_fine = require('../helpers/calculate_fine')


var getAllTransactions = (req, res) => {

  Transaction.find().populate('booklist').exec((err, transactions) => {
    res.json(transactions)
  })

}

var createTransaction = (req, res) => {

  let booksId = req.body.booklist.split(',')
  let date = calculate_date(req.body.days)

  let transactions = {
    memberid: req.body.memberid,
    days: req.body.days,
    out_date: new Date(),
    due_date: date,
    booklist: booksId
  }

  //reducing books' stock
  for(let i=0;i<booksId.length;i++){
    Book.findById(booksId[i],(err, result) => {
      if (err) res.json(err)
      if(+result.stock!==0){
        result.stock=+result.stock-1
        result.save((err, updateBook) => {
          if (err) res.json(err);
          else{
            Transaction.create(transactions, (err, trans) => {
              if(err) res.json(err)
              if(i===booksId.length-1)
              res.json(trans)
            })
          }
        });
      }else {
        res.json({message:'out of stock'})
        i=booksId.length;
      }
    })
  }
  //end of reducing books' stock

}

var updateTransaction = (req, res) => {
  Transaction.findById(req.params.id, (err, result) => {

    let booksId = result.booklist

    if (err) res.json(err)

    let fine = calculate_fine(result.due_date);
    result.in_date = new Date()
    result.fine = fine

    //increasing books' stock
      for(let i=0;i<booksId.length;i++){
        Book.findById(booksId[i],(err, result) => {
          if (err) res.json(err)
            result.stock=+result.stock+1
            result.save((err, updateBook) => {
              if (err) res.json(err);
            });
        })
      }
      //end of increasing books' stock

    result.save((err, updatedtransaction) => {
      if (err) res.json(err);
      res.json(updatedtransaction);
    });

  })
}

var deleteTransaction = (req, res) => {

  Transaction.findById(req.params.id, (err, transaction) => {

    if (err) res.json(err);

    transaction.remove((err, message) => {

      if (err) res.json(err);
      res.json(message);

    });
  });

}


module.exports = {
  getAllTransactions:getAllTransactions,
  createTransaction:createTransaction,
  updateTransaction:updateTransaction,
  deleteTransaction:deleteTransaction
};

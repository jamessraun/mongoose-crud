var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Transaction = require('../models/transaction')
var calculate_date = require('../helpers/calculate_date')
var calculate_fine = require('../helpers/calculate_fine')


var getAllTransactions = (req,res) => {
    Transaction.find().populate('booklist').exec((err,transactions) => {

      console.log(transactions);
      res.send(transactions)
    })
}

var createTransaction = (req,res) => {

    let arrSplit = req.body.booklist.split(',')
    console.log(arrSplit);
    var resultDate = calculate_date(req.body.days)
    console.log(resultDate);
    var date = new Date(resultDate)

    transactions = {
      memberid:req.body.memberid,
      days:req.body.days,
      out_date:new Date(),
      due_date:date,
      booklist:arrSplit
    }

    Transaction.create(transactions,(err,trans) => {
      res.send(trans)
    })
}

var updateTransaction = (req,res) => {
  Transaction.findById(req.params.id,(err,result) => {
    if (err)
    res.send(err)

    let fine = calculate_fine(result.due_date);
    console.log(fine);
    result.in_date = new Date()
    result.fine = fine
    result.save( (err, updatedtransaction) => {
      if (err) res.send(err);
      res.send(updatedtransaction);
    });
  });
}


var deleteTransaction = (req,res) => {
  Transaction.findById(req.params.id,(err, transaction) => {

    if (err) res.send(err);
    transaction.remove((err, message) => {
      if (err) res.send(err);
      res.send(message);
    });
  });
}



module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var book =  require('./routes/book');
var customer =  require('./routes/customer');
var transaction = require('./routes/transaction');
var app = express()

mongoose.connect('mongodb://localhost/library');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/books',book)
app.use('/customers',customer)
app.use('/transactions',transaction)


app.listen(3000)

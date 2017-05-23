var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api =  require('.routes/api')
var app = express()

mongoose.connect('mongodb://localhost/library');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/api',api)



app.listen(3000)

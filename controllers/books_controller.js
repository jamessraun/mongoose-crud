var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Book = require('../models.book')

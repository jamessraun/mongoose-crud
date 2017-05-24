var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var matchMemberId = [/CL\d{4}/,'ivalid memberid!']

var transactionSchema = new Schema({
  memberid:{type:String,required:true,unique:true,match:matchMemberId},
  days: {type:Number,required:true},
  out_date: Date,
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist:[{ type: Schema.Types.ObjectId,ref: 'Book' }]
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

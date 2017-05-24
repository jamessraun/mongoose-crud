var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var matchMemberId = [/CL\d{4}/,'ivalid memberid!']
   ,matchPhone = [/^\d{10,12}$/,'invalid phone number!']
   ,matchName = [/^[a-z ,.'-]+$/,'invalid name!']

var customerSchema = new Schema({
  name: {type:String,match:matchName},
  memberid: {type:String,required:true,unique:true,match:matchMemberId},
  address: String,
  zipcode: String,
  phone: {type:String,match:matchPhone},
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

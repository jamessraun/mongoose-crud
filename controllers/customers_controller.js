var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var customer = require('../models/customer')


var getAllCustomers = (req,res) => {
    customer.find((err,customers) => {
      res.send(customers)
    })
}

var createCustomer = (req,res) => {
    customer.create(req.body,(err,customers) => {
      res.send(customers)
    })
}

var updateCustomer = (req,res) => {
  customer.findById(req.params.id,(err, customer) => {
    if (err) res.send(err);

    customer.name = req.body.name || customer.name
    customer.memberid = req.body.memberid || customer.memberid
    customer.address =req.body.address || customer.address
    customer.zipcode =req.body.zipcode || customer.zipcode
    customer.phone =req.body.phone || customer.phone

    customer.save( (err, updatedcustomer) => {
      if (err) res.send(err);
      res.send(updatedcustomer);
    });
  });
}


var deleteCustomer = (req,res) => {
  customer.findById(req.params.id,(err, customer) => {

    if (err) res.send(err);
    customer.remove((err, message) => {
      if (err) res.send(err);
      res.send(message);
    });
  });
}



module.exports = {
  getAllCustomers:getAllCustomers,
  createCustomer:createCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer
};

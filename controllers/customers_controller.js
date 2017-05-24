var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var customer = require('../models/customer')


var getAllCustomers = (req,res) => {
    customer.find((err,customers) => {
      res.json(customers)
    })
}

var createCustomer = (req,res) => {
    customer.create(req.body,(err,customers) => {

      if(err) res.json(err) //({message:'validation failed'})
      else res.json(customers)

    })
}

var updateCustomer = (req,res) => {
  customer.findById(req.params.id,(err, customer) => {
    if (err) res.json(err);

    customer.name = req.body.name || customer.name
    customer.memberid = req.body.memberid || customer.memberid
    customer.address =req.body.address || customer.address
    customer.zipcode =req.body.zipcode || customer.zipcode
    customer.phone =req.body.phone || customer.phone

    customer.save( (err, updatedcustomer) => {
      if (err) res.json(err);
      res.json(updatedcustomer);
    });
  });
}


var deleteCustomer = (req,res) => {
  customer.findById(req.params.id,(err, customer) => {

    if (err) res.json(err);
    customer.remove((err, message) => {
      if (err) res.json(err);
      res.json(message);
    });
  });
}



module.exports = {
  getAllCustomers:getAllCustomers,
  createCustomer:createCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer
};

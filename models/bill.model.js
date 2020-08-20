const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  product: String,
  buyer: Number,
  shop: String,
  price: String,
  cart: {

  }
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;
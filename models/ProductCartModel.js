const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductCart = mongoose.model('Cart', {
  customer: {
    type: ObjectId,
    ref: 'Customer',
  },
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  qty: {
    type: Number,
  },
});

module.exports = ProductCart;

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Order = mongoose.model('Order', {
  customer: {
    type: ObjectId,
    ref: 'Customer',
  },
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  //     qty: {
  //     type: Number,
  //   },
});

module.exports = Order;

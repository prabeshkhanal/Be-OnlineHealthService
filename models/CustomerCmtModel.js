const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CustomerCmtModel = mongoose.model('CustomerCmtModel', {
  customerid: {
    type: ObjectId,
    ref: 'Customer',
    require: true,
  },
  mid: {
    type: ObjectId,
    ref: 'Product',
  },
  comment: {
    type: String,
    require: true,
    },
});

module.exports = CustomerCmtModel;

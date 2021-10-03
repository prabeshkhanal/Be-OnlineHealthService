const mongoose = require('mongoose');
const Product = mongoose.model('Product', {
  pname: {
    type: String,
    required: true,
  },
  pimage: {
    type: String,
  },
  pcompanyname: {
    type: String,
  },
  pdesc: {
    type: String,
  },
  pprice: {
    type: String,
    required: true,
  },
  pmadein: {
    type: String,
  },
  pqty: {
    type: String,
  },
});

module.exports = Product;

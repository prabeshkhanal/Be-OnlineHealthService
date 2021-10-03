const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', {
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileimg: {
    type: String,
  },
  accounttype: {
    type: String,
    enum: ['Admin', 'user'],
    default: 'user',
  },
});

module.exports = Customer;

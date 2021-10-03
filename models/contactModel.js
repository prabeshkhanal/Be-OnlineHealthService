const mongoose = require('mongoose');
const Contact = mongoose.model('Contact', {
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  message: {
    type: String,
  },
});
module.exports = Contact;

const mongoose = require("mongoose");
const Booking = mongoose.model("Contact", {
  email: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  message: {
    type: String,
  },
  description: {
    type: String,
  },
});
module.exports = Booking;

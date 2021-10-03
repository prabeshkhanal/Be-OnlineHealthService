const mongoose = require("mongoose");
const Subscription = mongoose.model("Contact", {
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
  Subcriptionstatus: {
    type: String,
  },
});
module.exports = Subscription;

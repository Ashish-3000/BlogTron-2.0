const mongoose = require("mongoose");

let subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trime: true,
  },
  verified: false,
});

module.exports = mongoose.model("Subscriber", subscriberSchema);

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Tags", tagSchema);

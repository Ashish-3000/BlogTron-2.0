const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  content: {
    type: Array,
    default: [],
  },
  penname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  salt: String,
  encry_password: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  aboutme: {
    type: String,
  },
});

// a vritual field for storing the encrypted password
userSchema
  .virtual("password")
  .set(function (password) {
    this.encry_password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// a method for creating a secure password
userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {}
  },
};

module.exports = mongoose.model("User", userSchema);

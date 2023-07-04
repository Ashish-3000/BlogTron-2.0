const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    content: {
      type: Array,
      default: [],
    },
    penname: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    saved: {
      type: Number,
      default: 0,
    },
    published: {
      type: Number,
      default: 0,
    },
    role: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

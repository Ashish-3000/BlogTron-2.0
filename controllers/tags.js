const Blog = require("../models/blog");
const User = require("../models/user");
const Tags = require("../models/tags");

exports.getTag = (req, res, next, name) => {
  Tags.findOne({ name: name }).exec((err, tag) => {
    if (err) {
      return res.json("No tag like this exist currenlty");
    }
    req.tag = tag;
    next();
  });
};

exports.createTag = (req, res) => {
  const tag = Tags(req.body);
  tag.save((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: "The tag is already there",
      });
    }
    res.json({
      message: "The tag is created",
    });
  });
};

exports.removeTag = (req, res) => {
  const tag = Tags(req.body);
  tag.remove((err, tag) => {
    if (err || !tag) {
      return res.status(400).json({
        error: "Failed to delete",
      });
    }
    return res.json({
      message: "The tag has been deleted",
    });
  });
};

exports.getAllTags = (req, res) => {
  Tags.find().exec((err, tags) => {
    if (err) {
      return res.status(400).json({
        error: "Don't do these wrongs",
      });
    }
    return res.json(tags);
  });
};

exports.getBlogs = (req, res) => {
  const tag = req.tag;
  Blog.find({ tags: { $in: [tag.name] } }).exec((err, blogs) => {
    if (err) {
      return res.json({
        message: "No blogs are attached",
      });
    }
    return res.json(blogs);
  });
};

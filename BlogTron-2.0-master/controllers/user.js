const User = require("../models/user");
const Blog = require("../models/blog");
const Tags = require("../models/tags");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getAuthorByName = (req, res, next, name) => {
  User.findOne({ penname: name }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

// update penname
exports.updatePenName = (req, res) => {
  const user = req.profile;
  const penname = req.body;
  user.update({ $set: { penname: penname } }, (err, user) => {
    if (err) {
      return res.json({
        error: "There is a user with same name try something new",
      });
    }
    return res.json({
      message: "DONE",
    });
  });
};

// update pic
exports.updatePhoto = (req, res) => {
  const user = req.profile;
  const photo = req.body.photo;
  user.updateOne({ $set: { photo: photo } }, function (err, user) {
    if (err) {
      return res.json({
        error: "Sorry, not able to update try again later",
      });
    }
    return res.json({
      message: "DONE",
    });
  });
};

// update Link
exports.updateLink = (req, res) => {
  const user = req.profile;
  const links = req.body;
  user.updateOne({ $set: { links: links } }, function (err, user) {
    if (err) {
      return res.json({
        error: "Sorry, not able to update try again later",
      });
    }
    return res.json({
      message: "DONE",
    });
  });
};

// getAuthorBlogs
exports.getAuthorBlogs = (req, res) => {
  const data = {};
  const user = req.profile;
  data["user"] = user;
  Blog.find({ author: user })
    .sort({ createdAt: "desc" })
    .exec((err, blogs) => {
      if (err || blogs.length === 0) {
        data["blogs"] = [];
        return res.json(data);
      }
      data["blogs"] = blogs;
      return res.json(data);
    });
};

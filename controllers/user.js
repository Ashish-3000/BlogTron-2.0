const User = require("../models/user");
const Blog = require("../models/blog");
const Tags = require("../models/tags");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

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

exports.updatePassword = (req, res) => {
  const user = req.body.email;
  User.findOne({ email: user }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }

    const secret = process.env.SECRET + user.encry_password;
    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `${process.env.FRONTEND}/password/${token}/${user.id}`;
    const resend = new Resend(process.env.Token);

    try {
      resend.emails.send({
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: "Update your password",
        html: `<p> Update your password by clicking on this link ${link}</p>`,
      });
      return res.status(200).json({
        message: "The reset link has been sent to your mentioned mail",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: "Sorry there is some problem on our side",
      });
    }
  });
};

exports.resetPassword = (req, res) => {
  const user = req.profile;
  const password = req.body;
  const new_password = user.securePassword(password.password);

  const secret = process.env.SECRET + user.encry_password;

  // const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  try {
    const decoded = jwt.verify(password.token, secret);
    user.update({ $set: { encry_password: new_password } }, (err, user) => {
      if (err) {
        return res.json({
          error: "There is a user with same name try something new",
        });
      }
      return res.json({
        message: "DONE",
      });
    });
  } catch (err) {
    return res.json({
      error: "The link has been used once",
    });
  }
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

// send otp
// exports.sendOtp = (req, res) => {
//   const data = req.body;
//   console.log(data);
// };

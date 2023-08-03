const User = require("../models/user");
const Blog = require("../models/blog");
const Tags = require("../models/tags");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");

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

    const oAuth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENTID,
      process.env.OAUTH_CLIENTSECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: "Change Password",
      text: `Change your Password ${link}`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    return res.json({
      message: "Reset mail has been sent to your email id",
    });
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
exports.sendOtp = (req, res) => {
  const data = req.body;
  console.log(data);
};

const Blog = require("../models/blog");
const User = require("../models/user");
const Tags = require("../models/tags");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const expressJwt = require("express-jwt");
const { Resend } = require("resend");

// TODO:check for the uniqueness specifically
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const user = User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save the user in DB",
      });
    }
    verify(user);
    return res.json({
      msg: "The user is saved",
    });
  });
};

function verify(user) {
  const secret = process.env.SECRET + user.encry_password;
  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `${process.env.FRONTEND}/verify/${token}/${user.id}`;
  const resend = new Resend(process.env.RESEND_API);

  try {
    resend.emails.send({
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: "Verify your email",
      html: `<p>Verify your email ${link}</p>`,
    });
  } catch (e) {
    console.log(e);
  }
}

exports.verifyaccount = (req, res) => {
  const user = req.profile;
  if (user.verified) {
    return res.status(200).json({
      message: "You are verified",
    });
  }
  const id = req.body;
  const secret = process.env.SECRET + user.encry_password;

  try {
    const decoded = jwt.verify(id.token, secret);
    if (decoded.email === user.email && decoded.id === user.id) {
      user.updateOne({ $set: { verified: true } }, (err, user) => {
        if (err) {
          return res.status(403).json({
            error: "Sorry there is some problem on our side",
          });
        }
        return res.status(200).json({
          message: "verification Successfull",
        });
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: "You have changed the link or there might be some other issue",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }
    // console.log(user);
    if (!user.verified) {
      verify(user);
      return res.status(403).json({
        error:
          "Verify your mail id first, the verification mail has been sent to you",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and password does not match",
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token in cookie
    // res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to frontend
    const { _id, name, email, role, penname, photo } = user;
    return res.json({
      token,
      user: { _id, name, email, role, penname, photo },
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "user signout Successfully",
  });
};

// protected routes
// here auth adds extra properties to the req
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(400).json({
      error: "DON'T ACT SMART",
    });
  }
  next();
};

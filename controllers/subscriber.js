const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const Blog = require("../models/blog");
const Subscriber = require("../models/subscriber");

const resend = new Resend(process.env.Token);

exports.addSubscriber = (req, res) => {
  const subscriber = Subscriber(req.body);
  // verification email sent
  try {
    Subscriber.findOne({ email: subscriber.email }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          message: "Sorry, there is some problem on our side",
        });
      }
      if (!user) {
        if (!user) {
          try {
            subscriber.save((err, subscriber) => {
              if (err) {
                return res.status(200).json({
                  error: "Don't worry you have subscribed",
                });
              }
              verify(subscriber);
              res.status(200).json({
                message: "The verification link has been sent to your mail id",
              });
            });
          } catch (err) {
            console.error(err);
          }
        }
      } else if (!user?.verified) {
        verify(subscriber);
        res.status(200).json({
          message: "The verification link has been sent to your mail id",
        });
      } else if (user.verified)
        return res.status(200).json({
          message: "You are already Subscribed.",
        });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.verifySubscriber = (req, res) => {
  const id = req.body;
  const secret = process.env.SECRET + id.id;

  try {
    const decoded = jwt.verify(id.token, secret);
    // Subscriber.findById(decoded.id).exec((err, subscriber) => {
    //   if (subscriber.verified) {
    //     return res.status(200).json({
    //       message: "You have already subscribed",
    //     });
    //   }
    // });
    Subscriber.findByIdAndUpdate(
      { _id: decoded.id },
      { $set: { verified: true } },
      function (err, subscriber) {
        if (err) {
          return res.json({
            error: "There is some problem on our side. Sorry for that",
          });
        }
        return res.json({
          message: "Verification Successful",
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error:
        "Maybe the link has expired or there might be some other issue. Try after some time",
    });
  }
};

function verify(user) {
  const secret = process.env.SECRET + user.id;
  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `${process.env.FRONTEND}/subscriber/${token}/${user.id}`;
  try {
    resend.emails.send({
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: "Subscription Confirmation",
      html: `<p>Thanks for Subscribing. Confirm your subscription by clicking on ${link}</p>`,
    });
  } catch (e) {
    console.log(e);
  }
}

exports.allSubscribers = (req, res) => {
  Subscriber.find({ verified: true })
    .select("email -_id")
    .exec((err, blogs) => {
      if (err || blogs.length === 0) {
        return res.json({
          error: "No blogs found",
        });
      }
      return res.json(blogs);
    });
};

exports.sendNewsletter = (req, res) => {
  Blog.find({ published: 1 })
    .sort({ _id: -1 })
    .select("title")
    .limit(5)
    .exec((err, blogs) => {
      if (err || blogs.length === 0) {
        return res.json({
          error: "No blogs found",
        });
      }
      return res.json(blogs);
    });
};

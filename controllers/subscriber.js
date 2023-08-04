const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");

const Subscriber = require("../models/subscriber");
const subscriber = require("../models/subscriber");

exports.addSubscriber = (req, res) => {
  const subscriber = Subscriber(req.body);
  // verification email sent
  Subscriber.findOne({ email: subscriber.email }).exec((err, user) => {
    if (err || !user || !user.verified) {
      subscriber.save((err, subscriber) => {
        if (err) {
          return res.status(400).json({
            error: "Don't worry you have subscribed",
          });
        }
        verify(subscriber);
        res.status(200).json({
          message: "The verification link has been sent to your mail id",
        });
      });
    }
    if (user.verified)
      return res.status(200).json({
        message: "You are already Subscribed.",
      });
  });
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
    subject: "Verify Email for Subscription",
    text: `Click on this link to verify email ${link}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

const Subscriber = require("../models/subscriber");

exports.addSubscriber = (req, res) => {
  const subscriber = Subscriber(req.body);
  subscriber.save((err, subscriber) => {
    if (err) {
      return res.status(400).json({
        error: "Don't worry you have subscribed",
      });
    }
    res.json({
      message: "Subscription successfull",
    });
  });
};

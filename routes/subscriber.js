const express = require("express");
const router = express.Router();
const {
  addSubscriber,
  verifySubscriber,
  allSubscribers,
  sendNewsletter,
} = require("../controllers/subscriber");

router.post("/addsubscriber", addSubscriber);

router.put("/verifysubscriber", verifySubscriber);

router.get("/subscribers", allSubscribers);

router.get("/getnewsletter", sendNewsletter);

module.exports = router;

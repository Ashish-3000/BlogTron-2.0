const express = require("express");
const router = express.Router();
const {
  addSubscriber,
  verifySubscriber,
} = require("../controllers/subscriber");

router.post("/addsubscriber", addSubscriber);

router.put("/verifysubscriber", verifySubscriber);

module.exports = router;

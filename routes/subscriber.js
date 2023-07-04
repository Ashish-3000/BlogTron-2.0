const express = require("express");
const { addSubscriber } = require("../controllers/subscriber");
const router = express.Router();

router.post("/addSubscriber", addSubscriber);

module.exports = router;

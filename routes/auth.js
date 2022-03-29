const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signin, signout, signup } = require("../controllers/auth");

// TODO:verify email using sending token

router.post(
  "/signup",
  [
    check("name", "name should be atleast 2 characters").isLength({ min: 2 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({
      min: 3,
      max: 15,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is compulsory").isLength({
      min: 3,
      max: 15,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;

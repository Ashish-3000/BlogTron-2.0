const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getAuthorByName,
  updatePhoto,
  updateLink,
  updatePenName,
  getAuthorBlogs,
} = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("name", getAuthorByName);
// update name
// TODO:add express validator
router.put("/penname/:userId", isSignedIn, isAuthenticated, updatePenName);

// update the photo
router.put("/updatepic/:userId", isSignedIn, isAuthenticated, updatePhoto);

// update the links
router.put("/links/:userId", isSignedIn, isAuthenticated, updateLink);

// get author blogs
router.get("/getauthorblogs/:name", getAuthorBlogs);

// update the user photo

module.exports = router;

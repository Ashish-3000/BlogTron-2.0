const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getTag,
  createTag,
  removeTag,
  getAllTags,
  getBlogs,
} = require("../controllers/tags");

const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("name", getTag);
// add tag
router.post("/createtag/:userId", isSignedIn, isAuthenticated, createTag);

// getAllTags
router.get("/alltags", getAllTags);

// remove tag
router.delete("/removetag/:userId", isSignedIn, isAuthenticated, removeTag);

// get tagged blogs
router.get("/tag/:name", getBlogs);

module.exports = router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  createBlog,
  getBlogById,
  allBlogs,
  updateBlog,
  removeBlog,
} = require("../controllers/blog");
const { getUserById } = require("../controllers/user");

// param
router.param("userId", getUserById);
router.param("blogId", getBlogById);

// create the blog
router.post("/createblog/:userId", isSignedIn, isAuthenticated, createBlog);

// all blogs
router.get("/allblogs", allBlogs);

// update the blog
router.put(
  "/updateblog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  updateBlog
);

// remove the blog
router.delete(
  "/removeblog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  removeBlog
);
module.exports = router;

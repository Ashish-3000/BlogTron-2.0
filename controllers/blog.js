const Blog = require("../models/blog");
const User = require("../models/user");
const Tags = require("../models/tags");

// get Blog by Id
exports.getBlogById = (req, res, next, id) => {
  Blog.findById(id).exec((err, blog) => {
    if (err || !blog) {
      return res.status(400).json({
        error: "No blog was found in DB",
      });
    }
    req.thatblog = blog;
    next();
  });
};

// create blog
exports.createBlog = (req, res) => {
  const blog = Blog(req.body);
  const user = req.profile;
  blog.author = user;
  blog.penname = user.penname;
  blog.save((err, blog) => {
    if (err) {
      return res.json({
        error: "There is already a title with same name",
      });
    }
    return res.json({
      message: "DONE",
    });
  });
};

// all blogs
exports.allBlogs = (req, res) => {
  Blog.find({ published: 1 })
    .sort({ createdAt: "desc" })
    .exec((err, blogs) => {
      if (err || blogs.length === 0) {
        return res.json({
          error: "No blogs found",
        });
      }
      return res.json(blogs);
    });
};

// update blog
exports.updateBlog = (req, res) => {
  const blog = req.thatblog;
  req.body["id"] = blog._id;

  Blog.findByIdAndUpdate(
    { _id: blog._id },
    { $set: req.body },
    { new: true },
    (err, blog) => {
      if (err) {
        return res.json({
          error: "Not able to update the Blog",
        });
      }
      return res.json({
        message: "DONE",
      });
    }
  );
};

// remove blog
exports.removeBlog = (req, res) => {
  const blog = req.thatblog;
  blog.remove((err, blog) => {
    if (err) {
      return res.json({
        error: "not able to delete blog",
      });
    }
    return res.json({
      messsage: "DONE",
    });
  });
};

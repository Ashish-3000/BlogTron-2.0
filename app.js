const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const mql = require("@microlink/mql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// MyRoutes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const tagsRoutes = require("./routes/tags");
const blogRoutes = require("./routes/blog");

// DB connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB OOPs");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// My Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(tagsRoutes);
app.use(blogRoutes);

// app.get("/fetch", async (req, res) => {
//   const { status, data } = await mql(req.query.url);
//   const value = {
//     success: 1,
//     link: req.query.url,
//     meta: {
//       title: data.title,
//       description: data.description,
//       image: {
//         url: data.image,
//       },
//     },
//   };
//   return res.json(value);
// });

// PORT
const port = 8000;

// starting a server
app.listen(port, () => {
  console.log(`app is running`);
});

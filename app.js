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

app.use(bodyParser.json());
app.use(cors());

app.get("/fetch", async (req, res) => {
  const { status, data } = await mql(req.query.url);
  const value = {
    success: 1,
    link: req.query.url,
    meta: {
      title: data.title,
      description: data.description,
      image: {
        url: data.image,
      },
    },
  };
  return res.json(value);
});


// Constants
const PORT = 8080;

// App
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Running`);
});

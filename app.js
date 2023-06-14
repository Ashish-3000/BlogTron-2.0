import { connect } from "mongoose";
import express from "express";
require("dotenv").config();
import mql from "@microlink/mql";
import { json } from "body-parser";
const app = express();
import cors from "cors";

// MyRoutes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import tagsRoutes from "./routes/tags";
import blogRoutes from "./routes/blog";

// DB connection
connect(process.env.DATABASE)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB OOPs");
  });

// Middlewares
app.use(json());
app.use(cors());

// // My Routes
// app.use(authRoutes);
// app.use(userRoutes);
// app.use(tagsRoutes);
// app.use(blogRoutes);

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

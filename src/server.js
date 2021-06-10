import express from "express";
import route from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// template engine
app.set("view-engine", "ejs");

app.set("port", process.env.PORT || 3000);

// ROUTES
app.use("/api/image", route);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use("*", (req, res) => {
  res.status(404).send("<h1>Not Found</h1>");
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});

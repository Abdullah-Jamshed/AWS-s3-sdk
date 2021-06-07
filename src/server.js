import express from "express";
import route from "./routes/index.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", 3000);

app.use("/api/", route);

app.get("/", (req, res) => {
  res.json({
    status: "Server is Working",
  });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});

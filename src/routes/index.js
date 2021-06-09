import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.send("Hello From server");
});

route.post("/", (req, res) => {
  try {
    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ status: "failed" });
  }
});

export default route;

import multer from "multer";
import path from "path";
import { Router } from "express";
const route = Router();

// CONTROLLER
import { imageUpload } from "../controller/index.js";

const storage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

route.post("/", upload.single("image"), imageUpload);

export default route;

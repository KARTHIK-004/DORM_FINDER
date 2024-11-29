import express from "express";
import { uploadImages } from "../controllers/upload.controller.js";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.array("images", 7), uploadImages);

export default router;

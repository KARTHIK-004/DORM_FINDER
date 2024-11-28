import express from "express";
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createListing);
router.get("/", getListings);
router.get("/:id", getListing);
router.patch("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

export default router;

import express from "express";
import { reportItem, getItems, getMyItems, deleteItem } from "../controllers/item.controller.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// @route   POST /api/items
// @desc    Report a lost/found item
// @access  Private
router.post("/", ensureAuth, upload.single("image"), reportItem);

// @route   GET /api/items
// @desc    Get all items (optional ?type=lost/found)
// @access  Public
router.get("/", getItems);

// @route   GET /api/items/me
// @desc    Get items reported by logged-in user
// @access  Private
router.get("/me", ensureAuth, getMyItems);

// @route   DELETE /api/items/:id
// @desc    Delete user's own item
// @access  Private
router.delete("/:id", ensureAuth, deleteItem);

export default router;

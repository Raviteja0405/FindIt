// routes/userRoutes.js
import express from "express";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  deleteMyAccount,
  completeProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// @route   GET /api/users/me
// @desc    Get logged-in user's profile
// @access  Private
router.get("/me", ensureAuth, getProfile);

// @route   POST /api/users/complete-profile
// @desc    Complete user profile (called after Google OAuth)
// @access  Private
router.post("/complete-profile", ensureAuth, completeProfile);

// @route   PUT /api/users/me
// @desc    Update contact info
// @access  Private
router.put("/me", ensureAuth, updateProfile);

// @route   DELETE /api/users/me
// @desc    Delete own account (optional)
// @access  Private
router.delete("/me", ensureAuth, deleteMyAccount);

export default router;

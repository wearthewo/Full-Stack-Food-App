import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

import {
  authenticateUser,
  authorizeAdmin,
  getUserOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user and return JWT
// @access  Public
router.post("/login", loginUser);

// @route   POST /api/users/logout
// @desc    Logout user (client should delete JWT)
// @access  Public (stateless)
router.post("/logout", logoutUser);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get("/", authenticateUser, authorizeAdmin, getAllUsers);

// @route   DELETE /api/users/:id
// @desc    Delete a user by ID (admin only)
// @access  Private/Admin
router.delete("/:id", authenticateUser, authorizeAdmin, deleteUser);

// @route   GET /api/users/me
// @desc    Get current user info (for logged-in user)
// @access  Private
router.get("/me", authenticateUser, getUserOrAdmin);

export default router;

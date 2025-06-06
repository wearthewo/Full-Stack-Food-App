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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authenticateUser, getUserOrAdmin);

router.get("/", authenticateUser, authorizeAdmin, getAllUsers);

router.delete("/:id", authenticateUser, authorizeAdmin, deleteUser);

export default router;

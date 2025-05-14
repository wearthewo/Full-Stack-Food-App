import express from "express";
import { getUserOrders } from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
// Get all orders for the authenticated user
router.get("/", authenticateUser, getUserOrders); // Get orders for the authenticated user

export default router;

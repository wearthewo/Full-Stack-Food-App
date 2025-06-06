import express from "express";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartByUser,
} from "../controllers/cartController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateUser, getCartByUser);
router.post("/", authenticateUser, addToCart);
router.put("/update", authenticateUser, updateCartItem);
router.delete("/remove", authenticateUser, removeFromCart);
router.delete("/clear", authenticateUser, clearCart);

export default router;

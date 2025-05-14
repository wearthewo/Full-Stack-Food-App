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

/* router.get("/:id", authenticateUser, getCartByUser); // Get cart by user ID
router.post("/", authenticateUser, addToCart); // Add to cart
router.put("/:id", authenticateUser, updateCartItem); // Update quantity
router.delete("/:id", authenticateUser, removeFromCart); // Remove from cart
router.delete("/clear", authenticateUser, clearCart); // Clear cart */

router.get("/me", authenticateUser, getCartByUser);
router.post("/", authenticateUser, addToCart);
router.put("/update", authenticateUser, updateCartItem);
router.delete("/remove", authenticateUser, removeFromCart);
router.delete("/clear", authenticateUser, clearCart);

export default router;

import Cart from "../models/cartModel.js";
import Food from "../models/foodModel.js";
import mongoose from "mongoose";

// Add item to cart
export const addToCart = async (req, res) => {
  const { foodId, quantity } = req.body;
  const userId = req.user?._id || req.body.userId;

  if (!userId || !foodId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ foodId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ foodId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quantity
export const updateCartItem = async (req, res) => {
  const { foodId, quantity } = req.body;
  const userId = req.user?._id || req.body.userId;

  if (!userId || !foodId || quantity <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.foodId.toString() === foodId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.foodId");

    res.json({ message: "Item quantity updated", items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { foodId } = req.body;
  const userId = req.user?._id || req.body.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId);
    await cart.save();
    await cart.populate("items.foodId");

    res.json({ message: "Item removed", items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const userId = req.user?._id || req.body.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    await cart.populate("items.foodId");

    res.json({ message: "Cart cleared", items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart
export const getCartByUser = async (req, res) => {
  const userId = req.user?._id || req.body.userId;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
      cart = await cart.populate("items.foodId");
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

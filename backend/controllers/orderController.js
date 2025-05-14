// controllers/orderController.js
import Order from "../models/orderModel.js";

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.foodId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

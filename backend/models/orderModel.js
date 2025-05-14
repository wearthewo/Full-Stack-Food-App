import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food", // assuming you have a Food model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

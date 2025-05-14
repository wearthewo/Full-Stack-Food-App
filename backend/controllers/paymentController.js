import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const checkOutSession = async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`, //  MUST include session_id
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        userId: req.user._id.toString(), //  Assuming middleware sets this
        orderId: "order_" + new Date().getTime(),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Get Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Optional: get line items (useful for debugging or logging)
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    // Get user ID from session metadata
    const userId = session.metadata?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing in metadata" });
    }

    // Find cart
    const cart = await Cart.findOne({ userId }).populate("items.foodId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      foodId: item.foodId._id,
      quantity: item.quantity,
    }));

    // Create order
    const newOrder = await Order.create({
      userId,
      items: orderItems,
      total: session.amount_total / 100,
      status: "paid",
    });

    // Clear cart
    await Cart.deleteOne({ userId });

    // Respond with new order ID
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error("Error confirming payment:", err);
    res.status(500).json({ message: "Error confirming payment" });
  }
};

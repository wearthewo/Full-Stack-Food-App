// components/CheckoutButton.jsx
import { loadStripe } from "@stripe/stripe-js";
import { api } from "../utils/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const { data } = await api.post("/create-checkout-session", {
        items: cartItems,
      });
      console.log("Checkout session created:", data);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to redirect to checkout.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;

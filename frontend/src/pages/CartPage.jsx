/* import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadCart(user.id);
    }
  }, [user]);

  const loadCart = async (userId) => {
    try {
      const { data } = await api.get(`/cart/${userId}`);
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error("Error loading cart:", error.message);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.foodId.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const updateQuantity = async (foodId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${foodId}`, {
        userId: user.id,
        foodId,
        quantity,
      });
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error("Update quantity error:", error.message);
    }
  };

  const removeItem = async (foodId) => {
    try {
      const { data } = await api.delete(`/cart/${foodId}`, {
        data: { userId: user.id, foodId },
      });
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error("Remove item error:", error.message);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear", {
        data: { userId: user.id },
      });
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Clear cart error:", error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const items = cartItems.map((item) => ({
        name: item.foodId.name,
        price: item.foodId.price,
        quantity: item.quantity,
      }));

      const { data } = await api.post("/payment", { items });

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{item.foodId.name}</strong> — €{item.foodId.price}
                    <div className="text-sm">Qty: {item.quantity}</div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, item.quantity + 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, item.quantity - 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <button
                      onClick={() => removeItem(item.foodId._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: €{totalPrice}</h2>

            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 text-lg"
            >
              Pay with Stripe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
 */

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  const loadCart = async () => {
    try {
      const { data } = await api.get("/cart/me");
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error(
        "Error loading cart:",
        error.response?.data?.message || error.message
      );
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.foodId.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const updateQuantity = async (foodId, quantity) => {
    try {
      const { data } = await api.put("/cart/update", {
        foodId,
        quantity,
      });
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error(
        "Update quantity error:",
        error.response?.data?.message || error.message
      );
    }
  };

  const removeItem = async (foodId) => {
    try {
      const { data } = await api.delete("/cart/remove", {
        data: { foodId },
      });
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (error) {
      console.error(
        "Remove item error:",
        error.response?.data?.message || error.message
      );
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error(
        "Clear cart error:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe not loaded");
        return;
      }

      const items = cartItems.map((item) => ({
        name: item.foodId.name,
        price: item.foodId.price,
        quantity: item.quantity,
      }));

      const { data } = await api.post("/payment", { items });

      console.log("Stripe session ID:", data.id); // ✅ Debug log

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{item.foodId.name}</strong> — €{item.foodId.price}
                    <div className="text-sm">Qty: {item.quantity}</div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, item.quantity + 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, item.quantity - 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <button
                      onClick={() => removeItem(item.foodId._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: €{totalPrice}</h2>

            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 text-lg"
            >
              Pay with Stripe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

import { useEffect, useState } from "react";
import { api } from "../utils/api";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /*  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (error) {
        console.error(
          "Fetch orders error:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); */

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        if (isMounted) setOrders(data);
      } catch (error) {
        console.error(
          "Fetch orders error:",
          error.response?.data?.message || error.message
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading your orders...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 mb-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500">
              Order placed: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-green-600">Status: {order.status}</p>
            <ul className="mt-2">
              {order.items.map((item) => (
                <li key={item.foodId._id} className="text-sm">
                  {item.quantity}x {item.foodId.name}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">
              Total: €{order.total.toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;

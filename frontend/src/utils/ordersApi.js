import { api } from "./api";
// 1. Create a new order
export const createOrder = (cartId, paymentDetails) =>
  api.post("/orders", { cartId, paymentDetails });

// 3. Get a single order by ID
export const getOrderById = (id) => api.get(`/orders/${id}`);

// 4. Get current logged-in user's orders
export const getUserOrders = (id) => api.get(`/orders/${id}`);

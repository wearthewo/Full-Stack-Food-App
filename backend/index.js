import express from "express";
import cors from "cors";
import connectDB from "./db/configDB.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON request body
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // adjust as needed
    credentials: false, // set to true only if using cookies
  })
);

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

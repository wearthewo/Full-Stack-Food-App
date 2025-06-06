import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/configDB.js";

import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// CORS for local dev OR deployed frontend (update if needed)
app.use(
  cors({
    origin: "http://localhost:5000", // or your deployed frontend domain
    credentials: true,
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Serve static frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from backend (dist copied into /public by Dockerfile)
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

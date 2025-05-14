import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to authenticate user from Authorization header
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check if the user is an admin
export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized, user is not an admin" });
  }
  next();
};

// Route handler to return authenticated user info
export const getUserOrAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { username, role } = req.user;
    res.status(200).json({ username, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

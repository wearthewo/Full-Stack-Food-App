import express from "express";
import {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, createFood); // Create food item
router.get("/", getAllFoods); // Get all food items
router.get("/:id", getFoodById); // Get food item by ID
router.put("/:id", authenticateUser, authorizeAdmin, updateFood); // Update food item by ID
router.delete("/:id", authenticateUser, authorizeAdmin, deleteFood); // Delete food item by ID
// Upload route
router.post(
  "/upload",
  authenticateUser,
  authorizeAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      imageUrl: req.file.path, // The secure Cloudinary URL
      publicId: req.file.filename, // Cloudinary public ID (needed if you want to delete it later)
    });
  }
);

export default router;

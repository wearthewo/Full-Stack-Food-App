import express from "express";
import {
  checkOutSession,
  confirmPayment,
} from "../controllers/paymentController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, checkOutSession); // Create a checkout session for payment
router.post("/confirm-payment", authenticateUser, confirmPayment);

export default router;

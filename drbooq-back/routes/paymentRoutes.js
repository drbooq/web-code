import express from "express";
import { verifyToken } from "../middleware/Auth.js";
import {
  createOrder,
  verifyPayment,
  getPaymentHistory
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

// ✅ Protected route for staff payment history
router.get("/history", verifyToken, getPaymentHistory);

export default router;

import express from "express";
import { verifyToken } from "../middleware/Auth.js";
import {
  getStaffAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

// ✅ Get all appointments for this staff’s doctors
router.get("/staff", verifyToken, getStaffAppointments);

// ✅ Confirm or Reject appointment
router.put("/update/:id", verifyToken, updateAppointmentStatus);

export default router;
    
// routes/doctorRoutes.js
import express from "express";
import { verifyToken } from "../middleware/Auth.js";
import {
  addDoctor,
  getMyDoctors,
  updateDoctor,
  deleteDoctor,
  getAllDoctorsForAdmin,getAllApprovedDoctors,
  updateDoctorStatus
} from "../controllers/doctorController.js";

const router = express.Router();

// Staff
router.post("/add", verifyToken, addDoctor);
router.get("/my", verifyToken, getMyDoctors);
router.put("/update/:id", verifyToken, updateDoctor);
router.delete("/delete/:id", verifyToken, deleteDoctor);
// ✅ Add this route for admin deletes
router.delete("/admin/delete/:id", verifyToken, deleteDoctor);


// Admin
router.get("/admin/all", getAllDoctorsForAdmin);
router.put("/status/:id", updateDoctorStatus);
// Public route (no login required)
router.get("/all", getAllApprovedDoctors);

export default router;

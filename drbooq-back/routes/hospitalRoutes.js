// import express from "express";
// import {
//   createHospital,
//   getAllHospitals,
//   getAllHospitalsForAdmin,
//   updateHospitalStatus,
//   updateHospital,
// } from "../controllers/hospitalController.js";
// import { protect } from "../middleware/Auth.js";

// const router = express.Router();

// // STAFF ROUTES
// router.post("/add", protect, createHospital);
// router.get("/all", protect, getAllHospitals);
// router.put("/update/:id", protect, updateHospital);

// // ADMIN ROUTES
// router.put("/update-status/:id", protect, updateHospitalStatus);
// router.get("/admin/all", getAllHospitalsForAdmin);

// export default router;
import express from "express";
import {
  createHospital,
  getAllHospitals,
  getAllHospitalsForAdmin,
  updateHospitalStatus,
  updateHospital,
  deleteHospital,
  getApprovedHospitals,
  toggleHospitalVisibility, // ✅ add this
} from "../controllers/hospitalController.js";

import { protect } from "../middleware/Auth.js";

const router = express.Router();

// STAFF ROUTES
router.post("/add", protect, createHospital);
router.get("/all", protect, getAllHospitals);
router.put("/update/:id", protect, updateHospital);

// ✅ NEW MASTER TOGGLE ENDPOINT
router.put("/toggle-visibility", protect, toggleHospitalVisibility);

// ADMIN ROUTES
router.put("/update-status/:id", protect, updateHospitalStatus);
router.get("/admin/all", getAllHospitalsForAdmin);
router.delete("/admin/delete/:id", protect, deleteHospital);

// PUBLIC ROUTE
router.get("/public/all", getApprovedHospitals);

export default router;

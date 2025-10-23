import express from "express";
import { signupPatient, loginPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/signup", signupPatient);
router.post("/login", loginPatient);

export default router;

import express from "express";
import { signupStaff, loginStaff } from "../controllers/staffController.js";

const router = express.Router();

router.post("/signup", signupStaff);
router.post("/login", loginStaff);

export default router;

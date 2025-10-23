 
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

/* ---------------- JWT HELPER ---------------- */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/* ---------------- SIGNUP STAFF ---------------- */
export const signupStaff = async (req, res) => {
  try {
    const { name, designation, phone, email } = req.body;

    if (!name || !designation || !phone) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const existing = await Staff.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const newStaff = await Staff.create({ name, designation, phone, email });
    const token = generateToken(newStaff._id);

    res.status(201).json({
      message: "Staff account created successfully",
      staff: newStaff,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- LOGIN STAFF ---------------- */
export const loginStaff = async (req, res) => {
  try {
    const { phone } = req.body;
    const staff = await Staff.findOne({ phone });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const token = generateToken(staff._id);
    res.status(200).json({
      message: "Login successful",
      staff,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

import Patient from "../models/Patient.js";

// ✅ POST /api/patient/signup
export const signupPatient = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone)
      return res.status(400).json({ message: "Name and phone are required" });

    const existing = await Patient.findOne({ phone });
    if (existing)
      return res.status(400).json({ message: "Account already exists" });

    const newPatient = await Patient.create({ name, phone });
    res.status(201).json({ patient: newPatient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ POST /api/patient/login
export const loginPatient = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await Patient.findOne({ phone });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// import Hospital from "../models/Hospital.js";
// import Doctor from "../models/Doctor.js"; // ✅ add this at top

// /* ---------------- CREATE HOSPITAL (Staff Only) ---------------- */
// export const createHospital = async (req, res) => {
//   try {
//     const data = req.body;
//     const staff = req.user;

//     if (!staff?._id) {
//       return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
//     }

//     const existing = await Hospital.findOne({
//       registrationNumber: data.registrationNumber,
//     });
//     if (existing) {
//       return res.status(400).json({ message: "Hospital already registered" });
//     }

//     const hospital = await Hospital.create({
//       ...data,
//       staffId: staff._id,
//       staffPhone: staff.phone,
//       staffEmail: staff.email || "",
//     });

//     res.status(201).json({
//       message: "✅ Hospital submitted successfully",
//       hospital,
//     });
//   } catch (err) {
//     console.error("Error creating hospital:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ---------------- GET ALL HOSPITALS (Only this staff’s) ---------------- */
// export const getAllHospitals = async (req, res) => {
//   try {
//     const staff = req.user;
//     if (!staff?._id) {
//       return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
//     }

//     const hospitals = await Hospital.find({ staffId: staff._id }).sort({ createdAt: -1 });
//     res.status(200).json({ hospitals });
//   } catch (err) {
//     console.error("Error fetching hospitals:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ---------------- GET ALL FOR ADMIN ---------------- */
// export const getAllHospitalsForAdmin = async (req, res) => {
//   try {
//     const hospitals = await Hospital.find().sort({ createdAt: -1 });
//     res.status(200).json({ hospitals });
//   } catch (err) {
//     console.error("Error fetching all hospitals:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ---------------- PUBLIC: GET APPROVED HOSPITALS ---------------- */
// export const getApprovedHospitals = async (req, res) => {
//   try {
//     // ✅ Only show hospitals that are approved, and not manually hidden
//     const hospitals = await Hospital.find({
//       status: "approved",
//       $or: [
//         { masterVisibility: { $exists: false } }, // older hospitals without field
//         { masterVisibility: true },               // visible ones
//       ],
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ hospitals });
//   } catch (err) {
//     console.error("Error fetching public hospitals:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// /* ---------------- UPDATE STATUS (Admin Only) ---------------- */
// export const updateHospitalStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, reason } = req.body;

//     const hospital = await Hospital.findById(id);
//     if (!hospital) return res.status(404).json({ message: "Hospital not found" });

//     if (status === "rejected") {
//       hospital.status = "rejected";
//       hospital.rejectedBy = "admin";
//       hospital.rejectionReason = reason || "No reason provided";
//       hospital.rejectedAt = new Date();
//     } else if (status === "approved") {
//       hospital.status = "approved";
//       hospital.rejectedBy = null;
//       hospital.rejectionReason = null;
//       hospital.rejectedAt = null;
//     } else {
//       hospital.status = "pending";
//     }

//     await hospital.save();
//     res.status(200).json({ message: `Hospital marked as ${status}`, hospital });
//   } catch (err) {
//     console.error("Error updating hospital status:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ---------------- UPDATE HOSPITAL (Staff can edit own) ---------------- */
// export const updateHospital = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const staff = req.user;

//     if (!staff?._id) {
//       return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
//     }

//     const hospital = await Hospital.findById(id);
//     if (!hospital) {
//       return res.status(404).json({ message: "Hospital not found" });
//     }

//     if (hospital.staffId.toString() !== staff._id.toString()) {
//       return res.status(403).json({ message: "You can only edit your own hospital" });
//     }

//     const restrictedFields = ["registrationNumber", "_id", "createdAt"];
//     restrictedFields.forEach((f) => delete req.body[f]);

//     if (hospital.status === "rejected") {
//       req.body.status = "pending";
//       req.body.rejectionReason = null;
//       req.body.rejectedBy = null;
//       req.body.rejectedAt = null;
//     }

//     const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       message: "✅ Hospital updated successfully",
//       hospital: updatedHospital,
//     });
//   } catch (err) {
//     console.error("Error updating hospital:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
// /* ---------------- DELETE HOSPITAL (Admin Only) ---------------- */
// /* ---------------- DELETE HOSPITAL ---------------- */
// export const deleteHospital = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: Please log in first" });
//     }

//     // ✅ Find hospital first
//     const hospital = await Hospital.findById(id);
//     if (!hospital) {
//       return res.status(404).json({ message: "Hospital not found" });
//     }

//     // ✅ Delete all offline doctors linked to this hospital
//     const deletedDoctors = await Doctor.deleteMany({
//       hospitalId: hospital._id,
//       onlineConsultation: false, // only offline doctors
//     });

//     // ✅ Delete the hospital itself
//     await Hospital.findByIdAndDelete(id);

//     res.status(200).json({
//       message: `✅ Hospital and ${deletedDoctors.deletedCount} offline doctors deleted successfully.`,
//     });
//   } catch (err) {
//     console.error("Error deleting hospital and linked doctors:", err);
//     res.status(500).json({
//       message: "Server error while deleting hospital and its doctors",
//       error: err.message,
//     });
//   }
// };
// export const toggleHospitalVisibility = async (req, res) => {
//   try {
//     const staff = req.user;
//     const { visible } = req.body;

//     if (!staff?._id)
//       return res.status(401).json({ message: "Unauthorized: Staff not logged in" });

//     // ✅ Only this staff’s hospital(s)
//     await Hospital.updateMany({ staffId: staff._id }, { masterVisibility: visible });

//     // ✅ Hide/show all doctors linked to this staff
//     const Doctor = (await import("../models/Doctor.js")).default;
//     await Doctor.updateMany({ staffId: staff._id }, { visibility: visible });

//     res.json({
//       success: true,
//       message: `Master visibility set to ${visible}`,
//     });
//   } catch (err) {
//     console.error("Error toggling master visibility:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";

/* ---------------- CREATE HOSPITAL (Staff Only) ---------------- */
export const createHospital = async (req, res) => {
  try {
    const data = req.body;
    const staff = req.user;

    if (!staff?._id) {
      return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
    }

    const existing = await Hospital.findOne({
      registrationNumber: data.registrationNumber,
    });

    if (existing) {
      return res.status(400).json({ message: "Hospital already registered" });
    }

    const hospital = await Hospital.create({
      ...data,
      staffId: staff._id,
      staffPhone: staff.phone,
      staffEmail: staff.email || "",
    });

    res.status(201).json({
      message: "✅ Hospital submitted successfully",
      hospital,
    });
  } catch (err) {
    console.error("Error creating hospital:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ---------------- GET ALL HOSPITALS (Only this staff’s) ---------------- */
export const getAllHospitals = async (req, res) => {
  try {
    const staff = req.user;

    if (!staff?._id) {
      return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
    }

    const hospitals = await Hospital.find({ staffId: staff._id }).sort({ createdAt: -1 });

    res.status(200).json({ hospitals });
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- GET ALL FOR ADMIN ---------------- */
export const getAllHospitalsForAdmin = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });
    res.status(200).json({ hospitals });
  } catch (err) {
    console.error("Error fetching all hospitals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- PUBLIC: GET APPROVED HOSPITALS ---------------- */
export const getApprovedHospitals = async (req, res) => {
  try {
    // ✅ Only show hospitals that are approved, and not manually hidden
    const hospitals = await Hospital.find({
      status: "approved",
      $or: [
        { masterVisibility: { $exists: false } }, // older hospitals without field
        { masterVisibility: true }, // visible ones
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ hospitals });
  } catch (err) {
    console.error("Error fetching public hospitals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- UPDATE STATUS (Admin Only) ---------------- */
export const updateHospitalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    const hospital = await Hospital.findById(id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    if (status === "rejected") {
      hospital.status = "rejected";
      hospital.rejectedBy = "admin";
      hospital.rejectionReason = reason || "No reason provided";
      hospital.rejectedAt = new Date();
    } else if (status === "approved") {
      hospital.status = "approved";
      hospital.rejectedBy = null;
      hospital.rejectionReason = null;
      hospital.rejectedAt = null;
    } else {
      hospital.status = "pending";
    }

    await hospital.save();

    res.status(200).json({
      message: `Hospital marked as ${status}`,
      hospital,
    });
  } catch (err) {
    console.error("Error updating hospital status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ---------------- UPDATE HOSPITAL (Staff can edit own) ---------------- */
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = req.user;

    if (!staff?._id) {
      return res.status(401).json({ message: "Unauthorized: Staff not logged in" });
    }

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (hospital.staffId.toString() !== staff._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own hospital" });
    }

    const restrictedFields = ["registrationNumber", "_id", "createdAt"];
    restrictedFields.forEach((f) => delete req.body[f]);

    if (hospital.status === "rejected") {
      req.body.status = "pending";
      req.body.rejectionReason = null;
      req.body.rejectedBy = null;
      req.body.rejectedAt = null;
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "✅ Hospital updated successfully",
      hospital: updatedHospital,
    });
  } catch (err) {
    console.error("Error updating hospital:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ---------------- DELETE HOSPITAL ---------------- */
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in first" });
    }

    // ✅ Find hospital first
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // ✅ Delete all offline doctors linked to this hospital
    const deletedDoctors = await Doctor.deleteMany({
      hospitalId: hospital._id,
      onlineConsultation: false, // only offline doctors
    });

    // ✅ Delete the hospital itself
    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      message: `✅ Hospital and ${deletedDoctors.deletedCount} offline doctors deleted successfully.`,
    });
  } catch (err) {
    console.error("Error deleting hospital and linked doctors:", err);
    res.status(500).json({
      message: "Server error while deleting hospital and its doctors",
      error: err.message,
    });
  }
};

/* ---------------- TOGGLE MASTER VISIBILITY (Staff Only) ---------------- */
export const toggleHospitalVisibility = async (req, res) => {
  try {
    const staff = req.user;
    const { visible } = req.body;

    if (!staff?._id)
      return res.status(401).json({ message: "Unauthorized: Staff not logged in" });

    // ✅ Only this staff’s hospital(s)
    await Hospital.updateMany({ staffId: staff._id }, { masterVisibility: visible });

    // ✅ Hide/show all doctors linked to this staff
    const Doctor = (await import("../models/Doctor.js")).default;
    await Doctor.updateMany({ staffId: staff._id }, { visibility: visible });

    res.json({
      success: true,
      message: `Master visibility set to ${visible}`,
    });
  } catch (err) {
    console.error("Error toggling master visibility:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

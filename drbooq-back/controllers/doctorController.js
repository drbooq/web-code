// controllers/doctorController.js
import Doctor from "../models/Doctor.js";

/* ✅ Staff: Add Doctor */
/* ✅ Staff: Add Doctor with Availability */
export const addDoctor = async (req, res) => {
  try {
    const staffId = req.user.id;
    const data = req.body;

    // 🧩 Basic validation
    if (!data.fullName || !data.specialization || !data.license) {
      return res.status(400).json({ message: "Missing required doctor fields" });
    }

    // 🧩 Handle availability (make sure it's an array)
    const availability = Array.isArray(data.availability)
      ? data.availability
      : [];

    // 🧩 Create doctor
    const newDoctor = new Doctor({
      ...data,
      availability, // ✅ include availability
      staffId,
      hospitalId: data.hospitalId || null,
      status: "pending",
    });

    await newDoctor.save();

    res.status(201).json({
      message: "✅ Doctor added successfully with availability",
      doctor: newDoctor,
    });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ message: err.message });
  }
};



/* ✅ Staff: Get My Doctors */
export const getMyDoctors = async (req, res) => {
  try {
    const staffId = req.user.id;
    const doctors = await Doctor.find({ staffId });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ✅ Staff: Update Doctor */
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const doctor = await Doctor.findOneAndUpdate(
      { _id: id, staffId },
      { $set: req.body },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor updated", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ✅ Staff: Delete Doctor */
/* ✅ Admin or Staff: Delete Doctor */
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // ✅ Detect if this request comes from admin (based on URL)
    const isAdminRequest = req.originalUrl.includes("/admin");

    // ✅ Allow Admin (any doctor) OR Staff (own doctor only)
    if (!isAdminRequest && doctor.staffId?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this doctor" });
    }

    await doctor.deleteOne();

    res.status(200).json({ message: "✅ Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





/* ✅ Admin: Get All Doctors */
export const getAllDoctorsForAdmin = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("staffId", "name phone");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ✅ Admin: Approve/Reject Doctor */
export const updateDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { status, rejectionReason },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor status updated", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
/* ✅ Public: Get All Approved Doctors (for users) */
/* ✅ Public: Get All Approved Doctors (with hospital details) */
export const getAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved", visibility: true })
      .populate("hospitalId", "name address district state phone type masterVisibility")
      .select("-password -rejectionReason")
      .lean();

    // ✅ Hide doctors whose hospital masterVisibility = false
    const visibleDoctors = doctors.filter(
      (doc) => doc.hospitalId?.masterVisibility !== false
    );

    res.json(visibleDoctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Failed to load doctors" });
  }
};


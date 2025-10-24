// controllers/appointmentController.js
import Booking from "../models/Booking.js";
import Doctor from "../models/Doctor.js";
import { sendWhatsAppMessage } from "../utils/whatsapp.js";

/* ✅ Staff: Get all appointments for their doctors */
export const getStaffAppointments = async (req, res) => {
  try {
    const staffId = req.user.id;

    // Find all doctors created by this staff
    const doctors = await Doctor.find({ staffId }).select("_id fullName");
    const doctorIds = doctors.map((d) => d._id);

    // Find all bookings for these doctors
    const bookings = await Booking.find({ doctorId: { $in: doctorIds } })
      .populate("doctorId", "fullName specialization")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("❌ [getStaffAppointments] Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to load appointments" });
  }
};

/* ✅ Staff: Confirm or Reject Appointment */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // booking ID
    const { status } = req.body; // confirmed or rejected

    if (!["confirmed", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(id).populate("doctorId", "fullName phone");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    // ✅ Notify patient and doctor via WhatsApp
    try {
      const doctor = booking.doctorId;
      const msgToPatient =
        status === "confirmed"
          ? `✅ *Booking Confirmed*\nYour appointment with *Dr. ${doctor.fullName}* on *${booking.date} at ${booking.time}* has been confirmed.`
          : `❌ *Booking Rejected*\nYour appointment with *Dr. ${doctor.fullName}* on *${booking.date} at ${booking.time}* was rejected. Refund will be processed if applicable.`;

      await sendWhatsAppMessage(booking.whatsapp, msgToPatient);
    } catch (notifyErr) {
      console.warn("⚠️ WhatsApp notify failed:", notifyErr.message);
    }

    res.json({ success: true, message: `Booking ${status}`, booking });
  } catch (err) {
    console.error("❌ [updateAppointmentStatus] Error:", err.message);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },
//     doctorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//     },
//     name: { type: String, required: true },
//     whatsapp: { type: String, required: true },
//     date: { type: String, required: true },
//     time: { type: String, required: true },
//     notes: { type: String },
//     bookingType: { type: String, enum: ["online", "offline"], required: true },
//     amountPaid: { type: Number, required: true },
//     orderId: { type: String, required: true },
//     paymentId: { type: String, required: true },
//     status: { type: String, default: "pending" },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", bookingSchema);

// // ✅ IMPORTANT: Default export for ES modules
// export default Booking;
// Add this to your booking routes file (e.g., routes/bookingRoutes.js)

import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// GET booked slots for a specific doctor
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    // Fetch all confirmed and pending bookings for this doctor
    const bookings = await Booking.find({
      doctorId,
      status: { $in: ["confirmed", "pending"] }
    }).select("date time status");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error fetching booked slots:", err);
    res.status(500).json({ message: "Failed to fetch booked slots" });
  }
});

export default router;

// In your main server file (e.g., server.js or index.js), add:
// import bookingRoutes from "./routes/bookingRoutes.js";
// app.use("/api/bookings", bookingRoutes);
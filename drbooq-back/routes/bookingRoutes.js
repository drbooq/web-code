// routes/bookingRoutes.js
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
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
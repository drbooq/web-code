import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    name: { type: String, required: true },
    whatsapp: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String },
    bookingType: { type: String, enum: ["online", "offline"], required: true },
    amountPaid: { type: Number, required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ✅ IMPORTANT: Default export for ES modules
export default Booking;

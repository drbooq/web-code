import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import Doctor from "../models/Doctor.js";
import { sendWhatsAppMessage } from "../utils/whatsapp.js";

/* ---------------- RAZORPAY INSTANCE ---------------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID?.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
});

/* ---------------- CREATE ORDER ---------------- */
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount)
      return res.status(400).json({ message: "Amount is required" });

    console.log("🟢 [CreateOrder] Requested amount:", amount);
    console.log("🔑 Using Razorpay key:", process.env.RAZORPAY_KEY_ID);

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert ₹ → paise (integer)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: { platform: "DrBooq Test Payment" },
    });

    console.log("✅ [CreateOrder] Razorpay order created:", order.id);

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("❌ [CreateOrder] Razorpay order creation failed:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Order creation failed", error: err.message });
  }
};

/* ---------------- VERIFY PAYMENT + SAVE BOOKING ---------------- */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      patientId,
      doctorId,
      name,
      whatsapp,
      date,
      time,
      notes,
      bookingType,
      amountPaid,
    } = req.body;

    console.log("🟢 [VerifyPayment] Incoming payment verification for order:", razorpay_order_id);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    // ✅ 1. Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET.trim())
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.warn("⚠️ [VerifyPayment] Invalid payment signature!");
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // ✅ 2. Save booking
    const newBooking = await Booking.create({
      patientId,
      doctorId,
      name,
      whatsapp,
      date,
      time,
      notes,
      bookingType,
      amountPaid,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "pending",
    });

    console.log("✅ [VerifyPayment] Booking saved:", newBooking._id);

    // ✅ 3. Notify doctor + patient (skip errors safely)
    try {
      const doctor = await Doctor.findById(doctorId);

      if (doctor) {
        if (doctor.phone) {
          await sendWhatsAppMessage(
            doctor.phone,
            `🩺 *New Booking Request Pending*\n\n` +
              `Patient: ${name}\nDate: ${date}\nTime: ${time}\nType: ${bookingType}\n\n` +
              `Please *confirm or reject this booking within 20 minutes* on your DrBooq dashboard.`
          );
        }

        await sendWhatsAppMessage(
          whatsapp,
          `✅ *Thank you for choosing DrBooq!*\n\n` +
            `Your booking with *Dr. ${doctor.fullName || "your doctor"}* is *pending verification.*\n` +
            `If not confirmed within *30 minutes*, you'll get a *refund automatically.*`
        );
      }
    } catch (notifyErr) {
      console.error("⚠️ WhatsApp message sending failed:", notifyErr.message);
    }

    // ✅ 4. Auto-refund timer (shorten for testing: 3 min)
    setTimeout(async () => {
      try {
        const bookingCheck = await Booking.findById(newBooking._id);
        if (bookingCheck && bookingCheck.status === "pending") {
          console.log("⏱ Booking still pending — auto refunding...");

          try {
            await razorpay.payments.refund(razorpay_payment_id, {
              amount: amountPaid * 100,
            });
            console.log("✅ Refund initiated successfully (test mode).");
          } catch (refundErr) {
            console.error("⚠️ Refund failed:", refundErr.message);
          }

          bookingCheck.status = "cancelled";
          await bookingCheck.save();
        }
      } catch (timerErr) {
        console.error("⏰ Auto refund checck failed:", timerErr.message);
      }
    }, 3 * 60 * 1000); // ⏳ 3 min for local testing

    res.json({
      success: true,
      message: "Payment verified & booking saved",
      booking: newBooking,
    });
  } catch (err) {
    console.error("❌ [VerifyPayment] Error:", err.message);
    res.status(500).json({ success: false, message: "Payment verification failed", error: err.message });
  }
};

/* ---------------- STAFF PAYMENT HISTORY ---------------- */
export const getPaymentHistory = async (req, res) => {
  try {
    const staffId = req.user.id;
    const doctors = await Doctor.find({ staffId }).select("_id fullName");
    const doctorIds = doctors.map((d) => d._id);

    const bookings = await Booking.find({ doctorId: { $in: doctorIds } })
      .populate("doctorId", "fullName")
      .lean();

    const payments = bookings.map((b) => ({
      id: b._id,
      transactionId: b.paymentId,
      doctorName: b.doctorId?.fullName || "Unknown",
      patientName: b.name,
      amount: b.amountPaid,
      status: b.status,
      date: b.createdAt,
    }));

    res.status(200).json(payments);
  } catch (err) {
    console.error("❌ [PaymentHistory] Error:", err.message);
    res.status(500).json({ message: "Server error while fetching payments" });
  }
};

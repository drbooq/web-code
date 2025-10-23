import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  start: String,
  end: String,
});

const availabilitySchema = new mongoose.Schema({
  day: String,
  available: Boolean,
  timeSlots: [timeSlotSchema],
});

const educationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  year: String,
});

/* 🏦 New Bank Schema for Razorpay payouts */
const bankDetailsSchema = new mongoose.Schema({
  accountHolderName: { type: String },
  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  razorpayAccountId: { type: String }, // Created via Razorpay API
});

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    fee: { type: Number, required: true },
    languages: [String],

    // ✅ Hospital linkage (optional for online-only doctors)
    hospital: String, // old plain-text hospital
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: false,
    },

    state: String,
    district: String,
    onlineConsultation: { type: Boolean, default: false },
    visibility: { type: Boolean, default: true },

    // ✅ Approval Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: String,

    // ✅ Doctor License
    license: { type: String, required: true, index: true },

    // ✅ Education & Services
    education: [educationSchema],
    services: [String],
    bio: String,
    photo: String, // base64 image

    // ✅ Availability Schedule
    availability: [availabilitySchema],

    // ✅ Linked Staff (creator)
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    /* 🏦 NEW: Bank + Razorpay Payout Info */
    bankDetails: bankDetailsSchema,

    /* 💸 Optional: track last payout / commission details */
    commissionRate: { type: Number, default: 9 }, // 9% default
    lastPayoutDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);

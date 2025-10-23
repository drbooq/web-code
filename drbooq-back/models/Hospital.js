// import mongoose from "mongoose"; 

// const hospitalSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   registrationNumber: { type: String, required: true, unique: true },
//   state: String,
//   district: String,
//   road: String,
//   pincode: String,
//   whatsapp: String,
//   emergency: String,
//   about: String,
//   facilities: [String],
//   specialties: [String],
//   certifications: [String],
//   images: [String],
//   logo: String,
//   location: String,
//   established: String,

//   // Relation fields
//   staffEmail: String,
//   staffPhone: String,

//   // Admin review status
//   status: { type: String, default: "pending" },
//   rejectedBy: String,
//   rejectionReason: String,
//   rejectedAt: Date,

//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Hospital", hospitalSchema);
// models/Hospital.js
 import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  state: String,
  district: String,
  road: String,
  pincode: String,
  whatsapp: String,
  emergency: String,
  about: String,
  facilities: [String],
  specialties: [String],
  certifications: [String],
  images: [String],
  logo: String,
  location: String,
  established: String,

  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  staffEmail: String,
  staffPhone: String,

  // ✅ NEW FIELD: controls live visibility for this hospital and its doctors
  masterVisibility: { type: Boolean, default: true },

  status: { type: String, default: "pending" },
  rejectedBy: String,
  rejectionReason: String,
  rejectedAt: Date,
  createdAt: { type: Date, default: Date.now },
});


const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;

// src/pages/AddHospital.jsx - FIXED: Reset status when updating rejected hospital
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building2, MapPin, Phone, Calendar, Award, Image as ImageIcon, Link2, X, Plus } from "lucide-react";
import indiaData from "../data/indiaStatesDistricts.json";
import specializationsData from "../data/specializations.js";

const THEME = {
  primary: "#0071BC",
  dark: "#003057",
  light: "#E6F3FA",
  text: "#4A4A4A",
  bg: "#FFFFFF",
};

export default function AddHospital() {
  const navigate = useNavigate();
  const location = useLocation();

  const staff = JSON.parse(localStorage.getItem("staff") || "{}");
  const hospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");

  // ✅ Detect edit hospital from location.state
  let editHospital = null;
  if (location.state?.hospital) {
    editHospital = location.state.hospital;
  } else if (location.state?.isEdit && location.state?.index !== undefined) {
    editHospital = hospitals[location.state.index];
  }

  const [hospital, setHospital] = useState(() => {
    if (editHospital) {
      return {
        ...editHospital,
        facilities: editHospital.facilities || [],
        specialties: editHospital.specialties || [],
        certifications: editHospital.certifications?.length ? editHospital.certifications : [""],
        images: editHospital.images || [],
        logo: editHospital.logo || "",
        location: editHospital.location || "",
        established: editHospital.established || "",
      };
    }
    return {
      name: "",
      type: "",
      registrationNumber: "",
      state: "",
      district: "",
      road: "",
      pincode: "",
      whatsapp: "",
      emergency: "",
      about: "",
      facilities: [],
      specialties: [],
      certifications: [""],
      images: [],
      logo: "",
      location: "",
      established: "",
    };
  });

  /* ✅ ALL HANDLERS */
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setHospital((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (hospital.images.length >= 3) {
      alert("⚠️ You can upload a maximum of 3 images. Please remove one first.");
      return;
    }
    const allowedFiles = files.slice(0, 3 - hospital.images.length);
    allowedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHospital((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setHospital((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleFacilitySelect = (e) => {
    const value = e.target.value;
    if (value && !hospital.facilities.includes(value)) {
      setHospital({ ...hospital, facilities: [...hospital.facilities, value] });
    }
  };

  const handleRemoveFacility = (facility) => {
    setHospital({
      ...hospital,
      facilities: hospital.facilities.filter((f) => f !== facility),
    });
  };

  const handleSpecialtyChange = (e) => {
    const v = e.target.value;
    if (v && !hospital.specialties.includes(v)) {
      setHospital({ ...hospital, specialties: [...hospital.specialties, v] });
    }
  };

  const handleRemoveSpecialty = (spec) => {
    setHospital({
      ...hospital,
      specialties: hospital.specialties.filter((s) => s !== spec),
    });
  };

  const handleAddCertification = () => {
    setHospital({ ...hospital, certifications: [...hospital.certifications, ""] });
  };

  const handleCertificationChange = (i, v) => {
    const updated = [...hospital.certifications];
    updated[i] = v;
    setHospital({ ...hospital, certifications: updated });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // ✅ get JWT token
  if (!token) {
    alert("⚠️ Login required. Please sign in again.");
    navigate("/staff-signup");
    return;
  }

  try {
    const payload = {
      ...hospital,
      images: hospital.images.slice(0, 3),
      logo: hospital.logo || "",
      location: hospital.location?.trim() || "",
      whatsapp: staff.whatsapp || staff.phone,
      staffPhone: staff.whatsapp || staff.phone,
      // ✅ no need to send staffId or email — backend links automatically using JWT
    };

    // ✅ EDIT EXISTING HOSPITAL
    if (editHospital && editHospital._id) {
      const response = await fetch(
        `http://localhost:5000/api/hospitals/update/${editHospital._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ secure request
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        alert(`❌ ${result.message || "Failed to update hospital."}`);
        return;
      }

      alert("✅ Hospital updated successfully. Awaiting re-verification.");
      navigate("/staff-dashboard");
      return;
    }

    // ✅ ADD NEW HOSPITAL (staff-linked)
    const response = await fetch("http://localhost:5000/api/hospitals/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ secure request
      },
      body: JSON.stringify({ ...payload, status: "pending" }),
    });

    const result = await response.json();
    if (!response.ok) {
      alert(`❌ ${result.message || "Failed to add hospital."}`);
      return;
    }

    alert("✅ Hospital submitted successfully. Awaiting admin verification.");
    navigate("/staff-dashboard");
  } catch (error) {
    console.error("Error submitting hospital:", error);
    alert("⚠️ Server error. Please try again later.");
  }
};


  /* Dropdown Options */
  const hospitalTypes = [
    "Multi-specialty",
    "Super-specialty",
    "Clinic",
    "Nursing Home",
    "Diagnostic Center",
    "Private Practice",
  ];

  const states = indiaData.states ? indiaData.states.map((item) => item.state) : [];
  const districts = hospital.state
    ? indiaData.states.find((s) => s.state === hospital.state)?.districts || []
    : [];

  const facilitiesList = [
    "Emergency Care",
    "ICU & Critical Care",
    "Pharmacy",
    "Blood Bank",
    "Ambulance Service",
    "Diagnostic Lab",
    "Radiology / Imaging",
    "Cafeteria",
    "Parking Facility",
    "International Patient Services",
    "Internet / Wi-Fi Access",
    "ATM / Banking Facility",
    "Wheelchair Accessibility",
    "24/7 Power Backup",
    "Waiting Lounge / Seating Area",
    "In-Patient Rooms (Private / Shared)",
    "Online Appointment Booking",
    "Pharmacy Inside Hospital",
    "Medical Records Digitization",
    "Children's Play Area",
    "Telemedicine / Video Consultation",
    "Nurse Call System",
    "CCTV Surveillance",
    "Security Services",
    "Fire Safety & Emergency Exits",
    "Canteen / Food Court",
    "Drinking Water Facility",
    "Public Restrooms",
    "Prayer / Meditation Room",
    "Rehabilitation & Physiotherapy Unit",
    "Counseling & Mental Health Support",
    "COVID-19 Testing / Vaccination Facility",
  ];

  const specialtiesList = specializationsData.map((s) => s.title);
useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser.role || currentUser.role !== "staff") {
    alert("Access denied! This page is for staff members only.");
    navigate("/");
  }
}, [navigate]);
  /* UI */
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${THEME.light} 0%, #B3E0F7 100%)`,
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "16px",
          border: `1px solid ${THEME.light}`
        }} className="sm:p-8 sm:mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: THEME.dark }}>
                {editHospital ? "Edit Hospital / Clinic" : "Register Hospital / Clinic"}
              </h1>
              <p className="mt-2 text-sm sm:text-base" style={{ color: THEME.text }}>
                {editHospital ? "Update your hospital information" : "Add your healthcare facility to DRBOOQ"}
              </p>
            </div>
            <button
              onClick={() => navigate("/staff-dashboard")}
              style={{ border: `1px solid ${THEME.primary}`, color: THEME.primary }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-white/50 transition text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          
          {/* Basic Information */}
          <SectionCard title="Basic Information" icon={<Building2 className="w-5 h-5" />}>
            <div className="space-y-4">
              <InputField
                label="Hospital / Clinic Name"
                name="name"
                value={hospital.name}
                onChange={handleChange}
                placeholder="e.g. Apollo Hospitals"
                required
              />

              <SelectField
                label="Hospital Type"
                name="type"
                value={hospital.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {hospitalTypes.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </SelectField>

              <InputField
                label="Registration / License Number"
                name="registrationNumber"
                value={hospital.registrationNumber}
                onChange={handleChange}
                placeholder="e.g. REG-2024-12345"
                required
                readOnly={!!editHospital}
                hint={editHospital ? "🔒 License number cannot be changed" : ""}
              />

              <InputField
                label="Established Year"
                name="established"
                type="number"
                value={hospital.established}
                onChange={handleChange}
                placeholder="e.g. 1985"
                min="1800"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </SectionCard>

          {/* Logo Upload */}
          <SectionCard title="Hospital Logo (Optional)" icon={<ImageIcon className="w-5 h-5" />}>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
              />
              {hospital.logo && (
                <div className="relative inline-block">
                  <img
                    src={hospital.logo}
                    alt="Hospital Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border-2"
                    style={{ borderColor: THEME.light }}
                  />
                  <button
                    type="button"
                    onClick={() => setHospital({ ...hospital, logo: "" })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Location Details */}
          <SectionCard title="Location Details" icon={<MapPin className="w-5 h-5" />}>
            <div className="space-y-4">
              <SelectField
                label="State"
                name="state"
                value={hospital.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </SelectField>

              <SelectField
                label="District"
                name="district"
                value={hospital.district}
                onChange={handleChange}
                disabled={!hospital.state}
                required
              >
                <option value="">{hospital.state ? "Select District" : "Select State First"}</option>
                {districts.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </SelectField>

              <InputField
                label="Road / Area"
                name="road"
                value={hospital.road}
                onChange={handleChange}
                placeholder="e.g. MG Road, Sector 5"
                required
              />

              <InputField
                label="Pincode"
                name="pincode"
                type="number"
                value={hospital.pincode}
                onChange={handleChange}
                placeholder="e.g. 560001"
                required
              />

              <InputField
                label="Google Maps Link (Optional)"
                name="location"
                value={hospital.location}
                onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
                placeholder="https://maps.app.goo.gl/..."
                icon={<Link2 className="w-4 h-4" />}
                hint="Paste Google Maps share link for easy navigation"
              />
            </div>
          </SectionCard>

          {/* Contact & Emergency */}
          <SectionCard title="Contact & Emergency" icon={<Phone className="w-5 h-5" />}>
            <div className="space-y-4">
              <InputField
                label="WhatsApp Number"
                name="whatsapp"
                value={staff.whatsapp || staff.phone || ""}
                readOnly
                hint="Linked to your staff account"
                icon={<Phone className="w-4 h-4" />}
              />

              <SelectField
                label="Emergency Services"
                name="emergency"
                value={hospital.emergency}
                onChange={handleChange}
                required
              >
                <option value="">Select Emergency Availability</option>
                <option value="24/7">24/7 Emergency Services</option>
                <option value="Daytime Only">Daytime Only (8 AM – 8 PM)</option>
                <option value="Night Emergency Only">Night Emergency Only</option>
                <option value="Not Available">Not Available</option>
              </SelectField>
            </div>
          </SectionCard>

          {/* About */}
          <SectionCard title="About Hospital" icon={<Building2 className="w-5 h-5" />}>
            <textarea
              name="about"
              value={hospital.about}
              onChange={handleChange}
              placeholder="e.g. Apollo Hospitals is a leading multi-specialty healthcare provider..."
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              rows="4"
              required
            />
          </SectionCard>

          {/* Facilities */}
          <SectionCard title="Hospital Facilities" icon={<Award className="w-5 h-5" />}>
            <select
              onChange={handleFacilitySelect}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3 text-sm sm:text-base"
            >
              <option value="">Select facilities to add</option>
              {facilitiesList.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {hospital.facilities.map((f, i) => (
                <span
                  key={i}
                  className="bg-green-50 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 border border-green-200"
                >
                  <span className="truncate max-w-[200px]">{f}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFacility(f)}
                    className="text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Specialties */}
          <SectionCard title="Departments & Specialties" icon={<Award className="w-5 h-5" />}>
            <select
              onChange={handleSpecialtyChange}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3 text-sm sm:text-base"
            >
              <option value="">Select specialties to add</option>
              {specialtiesList.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {hospital.specialties.map((s, i) => (
                <span
                  key={i}
                  style={{ background: THEME.light, color: THEME.primary, borderColor: "#B3E0F7" }}
                  className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 border"
                >
                  <span className="truncate max-w-[200px]">{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(s)}
                    className="text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Certifications */}
          <SectionCard title="Accreditations & Certifications (Optional)" icon={<Award className="w-5 h-5" />}>
            <div className="space-y-3">
              {hospital.certifications.map((c, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`e.g. ${["ISO 9001:2015", "NABH Certified", "JCI Accredited"][i % 3]}`}
                  value={c}
                  onChange={(e) => handleCertificationChange(i, e.target.value)}
                  style={{ border: `1px solid ${THEME.light}` }}
                  className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              ))}
              <button
                type="button"
                onClick={handleAddCertification}
                style={{ color: THEME.primary }}
                className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Another Certification
              </button>
            </div>
          </SectionCard>

          {/* Hospital Images */}
          <SectionCard title="Hospital Images (Max 3)" icon={<ImageIcon className="w-5 h-5" />}>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
              />
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {hospital.images?.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt={`Hospital ${i + 1}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border-2"
                      style={{ borderColor: THEME.light }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Submit buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/staff-dashboard")}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ background: THEME.primary }}
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition text-sm sm:text-base order-1 sm:order-2"
            >
              {editHospital ? "Update Hospital" : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Section Card Component */
function SectionCard({ title, icon, children }) {
  return (
    <div style={{ background: THEME.bg, border: `1px solid ${THEME.light}`, borderRadius: "12px" }} className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div style={{ color: THEME.primary }}>{icon}</div>
        <h2 className="text-base sm:text-lg font-semibold" style={{ color: THEME.dark }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* Input Field Component */
function InputField({ label, name, value, onChange, placeholder, icon, required, readOnly, type = "text", hint, min, max }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: THEME.text }}>
        {label} {required && "*"}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: THEME.text }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          min={min}
          max={max}
          style={{
            border: `1px solid ${THEME.light}`,
            paddingLeft: icon ? "40px" : "16px",
            background: readOnly ? "#F9FAFB" : "white"
          }}
          className="w-full py-2.5 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>
      {hint && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

/* Select Field Component */
function SelectField({ label, name, value, onChange, required, disabled, children }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: THEME.text }}>
        {label} {required && "*"}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={{
          border: `1px solid ${THEME.light}`,
          background: disabled ? "#F9FAFB" : "white"
        }}
        className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      >
        {children}
      </select>
    </div>
  );
}
  
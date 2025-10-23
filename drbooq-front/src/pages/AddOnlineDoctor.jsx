  // src/pages/AddOnlineDoctor.jsx - WITH EDUCATION SECTION
  import React, { useEffect, useState } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import { User, Briefcase, Award, DollarSign, Languages, Shield, Video, X, Clock, Plus, Trash2, GraduationCap } from "lucide-react";
  import specializations from "../data/specializations";
  import servicesBySpecialization from "../data/services";
  import languages from "../data/languages";

  const THEME = {
    primary: "#0071BC",
    dark: "#003057",
    light: "#E6F3FA",
    text: "#4A4A4A",
    bg: "#FFFFFF",
  };

  const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ✅ Helper function to convert 24h to 12h AM/PM format
  const formatTime12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // ✅ Convert 12h format to 24h format for storage
  const convertTo24Hour = (hour12, minute, ampm) => {
    let hour = parseInt(hour12);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${minute.padStart(2, '0')}`;
  };

  // ✅ Parse 24h time to 12h components
  const parseTo12Hour = (time24) => {
    if (!time24) return { hour: "8", minute: "00", ampm: "AM" };
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return { hour: hour12.toString(), minute: minutes, ampm };
  };

  export default function AddOnlineDoctor() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const location = useLocation();
    const editing = location.state?.doctor !== undefined;

    const [form, setForm] = useState({
      id: Date.now(),
      fullName: "",
      specialization: "",
      experience: "",
      languages: [],
      fee: "",
      rating: 4.8,
      visibility: true,
      onlineConsultation: true,
      staffPhone: "",
      license: "",
      bio: "",
      services: [],
      photo: null,
      status: "pending",
      education: [{ degree: "", college: "", year: "" }], // ✅ ADDED
      availability: DAYS_OF_WEEK.map(day => ({
        day,
        available: false,
        timeSlots: [{ start: "08:00", end: "20:00" }]
      }))
    });
useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser.role || currentUser.role !== "staff") {
    alert("Access denied! This page is for staff members only.");
    navigate("/");
  }
}, [navigate]);


    useEffect(() => {
      const staff = JSON.parse(localStorage.getItem("staff") || "{}");
      if (staff) {
        setForm((f) => ({ ...f, staffPhone: staff.phone || staff.whatsapp || "" }));
      }
   if (editing) {
  const d = location.state.doctor;
  setForm({
    id: d.id ?? Date.now(),
    fullName: d.fullName || "",
    specialization: d.specialization || "",
    experience: d.experience || "",
    languages: d.languages || [],
    fee: d.fee || "",
    rating: d.rating || 4.8,
    visibility: d.visibility ?? true,
    onlineConsultation: true,
    staffPhone: d.staffPhone || "",
    license: d.license || "",
    bio: d.bio || "",
    services: d.services || [],
    photo: d.photo || null,
    status: d.status || "pending",
    education: d.education || [{ degree: "", college: "", year: "" }],
    availability: d.availability || DAYS_OF_WEEK.map(day => ({
      day,
      available: false,
      timeSlots: [{ start: "08:00", end: "20:00" }],
    })),

    // ✅ Prefill bank details if editing
    bankAccountName: d.bankDetails?.accountHolderName || "",
    bankName: d.bankDetails?.bankName || "",
    accountNumber: d.bankDetails?.accountNumber || "",
    ifscCode: d.bankDetails?.ifscCode || "",
  });
}

    }, [editing, location]);

    const handleChange = (key, value) => {
      setForm((f) => ({ ...f, [key]: value }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((f) => ({ ...f, photo: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };

    const handleServiceSelect = (e) => {
      const v = e.target.value;
      if (v && !form.services.includes(v)) {
        setForm((f) => ({ ...f, services: [...f.services, v] }));
      }
    };

    const handleRemoveService = (service) => {
      setForm((f) => ({
        ...f,
        services: f.services.filter((s) => s !== service),
      }));
    };

    // ✅ ADDED: Education handlers
    const handleEducationChange = (index, field, value) => {
      const updated = [...form.education];
      updated[index][field] = value;
      setForm({ ...form, education: updated });
    };

    const addEducation = () => {
      setForm({
        ...form,
        education: [...form.education, { degree: "", college: "", year: "" }],
      });
    };

    const handleAvailabilityToggle = (dayIndex) => {
      const updated = [...form.availability];
      updated[dayIndex].available = !updated[dayIndex].available;
      setForm((f) => ({ ...f, availability: updated }));
    };

    const handleTimeSlotChange = (dayIndex, slotIndex, field, value) => {
      const updated = [...form.availability];
      updated[dayIndex].timeSlots[slotIndex][field] = value;
      setForm((f) => ({ ...f, availability: updated }));
    };

    const handleAddTimeSlot = (dayIndex) => {
      const updated = [...form.availability];
      if (updated[dayIndex].timeSlots.length < 3) {
        updated[dayIndex].timeSlots.push({ start: "14:00", end: "18:00" });
        setForm((f) => ({ ...f, availability: updated }));
      }
    };

    const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
      const updated = [...form.availability];
      if (updated[dayIndex].timeSlots.length > 1) {
        updated[dayIndex].timeSlots.splice(slotIndex, 1);
        setForm((f) => ({ ...f, availability: updated }));
      }
    };
const handleSubmit = async (e) => {
  e.preventDefault();

  /* -------------------------------
     ✅ 1. Validate Availability
  --------------------------------*/
  const hasAvailability = form.availability.some((day) => day.available);
  if (!hasAvailability) {
    return alert("⚠️ Please select at least one available day for consultations.");
  }

  for (const day of form.availability) {
    if (day.available) {
      for (const slot of day.timeSlots) {
        if (slot.start >= slot.end) {
          return alert(`⚠️ Invalid time range for ${day.day}.`);
        }
      }
    }
  }

  /* -------------------------------
     ✅ 2. Validate Bank Details
  --------------------------------*/
  const missingBankFields = !form.bankAccountName || !form.bankName || !form.accountNumber || !form.ifscCode;

  if (missingBankFields) {
    return alert(
      "⚠️ Please fill all bank details correctly.\n" +
      "These are required for receiving payments from your online consultations."
    );
  }

  /* -------------------------------
     ✅ 3. Prepare Request
  --------------------------------*/
  const url = editing
    ? `http://localhost:5000/api/doctors/update/${location.state.doctor._id}`
    : "http://localhost:5000/api/doctors/add";
  const method = editing ? "PUT" : "POST";

  // 🧩 Construct doctor object including bankDetails
  const doctorData = {
    ...form,
    onlineConsultation: true,
    bankDetails: {
      accountHolderName: form.bankAccountName,
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      ifscCode: form.ifscCode,
    },
  };

  /* -------------------------------
     ✅ 4. Submit to Backend
  --------------------------------*/
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doctorData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(
        editing
          ? "✅ Doctor details updated successfully.\nBank details are now verified and locked for security."
          : "✅ Doctor added successfully.\nAwaiting admin approval before going live."
      );
      navigate("/staff-dashboard");
    } else {
      alert(`❌ ${data.message || "Something went wrong while saving the doctor details."}`);
    }
  } catch (err) {
    console.error("Doctor submit error:", err);
    alert("❌ Error occurred: " + err.message);
  }
};




    return (
      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>

<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)`,
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #10B981"
          }} className="sm:p-6 sm:rounded-xl sm:mb-6">
            <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold" style={{ color: THEME.dark }}>
                  {editing ? "Edit Online Doctor" : "Add Online Doctor"}
                </h1>
                <p className="mt-1 text-xs sm:text-sm" style={{ color: THEME.text }}>
                  {editing ? "Update doctor details" : "Add doctor for video consultations"}
                </p>
              </div>
              <button
                onClick={() => navigate("/staff-dashboard")}
                style={{ border: "1px solid #10B981", color: "#10B981" }}
                className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/50 transition text-xs sm:text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>

<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
            
            {/* Basic Information */}
            <SectionCard title="Basic Information" icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="grid grid-cols-1 gap-3">
                <InputField
                  label="Doctor's Full Name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="e.g. Dr. Priya Sharma"
                  icon={<User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  required
                />
                <SelectField
                  label="Specialization"
                  value={form.specialization}
                  onChange={(e) => handleChange("specialization", e.target.value)}
                  icon={<Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((s, i) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </SelectField>
                <InputField
                  label="Years of Experience"
                  value={form.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  placeholder="e.g. 12"
                  icon={<Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  required
                />
                
                {/* Fee with Commission */}
                {/* Fee with Commission */}
<div>
  <label className="block text-[11px] sm:text-sm font-medium mb-1.5" style={{ color: THEME.text }}>
    Consultation Fee (₹) *
  </label>
  <div className="relative">
    <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2" style={{ color: THEME.text }}>
      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </div>
    <input
      type="number"
      value={form.fee}
      onChange={(e) => handleChange("fee", e.target.value)}
      placeholder="e.g. 300"
      required
      min="50"
      style={{
        border: `1px solid ${THEME.light}`,
        paddingLeft: "32px"
      }}
      className="w-full py-2 pr-3 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
    />
  </div>

  {form.fee && parseInt(form.fee) > 0 && (
    (() => {
      const fee = parseFloat(form.fee);
      const commission = fee * 0.12; // ✅ 12% commission
      const payout = Math.max(0, fee - commission);

      return (
        <div className="mt-2 bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-2 sm:p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-3 h-3 text-blue-600" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-800">Fee Breakdown</p>
          </div>

          <div className="space-y-1 text-[10px] sm:text-xs">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-700">Patient Pays:</span>
              <span className="font-bold text-gray-900">₹{fee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-0.5 bg-red-50 -mx-1 px-1 rounded">
              <span className="text-red-700 font-medium">DRBOOQ Service (12%):</span>
              <span className="font-bold text-red-700">- ₹{commission.toFixed(2)}</span>
            </div>

            <div className="border-t border-gray-300 pt-1 mt-1 flex justify-between items-center">
              <span className="text-gray-900 font-bold text-[11px] sm:text-sm">You Receive:</span>
              <span className="font-bold text-green-700 text-sm sm:text-base">
                ₹{payout.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-1.5 pt-1.5 border-t border-blue-200">
            <p className="text-[9px] sm:text-[10px] text-blue-700 leading-snug">
              💡 12% service fee is charged for platform & video services.
            </p>
          </div>
        </div>
      );
    })()
  )}
</div>

              </div>
            </SectionCard>

            {/* Languages */}
          {/* Languages */}
{/* Languages */}
<SectionCard
  title="Languages Spoken"
  icon={<Languages className="w-5 h-5" />}
>
  <label
    className="block text-xs sm:text-sm font-medium mb-2"
    style={{ color: THEME.text }}
  >
    Select up to 5 languages *
  </label>

  {/* Dropdown */}
  <div className="relative">
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          showLangDropdown: !prev.showLangDropdown,
        }))
      }
      className="w-full flex justify-between items-center px-4 py-2.5 sm:py-3 rounded-lg border border-green-300 bg-white text-sm sm:text-base focus:ring-2 focus:ring-green-500"
      style={{
        border: `1px solid ${THEME.light}`,
      }}
    >
      <span className="text-gray-700">
        {form.languages.length > 0
          ? form.languages.join(", ")
          : "Select Languages"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 text-green-600 transform transition-transform ${
          form.showLangDropdown ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {/* Dropdown Menu */}
    {form.showLangDropdown && (
      <div className="absolute mt-1 w-full bg-white border border-green-200 rounded-lg shadow-lg max-h-56 overflow-y-auto z-50">
        {languages.map((lang, i) => {
          const isSelected = form.languages.includes(lang);
          const isDisabled =
            !isSelected && form.languages.length >= 5;

          return (
            <div
              key={i}
              onClick={() => {
                if (isSelected) {
                  handleChange(
                    "languages",
                    form.languages.filter((l) => l !== lang)
                  );
                } else if (!isDisabled) {
                  handleChange("languages", [
                    ...form.languages,
                    lang,
                  ]);
                }
              }}
              className={`px-4 py-2 sm:py-2.5 cursor-pointer flex justify-between items-center text-sm sm:text-base transition ${
                isSelected
                  ? "bg-green-100 text-green-700 font-semibold"
                  : isDisabled
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:bg-green-50 text-gray-700"
              }`}
            >
              <span>{lang}</span>
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>

  {/* Selected Chips */}
  {form.languages.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-3">
      {form.languages.map((lang, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold"
        >
          {lang}
          <button
            type="button"
            onClick={() =>
              handleChange(
                "languages",
                form.languages.filter((l) => l !== lang)
              )
            }
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </span>
      ))}
    </div>
  )}

  {/* Warning */}
  {form.languages.length >= 5 && (
    <p className="text-xs sm:text-sm text-red-600 mt-2">
      ⚠️ You’ve selected the maximum of 5 languages.
    </p>
  )}
</SectionCard>


            {/* ✅ EDUCATION SECTION - ADDED */}
            <SectionCard title="Education & Qualifications" icon={<GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />}>
              {form.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 gap-2 sm:gap-3 mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      Qualification {i + 1}
                    </span>
                    {form.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = form.education.filter((_, idx) => idx !== i);
                          setForm({ ...form, education: updated });
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    placeholder="e.g. MBBS"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="e.g. AIIMS Delhi"
                    value={edu.college}
                    onChange={(e) => handleEducationChange(i, "college", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="e.g. 2015"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(i, "year", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
                    required
                  />
                </div>
              ))}
              
              <button
                type="button"
                onClick={addEducation}
                className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                style={{ color: "#10B981" }}
              >
                <Plus className="w-4 h-4" />
                Add Another Degree
              </button>
            </SectionCard>

            {/* Available Times */}
            <SectionCard title="Available Times" icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                <p className="text-[10px] sm:text-xs text-blue-700 leading-snug">
                  💡 Add up to 3 time slots per day (12-hour format)
                </p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {form.availability.map((dayData, dayIndex) => (
                  <div
                    key={dayData.day}
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: dayData.available ? "#10B981" : THEME.light, background: dayData.available ? "#F0FDF4" : "white" }}
                  >
                    <div className="p-2 sm:p-3">
                      <div className="flex items-center justify-between flex-wrap gap-1.5">
                        <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer min-w-[100px]">
                          <input
                            type="checkbox"
                            checked={dayData.available}
                            onChange={() => handleAvailabilityToggle(dayIndex)}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="font-semibold text-sm sm:text-base" style={{ color: dayData.available ? "#10B981" : THEME.text }}>
                            {dayData.day}
                          </span>
                        </label>

                        <div className="flex items-center gap-1 flex-wrap justify-end flex-1">
                          {dayData.available ? (
                            <>
                              <div className="flex flex-wrap gap-1 items-center justify-end">
                                {dayData.timeSlots.map((slot, slotIndex) => (
                                  <span
                                    key={slotIndex}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap"
                                    style={{ background: "#D1FAE5", color: "#059669" }}
                                  >
                                    {formatTime12Hour(slot.start)} - {formatTime12Hour(slot.end)}
                                  </span>
                                ))}
                                
                                {dayData.timeSlots.length < 3 && (
                                  <button
                                    type="button"
                                    onClick={() => handleAddTimeSlot(dayIndex)}
                                    className="flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-600 text-white rounded text-[10px] sm:text-xs font-medium whitespace-nowrap"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add</span>
                                  </button>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Not available</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {dayData.available && (
                      <div className="px-2 sm:px-3 pb-2 sm:pb-3 space-y-1.5 border-t" style={{ borderColor: "#D1FAE5" }}>
                        <p className="text-[9px] sm:text-[10px] text-gray-600 font-medium mt-1.5 mb-1">Edit Slots:</p>
                        {dayData.timeSlots.map((slot, slotIndex) => (
                          <TimeSlotEditorUltraCompact
                            key={slotIndex}
                            slotIndex={slotIndex}
                            slot={slot}
                            dayIndex={dayIndex}
                            onTimeChange={handleTimeSlotChange}
                            onRemove={handleRemoveTimeSlot}
                            canRemove={dayData.timeSlots.length > 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-[10px] sm:text-xs text-yellow-800 leading-snug">
                  ⚠️ Patients see slots based on these settings
                </p>
              </div>
            </SectionCard>

            {/* Services */}
            <SectionCard title="Services Offered" icon={<Video className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <select
                onChange={handleServiceSelect}
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 mb-2 text-xs sm:text-sm"
              >
                <option value="">Select services to add</option>
                {(servicesBySpecialization[form.specialization] || []).map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              <div className="flex flex-wrap gap-1.5">
                {form.services.map((s, i) => (
                  <span
                    key={i}
                    style={{ background: "#D1FAE5", color: "#10B981" }}
                    className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1"
                  >
                    {s}
                    <button type="button" onClick={() => handleRemoveService(s)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* About */}
            <SectionCard title="About Doctor" icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="e.g. Dr. Priya Sharma specializes in online consultations..."
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm leading-relaxed"
                rows="3"
                required
              />
            </SectionCard>

            {/* Credentials */}
            <SectionCard title="Credentials" icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[11px] sm:text-sm font-medium mb-1.5" style={{ color: THEME.text }}>
                    Medical License Number *
                  </label>
                  <input
                    type="text"
                    value={form.license}
                    onChange={(e) => handleChange("license", e.target.value)}
                    placeholder="e.g. MCI-87654321"
                    readOnly={editing}
                    style={{ border: `1px solid ${THEME.light}`, background: editing ? "#F9FAFB" : "white" }}
                    className="w-full px-2.5 sm:px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
                    required
                  />
                  {editing && (
                    <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">
                      🔒 Cannot be changed after creation
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-sm font-medium mb-1.5" style={{ color: THEME.text }}>
                    Profile Photo *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="w-full px-2.5 sm:px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-green-500 text-[10px] sm:text-xs"
                  />
                </div>
              </div>

              {form.photo && (
                <div className="mt-2">
                  <img src={form.photo} alt="Preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2" style={{ borderColor: "#10B981" }} />
                </div>
              )}
            </SectionCard>
 {/* 🏦 Bank Account Details (For Payouts) */}
<SectionCard
  title="Bank Account Details (For Payouts)"
  icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
>
  <p className="text-xs sm:text-sm text-gray-600 mb-3 bg-blue-50 border border-blue-200 rounded-lg p-2">
    💰 <b>Note:</b> Bank details are used only for payments from online consultations.  
    Once submitted, they cannot be changed later for security reasons.
  </p>

  <InputField
    label="Account Holder Name"
    value={form.bankAccountName || ""}
    onChange={(e) => handleChange("bankAccountName", e.target.value)}
    placeholder="e.g. Dr. Priya Sharma"
    required
    readOnly={editing && !!form.bankAccountName} // 🔒 locked if already exists
  />

  <InputField
    label="Bank Name"
    value={form.bankName || ""}
    onChange={(e) => handleChange("bankName", e.target.value)}
    placeholder="e.g. HDFC Bank"
    required
    readOnly={editing && !!form.bankName} // 🔒 locked
  />

  <InputField
    label="Account Number"
    value={form.accountNumber || ""}
    onChange={(e) => handleChange("accountNumber", e.target.value)}
    placeholder="e.g. 123456789012"
    required
    readOnly={editing && !!form.accountNumber} // 🔒 locked
  />

  <InputField
    label="IFSC Code"
    value={form.ifscCode || ""}
    onChange={(e) => handleChange("ifscCode", e.target.value)}
    placeholder="e.g. HDFC0001234"
    required
    readOnly={editing && !!form.ifscCode} // 🔒 locked
  />

  {/* 🧠 Info Note */}
{editing && !!form.bankAccountName && (
  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
    ⚠️ Bank details are already verified and cannot be edited.<br />
    If you wish to update them, please <b>delete this profile</b> and add a new one.
  </div>
)}

</SectionCard>


            {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
  {/* Cancel Button - lighter, smaller border */}
  <button
    type="button"
    onClick={() => navigate("/staff-dashboard")}
    style={{
      border: "1px solid #D1D5DB", // subtle gray border
      color: "#374151", // gray-700 text
      background: "white",
    }}
    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-gray-50 transition order-2 sm:order-1"
  >
    Cancel
  </button>

  {/* Primary Button - Add Doctor / Save Changes */}
  <button
    type="submit"
    style={{
      background: "linear-gradient(135deg, #34D399 0%, #059669 100%)", // soft green gradient
      boxShadow: "0 2px 6px rgba(16,185,129,0.3)",
    }}
    className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base hover:opacity-90 transition order-1 sm:order-2"
  >
    {editing ? "Save Changes" : "Add Doctor"}
  </button>
</div>

          </form>
        </div>
      </div>
    );
  }

  /* Time Slot Editor */
  function TimeSlotEditorUltraCompact({ slotIndex, slot, dayIndex, onTimeChange, onRemove, canRemove }) {
    const startTime = parseTo12Hour(slot.start);
    const endTime = parseTo12Hour(slot.end);

    const handleStartChange = (field, value) => {
      const current = parseTo12Hour(slot.start);
      if (field === "hour") current.hour = value;
      if (field === "minute") current.minute = value;
      if (field === "ampm") current.ampm = value;
      const time24 = convertTo24Hour(current.hour, current.minute, current.ampm);
      onTimeChange(dayIndex, slotIndex, "start", time24);
    };

    const handleEndChange = (field, value) => {
      const current = parseTo12Hour(slot.end);
      if (field === "hour") current.hour = value;
      if (field === "minute") current.minute = value;
      if (field === "ampm") current.ampm = value;
      const time24 = convertTo24Hour(current.hour, current.minute, current.ampm);
      onTimeChange(dayIndex, slotIndex, "end", time24);
    };

    return (
      <div className="bg-white rounded-md p-1.5 sm:p-2 border border-gray-200">
        <div className="flex items-center justify-between gap-1.5 mb-1">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
            Slot {slotIndex + 1}
          </span>
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(dayIndex, slotIndex)}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition"
              title="Remove"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          <div>
            <label className="text-[9px] sm:text-[10px] text-gray-600 font-medium mb-0.5 block">Start</label>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <select
                value={startTime.hour}
                onChange={(e) => handleStartChange("hour", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-gray-500 text-[10px] font-bold">:</span>
              <select
                value={startTime.minute}
                onChange={(e) => handleStartChange("minute", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs"
              >
                {["00", "15", "30", "45"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={startTime.ampm}
                onChange={(e) => handleStartChange("ampm", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs font-medium"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[9px] sm:text-[10px] text-gray-600 font-medium mb-0.5 block">End</label>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <select
                value={endTime.hour}
                onChange={(e) => handleEndChange("hour", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-gray-500 text-[10px] font-bold">:</span>
              <select
                value={endTime.minute}
                onChange={(e) => handleEndChange("minute", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs"
              >
                {["00", "15", "30", "45"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={endTime.ampm}
                onChange={(e) => handleEndChange("ampm", e.target.value)}
                className="flex-1 px-1 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-green-500 text-[11px] sm:text-xs font-medium"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Section Card */
  function SectionCard({ title, icon, children }) {
    return (
      <div style={{ background: THEME.bg, border: `1px solid ${THEME.light}`, borderRadius: "10px" }} className="p-3 sm:p-5">
        <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
          <div style={{ color: THEME.primary }}>{icon}</div>
          <h2 className="text-sm sm:text-base font-semibold" style={{ color: THEME.dark }}>{title}</h2>
        </div>
        {children}
      </div>
    );
  }

  /* Input Field */
  function InputField({ label, value, onChange, placeholder, icon, required, readOnly, type = "text" }) {
    return (
      <div>
        <label className="block text-[11px] sm:text-sm font-medium mb-1.5" style={{ color: THEME.text }}>
          {label} {required && "*"}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2" style={{ color: THEME.text }}>
              {icon}
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            style={{
              border: `1px solid ${THEME.light}`,
              paddingLeft: icon ? "32px" : "12px",
             background: readOnly ? "#F3F4F6" : "white",
cursor: readOnly ? "not-allowed" : "text",
opacity: readOnly ? 0.85 : 1,

            }}
            className="w-full py-2 pr-3 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
          />
        </div>
      </div>
    );
  }

  /* Select Field */
  function SelectField({ label, value, onChange, icon, required, children }) {
    return (
      <div>
        <label className="block text-[11px] sm:text-sm font-medium mb-1.5 " style={{ color: THEME.text }}>
          {label} {required && "*"}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 " style={{ color: THEME.text }}>
              {icon}
            </div>
          )}
          <select
            value={value}
            onChange={onChange}
            required={required}
            style={{
              border: `1px solid ${THEME.light}`,
              paddingLeft: icon ? "32px" : "12px"
            }}
            className="w-full py-2 pr-3 rounded-lg focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
          >
            {children}
          </select>
        </div>
      </div>
    );
  }

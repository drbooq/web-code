  // src/pages/AddOfflineDoctor.jsx
  import React, { useState, useEffect } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { User, Briefcase, MapPin, GraduationCap, FileText, Plus, X, Calendar, Building2, DollarSign, Award, Clock, Trash2 } from "lucide-react";
  import specializations from "../data/specializations";
  import servicesBySpecialization from "../data/services";
  

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

  export default function AddOfflineDoctor() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const location = useLocation();
    const editing = location.state?.doctor !== undefined;

    const [form, setForm] = useState({
      fullName: "",
      specialization: "",
      state: "",
      district: "",
      hospital: "",
        hospitalId: "", // ✅ Add this line

      experience: "",
      fee: "",
      availability: DAYS_OF_WEEK.map(day => ({
        day,
        available: false,
        timeSlots: [{ start: "08:00", end: "20:00" }]
      })),
      education: [{ degree: "", college: "", year: "" }],
      services: [],
      bio: "",
      license: "",
      photo: null,
    });
const [hospitals, setHospitals] = useState([]);

useEffect(() => {
  async function fetchHospitals() {
    try {
      const res = await fetch("http://localhost:5000/api/hospitals/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setHospitals(data.hospitals || []);
      }
    } catch (err) {
      console.error("Failed to load hospitals:", err);
    }
  }
  fetchHospitals();
}, [token]);

    /* Load Data */
    useEffect(() => {
      if (location.state?.doctor) {
        const d = location.state.doctor;
        setForm({
          ...d,
          availability: d.availability || DAYS_OF_WEEK.map(day => ({
            day,
            available: false,
            timeSlots: [{ start: "08:00", end: "20:00" }]
          }))
        });
      } else {
  const hospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");
  if (hospitals.length > 0) {
    const h = hospitals[hospitals.length - 1];
    setForm((prev) => ({
      ...prev,
            state: h.state,
            district: h.district,
            hospital: h.name,
          }));
        }
      }
    }, [location.state]);

    /* Handlers */
    const handleChange = async (e) => {
      const { name, value, files } = e.target;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, photo: reader.result }));
        };
        reader.readAsDataURL(files[0]);
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    };

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

    const handleServiceSelect = (e) => {
      const v = e.target.value;
      if (v && !form.services.includes(v)) {
        setForm({ ...form, services: [...form.services, v] });
      }
    };

    const handleRemoveService = (service) => {
      setForm({
        ...form,
        services: form.services.filter((s) => s !== service),
      });
    };
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Basic validation: Availability
  const hasAvailability = form.availability.some((day) => day.available);
  if (!hasAvailability)
    return alert("⚠️ Please select at least one available day.");

  for (const day of form.availability) {
    if (day.available) {
      for (const slot of day.timeSlots) {
        if (slot.start >= slot.end) {
          return alert(`⚠️ Invalid time range for ${day.day}.`);
        }
      }
    }
  }

  // ✅ Basic validation: License format
  if (!form.license || form.license.trim().length < 3) {
    return alert("⚠️ Please enter a valid Medical License Number (e.g., MCI-123456).");
  }

  try {
    const url = editing
      ? `http://localhost:5000/api/doctors/update/${location.state.doctor._id}`
      : "http://localhost:5000/api/doctors/add";

    const method = editing ? "PUT" : "POST";
// ✅ Convert 24h format to 12h before sending
const formattedAvailability = form.availability.map((day) => ({
  ...day,
  timeSlots: day.timeSlots.map((slot) => ({
    start: formatTime12Hour(slot.start),
    end: formatTime12Hour(slot.end),
  })),
}));

const payload = {
  ...form,
  license: form.license.trim(),
  onlineConsultation: false,
  availability: formattedAvailability, // ✅ use formatted version
};


    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // ✅ Handle known backend responses
    if (res.ok) {
      alert(
        editing
          ? "✅ Doctor updated successfully."
          : "✅ Doctor added successfully. Awaiting admin approval."
      );
      navigate("/staff-dashboard");
    } else {
      // ✅ Detect duplicate license MongoDB error
      if (
        data.message?.includes("E11000") ||
        data.message?.toLowerCase().includes("duplicate key")
      ) {
        alert("❌ This Medical License Number already exists. Please use a unique one.");
      } else {
        alert(`❌ ${data.message || "Failed to save doctor. Please try again."}`);
      }
    }
  } catch (err) {
    console.error("Doctor submission error:", err);
    alert("⚠️ Server error. Please try again later.");
  }
};

useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser.role || currentUser.role !== "staff") {
    alert("Access denied! This page is for staff members only.");
    navigate("/");
  }
}, [navigate]);
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
                  {editing ? "Edit Doctor Profile" : "Register New Doctor"}
                </h1>
                <p className="mt-2 text-sm sm:text-base" style={{ color: THEME.text }}>
                  {editing ? "Update doctor information and availability" : "Add a new doctor to your hospital"}
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
            <SectionCard title="Basic Information" icon={<User className="w-5 h-5" />}>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Doctor's Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Rajesh Kumar"
                  icon={<User className="w-4 h-4" />}
                  required
                />
                <SelectField
                  label="Specialization"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  icon={<Briefcase className="w-4 h-4" />}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((s, i) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </SelectField>
                <InputField
                  label="Years of Experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  icon={<Award className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Consultation Fee (₹)"
                  name="fee"
                  value={form.fee}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  icon={<DollarSign className="w-4 h-4" />}
                  required
                />
              </div>
            </SectionCard>
            {/* Hospital Selection */}
<SectionCard title="Hospital / Clinic" icon={<Building2 className="w-5 h-5" />}>
  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: THEME.text }}>
    Select Hospital *
  </label>
  <div className="relative">
    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
    <select
      name="hospitalId"
      value={form.hospitalId}
    onChange={(e) => {
  const selected = hospitals.find((h) => h._id === e.target.value);
  setForm((prev) => ({
    ...prev,
    hospitalId: selected?._id || "",
    hospital: selected?.name || "",
    state: selected?.state || "",
    district: selected?.district || "",
  }));
}}

      required
      style={{
        border: `1px solid ${THEME.light}`,
        paddingLeft: "40px",
      }}
      className="w-full py-2.5 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
    >
      <option value="">Select Hospital</option>
      {hospitals.map((h) => (
        <option key={h._id} value={h._id}>
          {h.name}
        </option>
      ))}
    </select>
  </div>
</SectionCard>


            {/* Location */}
          <SectionCard title="Location & Hospital" icon={<MapPin className="w-5 h-5" />}>
  <div className="grid grid-cols-1 gap-4">
    <InputField label="State" name="state" value={form.state} readOnly icon={<MapPin className="w-4 h-4" />} />
    <InputField label="District" name="district" value={form.district} readOnly icon={<MapPin className="w-4 h-4" />} />
    <InputField label="Hospital / Clinic" name="hospital" value={form.hospital} readOnly icon={<Building2 className="w-4 h-4" />} />
  </div>
</SectionCard>


            {/* Weekly Availability */}
            <SectionCard title="Weekly Availability" icon={<Calendar className="w-5 h-5" />}>
              <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-700">
                  💡 <strong>Multiple Time Slots:</strong> Add up to 3 time slots per day
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {form.availability.map((dayData, dayIndex) => (
                  <div
                    key={dayData.day}
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: dayData.available ? "#0071BC" : THEME.light, background: dayData.available ? "#F0F9FF" : "white" }}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[120px]">
                          <input
                            type="checkbox"
                            checked={dayData.available}
                            onChange={() => handleAvailabilityToggle(dayIndex)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="font-semibold text-base sm:text-lg" style={{ color: dayData.available ? THEME.primary : THEME.text }}>
                            {dayData.day}
                          </span>
                        </label>

                        <div className="flex items-center gap-2 flex-wrap justify-end flex-1">
                          {dayData.available ? (
                            <>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-end">
                                {dayData.timeSlots.map((slot, slotIndex) => (
                                  <span
                                    key={slotIndex}
                                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap"
                                    style={{ background: THEME.light, color: THEME.primary }}
                                  >
                                    {formatTime12Hour(slot.start)} - {formatTime12Hour(slot.end)}
                                  </span>
                                ))}
                                
                                {dayData.timeSlots.length < 3 && (
                                  <button
                                    type="button"
                                    onClick={() => handleAddTimeSlot(dayIndex)}
                                    className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-white rounded-lg hover:opacity-90 transition text-xs sm:text-sm font-medium whitespace-nowrap"
                                    style={{ background: THEME.primary }}
                                  >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Add</span>
                                  </button>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-400 font-medium">Not available</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {dayData.available && (
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3 border-t" style={{ borderColor: THEME.light }}>
                        <p className="text-xs text-gray-600 font-medium mt-2 sm:mt-3 mb-1 sm:mb-2">Edit Time Slots:</p>
                        {dayData.timeSlots.map((slot, slotIndex) => (
                          <TimeSlotEditor12HourMobile
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

              <div className="mt-4 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs sm:text-sm text-yellow-800">
                  ⚠️ <strong>Note:</strong> Patients will see available time slots based on these settings
                </p>
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Education & Qualifications" icon={<GraduationCap className="w-5 h-5" />}>
              {form.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="e.g. MBBS"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="e.g. AIIMS Delhi"
                    value={edu.college}
                    onChange={(e) => handleEducationChange(i, "college", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="e.g. 2015"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(i, "year", e.target.value)}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                style={{ color: THEME.primary }}
                className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Another Degree
              </button>
            </SectionCard>

            {/* Services */}
            <SectionCard title="Services Offered" icon={<FileText className="w-5 h-5" />}>
              <select
                onChange={handleServiceSelect}
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3 text-sm sm:text-base"
              >
                <option value="">Select services to add</option>
                {(servicesBySpecialization[form.specialization] || []).map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2">
                {form.services.map((s, i) => (
                  <span
                    key={i}
                    style={{ background: THEME.light, color: THEME.primary }}
                    className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2"
                  >
                    {s}
                    <button type="button" onClick={() => handleRemoveService(s)} className="text-red-500 hover:text-red-700">
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* About */}
            <SectionCard title="About Doctor" icon={<FileText className="w-5 h-5" />}>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="e.g. Dr. Rajesh Kumar is a highly experienced cardiologist with over 10 years of practice..."
                style={{ border: `1px solid ${THEME.light}` }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                rows="4"
                required
              />
            </SectionCard>

            {/* Credentials */}
            <SectionCard title="Credentials" icon={<Award className="w-5 h-5" />}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: THEME.text }}>
                    Medical License Number *
                  </label>
                  <input
                    type="text"
                    name="license"
                    value={form.license}
                    onChange={handleChange}
                    placeholder="e.g. MCI-12345678"
                    readOnly={editing}
                    style={{ border: `1px solid ${THEME.light}`, background: editing ? "#F9FAFB" : "white" }}
                    className="w-full px-3 sm:px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                  {editing && (
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 License number cannot be changed after creation
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: THEME.text }}>
                    Profile Photo *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ border: `1px solid ${THEME.light}` }}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {form.photo && (
                <div className="mt-4">
                  <img src={form.photo} alt="Preview" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2" style={{ borderColor: THEME.light }} />
                </div>
              )}
            </SectionCard>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
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
                {editing ? "Save Changes" : "Register Doctor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* Mobile-Optimized 12-Hour Time Slot Editor */
  function TimeSlotEditor12HourMobile({ slotIndex, slot, dayIndex, onTimeChange, onRemove, canRemove }) {
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
      <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Slot {slotIndex + 1}
          </span>
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(dayIndex, slotIndex)}
              className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              title="Remove this time slot"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          {/* Start Time */}
          <div>
            <label className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1 block">Start Time</label>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <select
                value={startTime.hour}
                onChange={(e) => handleStartChange("hour", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-gray-500 font-bold">:</span>
              <select
                value={startTime.minute}
                onChange={(e) => handleStartChange("minute", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                {["00", "15", "30", "45"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={startTime.ampm}
                onChange={(e) => handleStartChange("ampm", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* End Time */}
          <div>
            <label className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1 block">End Time</label>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <select
                value={endTime.hour}
                onChange={(e) => handleEndChange("hour", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-gray-500 font-bold">:</span>
              <select
                value={endTime.minute}
                onChange={(e) => handleEndChange("minute", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                {["00", "15", "30", "45"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={endTime.ampm}
                onChange={(e) => handleEndChange("ampm", e.target.value)}
                className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium"
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
  function InputField({ label, name, value, onChange, placeholder, icon, required, readOnly, type = "text" }) {
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
            style={{
              border: `1px solid ${THEME.light}`,
              paddingLeft: icon ? "40px" : "16px",
              background: readOnly ? "#F9FAFB" : "white"
            }}
            className="w-full py-2.5 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>
    );
  }

  /* Select Field Component */
  function SelectField({ label, name, value, onChange, icon, required, children }) {
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
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            style={{
              border: `1px solid ${THEME.light}`,
              paddingLeft: icon ? "40px" : "16px"
            }}
            className="w-full py-2.5 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            {children}
          </select>
        </div>
      </div>
    );
  }
// src/pages/StaffDashboard.jsx - Mobile View Improvements
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit, Users, Video, Building2, Phone, MapPin, Trash2, Eye, PlusCircle,
  Home, Search, Mail, Briefcase, Clock, CheckCircle, AlertCircle,
  X, EyeOff, Calendar, Activity, TrendingUp, XCircle, Info, Trash,
  LogOut, Settings, Bell
} from "lucide-react";
import specializations from "../data/specializations";

// Practo-Inspired Theme
const THEME = {
  primary: "#1A73E8",
  secondary: "#5F6368",
  success: "#1E8E3E",
  warning: "#F9AB00",
  danger: "#D93025",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  border: "#DADCE0",
  textPrimary: "#202124",
  textSecondary: "#5F6368",
  lightBg: "#F1F3F4",
};

export default function StaffDashboard() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [onlineSearch, setOnlineSearch] = useState("");
  const [doctorFilterDisease, setDoctorFilterDisease] = useState("");
  const [onlineFilterDisease, setOnlineFilterDisease] = useState("");
  const [masterVisibility, setMasterVisibility] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  
  // NEW: Mobile filter for doctors tab
  const [mobileFilter, setMobileFilter] = useState("all");

  useEffect(() => {
    const savedStaff = localStorage.getItem("staff");
    const token = localStorage.getItem("token");

    if (!savedStaff || !token) {
      window.location.href = "/staff-signup";
      return;
    }

    const s = JSON.parse(savedStaff);
    setStaff(s);

    /* FETCH HOSPITALS FROM BACKEND */
    const fetchHospitals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hospitals/all", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Failed to fetch hospitals:", data.message);
          return;
        }

        const staffHospitals = data.hospitals || [];
// ✅ Find any rejected hospital
const rejected = staffHospitals.find((h) => h.status === "rejected");

if (rejected) {
  // use hospital ID as unique alert key
  const alertKey = `rejectedAlertShown_${rejected._id}`;
  const lastAlertId = localStorage.getItem("rejectedAlertShown");

  if (lastAlertId !== alertKey) {
    alert(
      `❌ Your hospital "${rejected.name}" was rejected by Admin.\n\nReason: ${
        rejected.rejectionReason || "Not specified"
      }`
    );

    // save key to prevent repeat alert
    localStorage.setItem("rejectedAlertShown", alertKey);
  }
} else {  
  // clear alert flag if all hospitals approved or deleted
  localStorage.removeItem("rejectedAlertShown");
}



        const latestHospital = staffHospitals.length ? staffHospitals[0] : null;
        setHospital(latestHospital);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();

    /* FETCH DOCTORS FROM BACKEND (MongoDB) */
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors/my", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        let data;
try {
  data = await res.json();
} catch {
  data = {};
}
if (!res.ok) {
  console.error("Failed:", data?.message || "Network error");
  return;
}

const normalized = data.map((d) => ({
  ...d,
  bankDetails: d.bankDetails || {
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  },
}));
const offline = normalized.filter((doc) => !doc.onlineConsultation);
const online = normalized.filter((doc) => doc.onlineConsultation);


        setDoctors(offline);
        setOnlineDoctors(online);

        const rejected = data.filter((d) => d.status === "rejected");
        if (rejected.length > 0) {
          const msg = rejected
            .map(
              (d) =>
                `• ${d.fullName} (${d.specialization})\nReason: ${
                  d.rejectionReason || "Not specified"
                }`
            )
            .join("\n\n");
          alert(`❌ Some doctors were rejected:\n\n${msg}`);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();

    const mv = localStorage.getItem("masterVisibility");
    setMasterVisibility(mv ? JSON.parse(mv) : true);
  }, []);

const handleMasterToggle = async (val) => {
  setMasterVisibility(val);
  localStorage.setItem("masterVisibility", JSON.stringify(val));

  try {
    const token = localStorage.getItem("token");

    // Update hospital visibility
    await fetch("http://localhost:5000/api/hospitals/toggle-visibility", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ visible: val }),
    });

    // NEW: Update doctor visibility in one go
    await fetch("http://localhost:5000/api/doctors/toggle-all-visibility", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ visible: val }),
    });
  } catch (err) {
    console.error("Master toggle failed:", err);
  }
};
// const handleMasterToggle = async (val) => {
//   // 1️⃣ Update UI immediately for instant feedback
//   setMasterVisibility(val);
//   localStorage.setItem("masterVisibility", JSON.stringify(val));

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("Session expired. Please log in again.");

//     // 2️⃣ Parallel API updates for better performance
//     const [hospitalRes, doctorRes] = await Promise.all([
//       fetch("http://localhost:5000/api/hospitals/toggle-visibility", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ visible: val }),
//       }),
//       fetch("http://localhost:5000/api/doctors/toggle-all-visibility", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ visible: val }),
//       }),
//     ]);

//     // 3️⃣ Safely parse both responses
//     const hospitalData = await hospitalRes.json().catch(() => ({}));
//     const doctorData = await doctorRes.json().catch(() => ({}));

//     // 4️⃣ Error handling
//     if (!hospitalRes.ok) {
//       console.error("Hospital visibility update failed:", hospitalData.message);
//       alert("⚠️ Failed to update hospital visibility.");
//     }
//     if (!doctorRes.ok) {
//       console.error("Doctor visibility update failed:", doctorData.message);
//       alert("⚠️ Failed to update doctor visibility.");
//     }

//     // 5️⃣ Optional: visual success feedback
//     if (hospitalRes.ok && doctorRes.ok) {
//       alert(
//         val
//           ? "👁️ Your hospital and doctors are now visible to patients."
//           : "🚫 Your hospital and doctors are now hidden from public view."
//       );
//     }
//   } catch (err) {
//     console.error("Master toggle failed:", err);
//     alert("❌ Network error while updating visibility. Please try again.");
//   }
// };



  const handleDeleteOfflineDoctor = async (docId) => {
    const doctor = doctors.find((d) => d._id === docId);
    if (!doctor) return alert("Doctor not found.");

    const userInput = window.prompt(
      `⚠️ DELETE WARNING\n\nDeleting "${doctor.fullName}" will permanently remove:\n• All related appointments\n• All reviews\n\nType "delete" to confirm:`
    );

    if (userInput?.toLowerCase() !== "delete") {
      alert("Deletion cancelled");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/doctors/delete/${docId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete error:", data.message);
        return alert(`❌ Failed to delete: ${data.message || "Server error"}`);
      }

      setDoctors((prev) => prev.filter((d) => d._id !== docId));
      alert("✅ Doctor deleted successfully from the database.");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("❌ Network error. Please try again.");
    }
  };

  const handleDeleteOnlineDoctor = async (docId) => {
    const doctor = onlineDoctors.find((d) => d._id === docId);
    if (!doctor) return alert("Doctor not found.");

    const userInput = window.prompt(
      `⚠️ DELETE WARNING\n\nDeleting "${doctor.fullName}" will permanently remove:\n• All consultation data\n• All reviews\n\nType "delete" to confirm:`
    );

    if (userInput?.toLowerCase() !== "delete") {
      alert("Deletion cancelled");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/doctors/delete/${docId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete error:", data.message);
        return alert(`❌ Failed to delete: ${data.message || "Server error"}`);
      }

      setOnlineDoctors((prev) => prev.filter((d) => d._id !== docId));
      alert("✅ Online doctor deleted successfully from the database.");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("❌ Network error. Please try again.");
    }
  };

 const handleToggleOfflineVisibility = async (docId) => {
  const updated = doctors.map((d) =>
    d._id === docId ? { ...d, visibility: !d.visibility } : d
  );
  setDoctors(updated);

  try {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/doctors/update/${docId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
visibility: !doctors.find((d) => d._id === docId).visibility,
      }),
    });
  } catch (err) {
    console.error("Failed to update visibility:", err);
  }
};


  const handleToggleOnlineVisibility = async (docId) => {
  const updated = onlineDoctors.map((d) =>
    d._id === docId ? { ...d, visibility: !d.visibility } : d
  );
  setOnlineDoctors(updated);

  try {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/doctors/update/${docId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
visibility: !onlineDoctors.find((d) => d._id === docId).visibility,
      }),
    });
  } catch (err) {
    console.error("Failed to update online visibility:", err);
  }
};


  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and ALL associated data (hospitals, doctors). This action cannot be undone. Are you sure?"
    );
    
    if (!confirmed) return;

    const doubleConfirm = window.prompt(
      'Type "DELETE" to confirm account deletion:'
    );

    if (doubleConfirm === "DELETE") {
      localStorage.removeItem("staff");
      const hospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");
      const remainingHospitals = hospitals.filter(h => h.staffEmail !== staff.email);
      localStorage.setItem("hospitals", JSON.stringify(remainingHospitals));
      
      const doctors = JSON.parse(localStorage.getItem("doctors") || "[]");
      const remainingDoctors = doctors.filter(d => d.staffEmail !== staff.email);
      localStorage.setItem("doctors", JSON.stringify(remainingDoctors));
      
      const onlineDoctors = JSON.parse(localStorage.getItem("onlineDoctors") || "[]");
      const remainingOnlineDoctors = onlineDoctors.filter(d => d.staffEmail !== staff.email);
      localStorage.setItem("onlineDoctors", JSON.stringify(remainingOnlineDoctors));
      
      alert("✅ Account deleted successfully");
      window.location.href = "/";
    } else {
      alert("❌ Account deletion cancelled");
    }
  };

  const filteredOfflineDoctors = useMemo(() => {
    return doctors.filter(
      (d) =>
        d.fullName.toLowerCase().includes(doctorSearch.toLowerCase()) &&
        (!doctorFilterDisease || d.specialization === doctorFilterDisease)
    );
  }, [doctors, doctorSearch, doctorFilterDisease]);

  const filteredOnlineDoctors = useMemo(() => {
    return onlineDoctors.filter(
      (d) =>
        d.fullName.toLowerCase().includes(onlineSearch.toLowerCase()) &&
        (!onlineFilterDisease || d.specialization === onlineFilterDisease)
    );
  }, [onlineDoctors, onlineSearch, onlineFilterDisease]);

  return (
    <div className="min-h-screen" style={{ background: THEME.bg }}>
      {/* DESKTOP HEADER - Unchanged */}
      <div className="hidden lg:block" style={{ 
        background: THEME.white,
        borderBottom: `1px solid ${THEME.border}`,
        boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: THEME.primary,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold" style={{ color: THEME.textPrimary }}>
                    DRBOOQ Dashboard
                  </h1>
                  <p className="text-xs" style={{ color: THEME.textSecondary }}>
                    {staff?.name || "Team Member"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ 
                background: masterVisibility ? "#E8F5E9" : "#FFEBEE",
                border: `1px solid ${masterVisibility ? "#4CAF50" : "#EF5350"}`
              }}>
                <span className="text-xs font-medium" style={{ 
                  color: masterVisibility ? "#2E7D32" : "#C62828" 
                }}>
                  {masterVisibility ? "Visible" : "Hidden"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={masterVisibility}
                    onChange={(e) => handleMasterToggle(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                {masterVisibility ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-red-600" />
                )}
              </div>

              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                title="Home"
              >
                <Home className="w-5 h-5" style={{ color: THEME.textSecondary }} />
              </button>
            </div>
          </div>
        </div>
      </div>

{/* MOBILE HEADER - Improved Toggle */}
<div className="lg:hidden" style={{ 
  background: THEME.white,
  borderBottom: `1px solid ${THEME.border}`,
  boxShadow: "0 1px 2px 0 rgba(60,64,67,.3)"
}}>
  <div className="px-4">
    <div className="flex items-center justify-between h-14">
      <div className="flex items-center gap-3">
        <div style={{
          width: "36px",
          height: "36px",
          background: THEME.primary,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-base font-semibold" style={{ color: THEME.textPrimary }}>
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Improved Visibility Toggle for Mobile */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ 
          background: masterVisibility ? "#E8F5E9" : "#FFEBEE",
          border: `1.5px solid ${masterVisibility ? "#4CAF50" : "#EF5350"}`
        }}>
          <span className="text-xs font-semibold" style={{ 
            color: masterVisibility ? "#2E7D32" : "#C62828" 
          }}>
            {masterVisibility ? "Visible" : "Hidden"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={masterVisibility}
              onChange={(e) => handleMasterToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all after:shadow-sm peer-checked:bg-green-600 peer-checked:after:border-white"></div>
          </label>
          {masterVisibility ? (
            <Eye className="w-4 h-4 text-green-600" />
          ) : (
            <EyeOff className="w-4 h-4 text-red-600" />
          )}
        </div>

         
      </div>
    </div>
  </div>
</div>


      {/* Visibility Warning */}
      {!masterVisibility && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4">
          <div style={{
            background: "#FFF3CD",
            border: `1px solid ${THEME.warning}`,
            borderRadius: "8px",
            padding: "12px 16px"
          }} className="flex items-start gap-3">
            <AlertCircle style={{ color: THEME.warning }} className="w-5 h-5 flex-shrink-0" />
            <div>
              <p style={{ color: "#664D03", fontWeight: "600" }} className="text-sm">
                Website Hidden from Public
              </p>
              <p style={{ color: "#664D03" }} className="text-xs mt-1">
                Your hospital, doctors, and online doctors are not visible on the live site.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Clean Tabs */}
        <div className="mb-6">
          <div style={{ 
            background: THEME.white,
            borderRadius: "8px",
            border: `1px solid ${THEME.border}`,
            padding: "4px"
          }}>
            <div className="flex gap-1">
              <TabButton
                label="Overview"
                icon={<TrendingUp />}
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              <TabButton
                label="Doctors"
                icon={<Users />}
                active={activeTab === "doctors"}
                onClick={() => setActiveTab("doctors")}
              />
              <TabButton
                label="Hospital"
                icon={<Building2 />}
                active={activeTab === "hospital"}
                onClick={() => setActiveTab("hospital")}
              />
              <TabButton
                label="Profile"
                icon={<Briefcase />}
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <OverviewTab
            offlineDoctors={doctors}
            onlineDoctors={onlineDoctors}
            hospital={hospital}
          />
        )}

        {activeTab === "doctors" && (
          <DoctorsManagementTab
            offlineDoctors={filteredOfflineDoctors}
            onlineDoctors={filteredOnlineDoctors}
            hospital={hospital}
            doctorSearch={doctorSearch}
            setDoctorSearch={setDoctorSearch}
            onlineSearch={onlineSearch}
            setOnlineSearch={setOnlineSearch}
            setDoctorFilterDisease={setDoctorFilterDisease}
            setOnlineFilterDisease={setOnlineFilterDisease}
            onDeleteOffline={handleDeleteOfflineDoctor}
            onToggleOfflineVis={handleToggleOfflineVisibility}
            onDeleteOnline={handleDeleteOnlineDoctor}
            onToggleOnlineVis={handleToggleOnlineVisibility}
            navigate={navigate}
            mobileFilter={mobileFilter}
            setMobileFilter={setMobileFilter}
          />
        )}

        {activeTab === "hospital" && <HospitalProfileTab hospital={hospital} navigate={navigate} />}

        {activeTab === "profile" && (
          <StaffProfileTab
            staff={staff}
            setStaff={setStaff}
            setEditForm={setEditForm}
            setEditModalOpen={setEditModalOpen}
            onDeleteAccount={handleDeleteAccount}
          />
        )}
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditStaffModal
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={(f) => {
            setStaff(f);
            localStorage.setItem("staff", JSON.stringify(f));
            setEditModalOpen(false);
          }}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}

/* TAB BUTTON */
function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 px-4 py-2.5 rounded-md font-medium text-sm transition-all"
      style={{
        background: active ? THEME.primary : "transparent",
        color: active ? THEME.white : THEME.textSecondary,
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {React.cloneElement(icon, {
          className: "w-4 h-4",
          strokeWidth: active ? 2.5 : 2,
        })}
        <span className="hidden sm:inline">{label}</span>
      </div>
    </button>
  );
}

/* OVERVIEW TAB - FIXED SERVICE INFORMATION LAYOUT */
function OverviewTab({ offlineDoctors, onlineDoctors, hospital }) {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  
  const today = new Date().toDateString();
  const todayAppointments = appointments.filter(
    (apt) => new Date(apt.date).toDateString() === today
  );
  const pendingRejected = appointments.filter(
    (apt) => apt.status === "pending" || apt.status === "rejected"
  );
  const completedToday = appointments.filter(
    (apt) =>
      new Date(apt.date).toDateString() === today && apt.status === "completed"
  );
  const totalCompleted = appointments.filter((apt) => apt.status === "completed");

  return (
    <div>
      {/* Mobile: 2 cards per row with improved design, Desktop: 4 cards per row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
        <MobileStatCard label="Offline Doctors" value={offlineDoctors.length} icon={<Users />} color={THEME.primary} />
        <MobileStatCard label="Online Doctors" value={onlineDoctors.length} icon={<Video />} color={THEME.success} />
        <MobileStatCard label="Today's Appointments" value={todayAppointments.length} icon={<Calendar />} color="#9C27B0" />
        <MobileStatCard label="Pending/Rejected" value={pendingRejected.length} icon={<XCircle />} color={THEME.warning} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
        <MobileStatCard label="Completed Today" value={completedToday.length} icon={<CheckCircle />} color={THEME.success} />
        <MobileStatCard label="Total Completed" value={totalCompleted.length} icon={<TrendingUp />} color={THEME.success} />
      </div>

      {/* Service Information - Fixed Layout */}
      <div style={{
        background: "#E8F4FD",
        border: `1px solid #1A73E8`,
        borderRadius: "8px",
        padding: "14px"
      }} className="lg:p-5">
        <div className="flex items-start gap-2 mb-3">
          <Info className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <h3 className="font-semibold text-sm lg:text-base" style={{ color: "#1967D2" }}>
            Service Information
          </h3>
        </div>
        
        <div className="space-y-2 text-xs lg:text-sm leading-relaxed" style={{ color: "#185ABC" }}>
          <p className="flex items-start gap-1.5">
            <span className="font-bold flex-shrink-0">•</span>
            <span><b>Online Doctors:</b> No hospital registration required. Can be added immediately.</span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="font-bold flex-shrink-0">•</span>
            <span><b>Offline Doctors:</b> Requires hospital registration first. Patients visit your facility.</span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="font-bold flex-shrink-0">•</span>
            <span><b>Hospital Profile:</b> Your hospital information is public and searchable by patients.</span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="font-bold flex-shrink-0">•</span>
            <span><b>Visibility Controls:</b> Individual doctor visibility can be toggled anytime.</span>
          </p>
        </div>
      </div>
    </div>
  );
}


/* IMPROVED MOBILE STAT CARD */
function MobileStatCard({ label, value, icon, color }) {
  return (
    <div style={{
      background: THEME.white,
      border: `1px solid ${THEME.border}`,
      borderRadius: "8px",
      padding: "12px"
    }} className="hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center gap-2">
        <div style={{
          width: "36px",
          height: "36px",
          background: `${color}15`,
          color: color,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <div>
          <p className="text-xl lg:text-3xl font-bold" style={{ color }}>{value}</p>
          <p className="text-xs font-medium mt-1 leading-tight" style={{ color: THEME.textSecondary }}>{label}</p>
        </div>
      </div>
    </div>
  );
}

/* DOCTORS TAB - SEPARATE SECTIONS */
function DoctorsManagementTab({
  offlineDoctors,
  onlineDoctors,
  hospital,
  doctorSearch,
  setDoctorSearch,
  onlineSearch,
  setOnlineSearch,
  setDoctorFilterDisease,
  setOnlineFilterDisease,
  onDeleteOffline,
  onToggleOfflineVis,
  onDeleteOnline,
  onToggleOnlineVis,
  navigate,
  mobileFilter,
  setMobileFilter,
}) {
  
  const handleAddOfflineDoctor = () => {
    if (!hospital) {
      alert("❌ Hospital Required!\n\nYou must register a hospital first before adding offline doctors.\n\nOffline doctors need a physical location where patients can visit.\n\nPlease click 'Register Hospital' button below.");
      return;
    }
    
    if (hospital.status === "pending") {
      alert("⏳ Hospital Pending Approval\n\nYour hospital registration is awaiting admin approval.\n\nYou can add offline doctors only after your hospital is approved.");
      return;
    }
    
    if (hospital.status === "rejected") {
      alert("❌ Hospital Registration Rejected\n\nYour hospital was rejected. Please re-register with correct information before adding doctors.");
      return;
    }
    
    navigate("/add-offline-doctor");
  };

  return (
    <>
      {/* DESKTOP VIEW: Two columns (unchanged) */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ONLINE DOCTORS */}
        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: THEME.textPrimary }}>
              <Video className="w-5 h-5" style={{ color: THEME.primary }} />
              Online Doctors ({onlineDoctors.length})
            </h2>
            <button
              onClick={() => navigate("/add-online-doctor")}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all"
              style={{
                background: THEME.primary,
                color: THEME.white
              }}
            >
              <PlusCircle className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search online doctors..."
              value={onlineSearch}
              onChange={(e) => setOnlineSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            />
          </div>

          <select
            onChange={(e) => setOnlineFilterDisease(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: THEME.border }}
          >
            <option value="">All Specializations</option>
            {specializations.map((s, i) => (
              <option key={i} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>

          {onlineDoctors.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500 mb-2">No online doctors added</p>
              <button
                onClick={() => navigate("/add-online-doctor")}
                className="text-sm font-medium"
                style={{ color: THEME.primary }}
              >
                Add Your First Online Doctor
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {onlineDoctors.map((doc) => (
                <DoctorCard
                  key={doc._id}
                  doctor={doc}
                  onDelete={onDeleteOnline}
                  onToggleVis={onToggleOnlineVis}
                  navigate={navigate}
                  type="online"
                />
              ))}
            </div>
          )}
        </div>

        {/* OFFLINE DOCTORS */}
        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: THEME.textPrimary }}>
              <Users className="w-5 h-5" style={{ color: THEME.primary }} />
              Offline Doctors ({offlineDoctors.length})
            </h2>
            <button
              onClick={handleAddOfflineDoctor}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                !hospital || hospital.status !== "approved"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
              }`}
              style={{
                background: hospital && hospital.status === "approved" ? THEME.primary : undefined,
                color: hospital && hospital.status === "approved" ? THEME.white : undefined
              }}
            >
              <PlusCircle className="w-4 h-4" />
              Add
            </button>
          </div>

          {!hospital && (
            <div style={{
              background: "#FFF3CD",
              border: `2px solid ${THEME.warning}`,
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px"
            }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-1">
                    Hospital Registration Required
                  </p>
                  <p className="text-xs text-orange-800 mb-2">
                    You must register a hospital before adding offline doctors.
                  </p>
                  <button
                    onClick={() => navigate("/register-hospital")}
                    className="px-3 py-1.5 bg-orange-600 text-white text-xs font-medium rounded-md hover:bg-orange-700 transition"
                  >
                    Register Hospital Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {hospital && hospital.status === "pending" && (
            <div style={{
              background: "#E8F4FD",
              border: `2px solid ${THEME.primary}`,
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px"
            }}>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Hospital Approval Pending
                  </p>
                  <p className="text-xs text-blue-800">
                    Your hospital is awaiting admin approval. You can add offline doctors after approval.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search offline doctors..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
              disabled={!hospital || hospital.status !== "approved"}
            />
          </div>

          <select
            onChange={(e) => setDoctorFilterDisease(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: THEME.border }}
            disabled={!hospital || hospital.status !== "approved"}
          >
            <option value="">All Specializations</option>
            {specializations.map((s, i) => (
              <option key={i} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>

          {offlineDoctors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500 mb-2">No offline doctors added</p>
              {hospital && hospital.status === "approved" && (
                <button
                  onClick={handleAddOfflineDoctor}
                  className="text-sm font-medium"
                  style={{ color: THEME.primary }}
                >
                  Add Your First Offline Doctor
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {offlineDoctors.map((doc) => (
                <DoctorCard
                  key={doc._id}
                  doctor={doc}
                  onDelete={onDeleteOffline}
                  onToggleVis={onToggleOfflineVis}
                  navigate={navigate}
                  type="offline"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE VIEW: Separate Sections with Filter */}
      <div className="lg:hidden space-y-4">
        {/* FILTER SECTION - Separate at top */}
        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "12px"
        }}>
          <select
            value={mobileFilter}
            onChange={(e) => setMobileFilter(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: THEME.border, color: THEME.textPrimary }}
          >
            <option value="all">All Doctors</option>
            <option value="online">Online Doctors Only</option>
            <option value="offline">Offline Doctors Only</option>
          </select>
        </div>

        {/* ONLINE DOCTORS SECTION - Separate */}
        {(mobileFilter === "all" || mobileFilter === "online") && (
          <div style={{
            background: THEME.white,
            border: `1px solid ${THEME.border}`,
            borderRadius: "8px",
            padding: "16px"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: THEME.textPrimary }}>
                <Video className="w-5 h-5" style={{ color: THEME.success }} />
                Online Doctors ({onlineDoctors.length})
              </h3>
              <button
                onClick={() => navigate("/add-online-doctor")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-xs transition-all"
                style={{
                  background: THEME.success,
                  color: THEME.white
                }}
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search online doctors..."
                value={onlineSearch}
                onChange={(e) => setOnlineSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
              />
            </div>

            <select
              onChange={(e) => setOnlineFilterDisease(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            >
              <option value="">All Specializations</option>
              {specializations.map((s, i) => (
                <option key={i} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            {onlineDoctors.length === 0 ? (
              <div className="text-center py-8">
                <Video className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-xs text-gray-500">No online doctors added</p>
              </div>
            ) : (
              <div className="space-y-3">
                {onlineDoctors.map((doc) => (
                  <DoctorCard
                    key={doc._id}
                    doctor={doc}
                    onDelete={onDeleteOnline}
                    onToggleVis={onToggleOnlineVis}
                    navigate={navigate}
                    type="online"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* OFFLINE DOCTORS SECTION - Separate */}
        {(mobileFilter === "all" || mobileFilter === "offline") && (
          <div style={{
            background: THEME.white,
            border: `1px solid ${THEME.border}`,
            borderRadius: "8px",
            padding: "16px"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: THEME.textPrimary }}>
                <Users className="w-5 h-5" style={{ color: THEME.primary }} />
                Offline Doctors ({offlineDoctors.length})
              </h3>
              <button
                onClick={handleAddOfflineDoctor}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-xs transition-all ${
                  !hospital || hospital.status !== "approved"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                style={{
                  background: hospital && hospital.status === "approved" ? THEME.primary : undefined,
                  color: hospital && hospital.status === "approved" ? THEME.white : undefined
                }}
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </button>
            </div>

            {!hospital && (
              <div style={{
                background: "#FFF3CD",
                border: `2px solid ${THEME.warning}`,
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px"
              }}>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-orange-900 mb-1">
                      Hospital Registration Required
                    </p>
                    <p className="text-xs text-orange-800 mb-2">
                      Register a hospital to add offline doctors.
                    </p>
                    <button
                      onClick={() => navigate("/register-hospital")}
                      className="px-3 py-1.5 bg-orange-600 text-white text-xs font-medium rounded-md"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {hospital && hospital.status === "pending" && (
              <div style={{
                background: "#E8F4FD",
                border: `2px solid ${THEME.primary}`,
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px"
              }}>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-900 mb-1">
                      Hospital Approval Pending
                    </p>
                    <p className="text-xs text-blue-800">
                      Your hospital is awaiting admin approval.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search offline doctors..."
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
                disabled={!hospital || hospital.status !== "approved"}
              />
            </div>

            <select
              onChange={(e) => setDoctorFilterDisease(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
              disabled={!hospital || hospital.status !== "approved"}
            >
              <option value="">All Specializations</option>
              {specializations.map((s, i) => (
                <option key={i} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            {offlineDoctors.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-xs text-gray-500">No offline doctors added</p>
              </div>
            ) : (
              <div className="space-y-3">
                {offlineDoctors.map((doc) => (
                  <DoctorCard
                    key={doc._id}
                    doctor={doc}
                    onDelete={onDeleteOffline}
                    onToggleVis={onToggleOfflineVis}
                    navigate={navigate}
                    type="offline"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* DOCTOR CARD */
function DoctorCard({ doctor, onDelete, onToggleVis, navigate, type }) {
  const isRejected = doctor.status === "rejected" || doctor.rejectedBy;
  const rejectionReason = doctor.rejectionReason || "Invalid or incomplete data";

  if (isRejected) {
    return (
      <div style={{
        background: "#FFEBEE",
        border: `2px solid ${THEME.danger}`,
        borderRadius: "8px",
        padding: "12px"
      }}>
        <div className="flex items-start gap-2">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-xs text-red-800 mb-1">
              Doctor Verification Rejected
            </h3>
            <p className="text-xs text-red-700 mb-2 truncate">
              <strong>{doctor.fullName}</strong> ({doctor.specialization})
            </p>
            <div style={{
              background: "#FFCDD2",
              borderRadius: "6px",
              padding: "6px 8px",
              marginBottom: "8px"
            }}>
              <p className="text-xs font-medium text-red-900 break-words">
                Reason: {rejectionReason}
              </p>
            </div>
            <button
              onClick={() => onDelete(doctor._id)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition text-xs flex items-center gap-1"
            >
              <Trash className="w-3 h-3" />
              Remove from List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = doctor.status === "approved" ? THEME.success : THEME.warning;

  return (
    <div style={{
      background: THEME.white,
      border: `1px solid ${THEME.border}`,
      borderRadius: "8px",
      padding: "12px"
    }} className="hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        {doctor.photo ? (
          <img
            src={doctor.photo}
            alt={doctor.fullName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            style={{ border: `2px solid ${THEME.border}` }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ background: THEME.primary }}
          >
            {doctor.fullName.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate" style={{ color: THEME.textPrimary }}>
            {doctor.fullName}
          </h3>
          <p className="text-xs truncate" style={{ color: THEME.textSecondary }}>
            {doctor.specialization}
          </p>
  <div className="mt-1">
  {doctor.onlineConsultation && (
    doctor.bankDetails?.accountNumber ? (
      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
        Bank Linked
      </span>
    ) : (
      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
        Bank Missing
      </span>
    )
  )}
</div>

        </div>
 

        <span
          className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
          style={{ background: `${statusColor}15`, color: statusColor }}
        >
          {doctor.status === "approved" ? "Approved" : "Pending"}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs mb-3" style={{ color: THEME.textSecondary }}>
        <span>₹{doctor.fee}</span>
        <span>•</span>
        <span>{doctor.experience} yrs</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer flex-1">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={doctor.visibility !== false}
            onChange={() => onToggleVis(doctor._id)}
          />
          <div className="w-full h-9 bg-gray-100 rounded-md peer peer-checked:bg-green-100 transition-all flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 peer-checked:text-green-700">
              {doctor.visibility !== false ? "Visible" : "Hidden"}
            </span>
          </div>
        </label>

        <button
          onClick={() =>
            navigate(type === "online" ? "/add-online-doctor" : "/add-offline-doctor", {
              state: { doctor },
            })
          }
          className="p-2 rounded-md transition-all hover:bg-blue-50"
          style={{ color: THEME.primary, border: `1px solid ${THEME.border}` }}
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(doctor._id)}
          className="p-2 rounded-md transition-all hover:bg-red-50"
          style={{ color: THEME.danger, border: `1px solid ${THEME.border}` }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* HOSPITAL TAB */
/* HOSPITAL TAB - Updated Quick Actions with Restriction */
function HospitalProfileTab({ hospital, navigate }) {
  const [rejectionInfo, setRejectionInfo] = useState(null);

  useEffect(() => {
    if (hospital && hospital.status === "rejected") {
      setRejectionInfo({
        name: hospital.name,
        reason: hospital.rejectionReason || "Invalid or incomplete data",
      });
    }
  }, [hospital]);

  // Handle Add Offline Doctor with restriction
  const handleAddOfflineDoctor = () => {
    if (!hospital) {
      alert("❌ Hospital Required!\n\nYou must register a hospital first before adding offline doctors.\n\nOffline doctors need a physical location where patients can visit.\n\nPlease click 'Register Hospital' button.");
      return;
    }
    
    if (hospital.status === "pending") {
      alert("⏳ Hospital Pending Approval\n\nYour hospital registration is awaiting admin approval.\n\nYou can add offline doctors only after your hospital is approved.");
      return;
    }
    
    if (hospital.status === "rejected") {
      alert("❌ Hospital Registration Rejected\n\nYour hospital was rejected. Please re-register with correct information before adding doctors.");
      return;
    }
    
    navigate("/add-offline-doctor");
  };

  if (rejectionInfo) {
    return (
      <div className="space-y-4">
        <div style={{
          background: "#FFEBEE",
          border: `2px solid ${THEME.danger}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-base text-red-800 mb-2">
                Hospital Verification Rejected
              </h3>
              <p className="text-sm text-red-700 mb-3">
                Your hospital <strong>"{rejectionInfo.name}"</strong> was rejected by admin.
              </p>
              <div style={{
                background: "#FFCDD2",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px"
              }}>
                <p className="text-sm font-medium text-red-900">
                  Reason: {rejectionInfo.reason}
                </p>
              </div>
              <button
                onClick={() => {
                  const staff = JSON.parse(localStorage.getItem("staff"));
                  const hospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");
                  const filtered = hospitals.filter(
                    h => !(h.staffEmail === staff.email && h.status === "rejected")
                  );
                  localStorage.setItem("hospitals", JSON.stringify(filtered));
                  setRejectionInfo(null);
                  navigate("/register-hospital");
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition text-sm"
              >
                Re-register Hospital
              </button>
            </div>
          </div>
        </div>

        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "48px 24px"
        }} className="text-center">
          <Building2 className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold mb-2" style={{ color: THEME.textPrimary }}>
            No Hospital Registered
          </h2>
          <p className="text-sm mb-6" style={{ color: THEME.textSecondary }}>
            Your previous registration was rejected. Please register again.
          </p>
          <button
            onClick={() => navigate("/register-hospital")}
            className="px-6 py-2.5 text-white font-medium rounded-md transition"
            style={{ background: THEME.primary }}
          >
            Register Hospital
          </button>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div style={{
        background: THEME.white,
        border: `1px solid ${THEME.border}`,
        borderRadius: "8px",
        padding: "48px 24px"
      }} className="text-center">
        <Building2 className="w-20 h-20 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold mb-2" style={{ color: THEME.textPrimary }}>
          No Hospital Registered
        </h2>
        <p className="text-sm mb-6" style={{ color: THEME.textSecondary }}>
          Register your hospital to add offline doctors and manage appointments
        </p>
        <button
          onClick={() => navigate("/register-hospital")}
          className="px-6 py-2.5 text-white font-medium rounded-md transition"
          style={{ background: THEME.primary }}
        >
          Register Hospital
        </button>
      </div>
    );
  }

  const statusBadge =
    hospital.status === "approved"
      ? { bg: "#E8F5E9", color: THEME.success, text: "Approved" }
      : { bg: "#FFF3CD", color: THEME.warning, text: "Pending Review" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-10 h-10 flex-shrink-0" style={{ color: THEME.primary }} />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold mb-1" style={{ color: THEME.textPrimary }}>
                  {hospital.name}
                </h2>
                <p className="text-sm" style={{ color: THEME.textSecondary }}>{hospital.type}</p>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: statusBadge.bg, color: statusBadge.color }}
            >
              {statusBadge.text}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={<MapPin className="w-4 h-4" />} label="Location">
              {hospital.district}, {hospital.state}
            </InfoRow>
            <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone">
              {hospital.staffPhone || hospital.whatsapp || "N/A"}
            </InfoRow>
            <InfoRow icon={<Mail className="w-4 h-4" />} label="Email">
              {hospital.staffEmail || "N/A"}
            </InfoRow>
            <InfoRow icon={<Clock className="w-4 h-4" />} label="Emergency">
              {hospital.emergency || "Not specified"}
            </InfoRow>
          </div>

          {hospital.about && (
            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <p className="text-xs font-medium mb-1" style={{ color: THEME.textSecondary }}>
                About
              </p>
              <p className="text-sm" style={{ color: THEME.textPrimary }}>{hospital.about}</p>
            </div>
          )}
        </div>

        {hospital.facilities && hospital.facilities.length > 0 && (
          <div style={{
            background: THEME.white,
            border: `1px solid ${THEME.border}`,
            borderRadius: "8px",
            padding: "20px"
          }}>
            <h3 className="font-semibold mb-3 text-sm" style={{ color: THEME.textPrimary }}>
              Facilities & Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: THEME.lightBg, color: THEME.textSecondary }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <div style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <h3 className="font-semibold mb-4 text-sm" style={{ color: THEME.textPrimary }}>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/register-hospital", { state: { hospital, isEdit: true } })}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition"
              style={{ background: THEME.lightBg, color: THEME.primary }}
            >
              <Edit className="w-4 h-4" />
              Edit Hospital Info
            </button>

            {/* Add Offline Doctor - WITH RESTRICTION */}
            <button
              onClick={handleAddOfflineDoctor}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition ${
                hospital.status !== "approved"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              style={{ 
                background: hospital.status === "approved" ? THEME.lightBg : "#F1F3F4",
                color: hospital.status === "approved" ? THEME.primary : THEME.textSecondary
              }}
              disabled={hospital.status !== "approved"}
            >
              <PlusCircle className="w-4 h-4" />
              Add Offline Doctor
            </button>

            {/* Show status message if not approved */}
            {hospital.status === "pending" && (
              <div style={{
                background: "#E8F4FD",
                border: `1px solid ${THEME.primary}`,
                borderRadius: "6px",
                padding: "8px 12px"
              }}>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    Hospital approval pending. You can add doctors after approval.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5" style={{ color: THEME.primary }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium" style={{ color: THEME.textSecondary }}>{label}</p>
        <p className="text-sm break-words" style={{ color: THEME.textPrimary }}>{children}</p>
      </div>
    </div>
  );
}

/* STAFF PROFILE TAB */
function StaffProfileTab({ staff, setStaff, setEditForm, setEditModalOpen, onDeleteAccount }) {
  if (!staff) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div style={{
        background: THEME.white,
        border: `1px solid ${THEME.border}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div style={{
              width: "60px",
              height: "60px",
              background: THEME.lightBg,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Briefcase className="w-8 h-8" style={{ color: THEME.primary }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: THEME.textPrimary }}>
                {staff.name}
              </h2>
              <p className="text-sm" style={{ color: THEME.textSecondary }}>
                {staff.designation || "Staff Member"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <InfoRow icon={<Mail className="w-4 h-4" />} label="Email">
            {staff.email || "N/A"}
          </InfoRow>
          <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone">
            {staff.phone || staff.whatsapp || "N/A"}
          </InfoRow>
          <InfoRow icon={<Briefcase className="w-4 h-4" />} label="Role">
            {staff.designation || "Staff"}
          </InfoRow>
        </div>

        <button
          onClick={() => {
            setEditForm(staff);
            setEditModalOpen(true);
          }}
          className="px-6 py-2.5 text-sm font-medium text-white rounded-md transition"
          style={{ background: THEME.primary }}
        >
          <Edit className="w-4 h-4 inline mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Danger Zone */}
      <div style={{
        background: THEME.white,
        border: `2px solid ${THEME.danger}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-red-600 mb-1">Danger Zone</h3>
            <p className="text-sm text-gray-600">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-sm text-red-800 mb-2">
            <b>Warning:</b> This action is irreversible!
          </p>
          <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
            <li>All your hospitals will be deleted</li>
            <li>All doctors (offline & online) will be removed</li>
            <li>Your staff profile will be permanently deleted</li>
            <li>This cannot be undone</li>
          </ul>
        </div>

        <button
          onClick={onDeleteAccount}
          className="px-6 py-2.5 text-sm font-medium text-white rounded-md transition flex items-center gap-2"
          style={{ background: THEME.danger }}
        >
          <Trash className="w-4 h-4" />
          Delete Account Permanently
        </button>
      </div>
    </div>
  );
}

/* EDIT STAFF MODAL */
function EditStaffModal({ editForm, setEditForm, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: THEME.textPrimary }}>
            Edit Profile
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: THEME.textSecondary }}>
              Name
            </label>
            <input
              type="text"
              value={editForm?.name || ""}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: THEME.textSecondary }}>
              Phone
            </label>
            <input
              type="tel"
              value={editForm?.phone || ""}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: THEME.textSecondary }}>
              Designation
            </label>
            <input
              type="text"
              value={editForm?.designation || ""}
              onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
              placeholder="e.g., Manager, Coordinator"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onSave(editForm)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-md transition"
              style={{ background: THEME.primary }}
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium border rounded-md transition hover:bg-gray-50"
              style={{ borderColor: THEME.border, color: THEME.textSecondary }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

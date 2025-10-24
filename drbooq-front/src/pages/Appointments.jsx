// src/pages/StaffAppointments.jsx - Complete Updated Code

import React, { useEffect, useState } from "react";
import { 
  CheckCircle, Clock, XCircle, Calendar, Video, MapPin, 
  Home, Activity, Filter, Search, ArrowLeft, AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function StaffAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [pendingStatusFilter, setPendingStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [staff, setStaff] = useState(null);

  // useEffect(() => {
  //   const savedStaff = localStorage.getItem("staff");
  //   if (savedStaff) {
  //     setStaff(JSON.parse(savedStaff));
  //   }

  //   const saved = JSON.parse(localStorage.getItem("appointments") || "[]");
  //   setAppointments(saved);
  // }, []);
// This part checks if staff or patient
// (commented out in your code)
useEffect(() => {
  const currentUser = localStorage.getItem("currentUser");
  const staff = localStorage.getItem("staff");

  if (!currentUser && !staff) {
    alert("🔒 Please login to access appointments");
    navigate("/login");
    return;
  }

  const user = currentUser ? JSON.parse(currentUser) : null;
  if (user && user.role === "patient") {
    alert("⚠️ This page is only for staff members");
    navigate("/");
    return;
  }
}, [navigate]);

// 🔔 Reminder: Notify doctor 5 minutes before any online consultation
useEffect(() => {
  const checkReminders = () => {
    const now = new Date();

    appointments.forEach((appt) => {
      if (appt.type !== "online" || appt.status !== "confirmed") return;

      const [hours, minutes] = appt.time.split(":").map(Number);
      const apptTime = new Date(`${appt.date}T${appt.time}:00`);
      const diffMinutes = (apptTime - now) / 1000 / 60;

      // Trigger alert when it's between 4.5 and 5.5 minutes away
      if (diffMinutes > 4.5 && diffMinutes < 5.5) {
        // Avoid duplicate alerts for same appointment
        if (!localStorage.getItem(`notified_${appt.id}`)) {
          alert(`🔔 Reminder: Online consultation with ${appt.patient} starts in 5 minutes!`);
          localStorage.setItem(`notified_${appt.id}`, "true");
        }
      }

      // Clean old reminders (past appointments)
      if (diffMinutes < -10) {
        localStorage.removeItem(`notified_${appt.id}`);
      }
    });
  };

  // Run every 60 seconds
  const interval = setInterval(checkReminders, 60000);
  return () => clearInterval(interval);
}, [appointments]);

  // useEffect(() => {
  //   localStorage.setItem("appointments", JSON.stringify(appointments));
  // }, [appointments]);

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
  const lastWeekStart = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  const todayAppointments = appointments.filter((a) => a.date === today);
  // const todayStats = {
  //   total: todayAppointments.length,
  //   confirmed: todayAppointments.filter((a) => a.status === "confirmed").length,
  //   pending: todayAppointments.filter((a) => a.status === "pending").length,
  //   rejected: todayAppointments.filter((a) => a.status === "rejected").length,
  // };
const [todayStats, setTodayStats] = useState({
  total: 0,
  confirmed: 0,
  pending: 0,
  rejected: 0,
});
const calculateTodayStats = (list) => {
  const todayStr = new Date().toISOString().split("T")[0];
  const normalizeDate = (d) => {
    if (!d) return "";
    return d.includes("T") ? d.split("T")[0] : d;
  };
  const todayOnly = list.filter((a) => normalizeDate(a.date) === todayStr);
  return {
    total: todayOnly.length,
    confirmed: todayOnly.filter((a) => a.status === "confirmed").length,
    pending: todayOnly.filter((a) => a.status === "pending").length,
    rejected: todayOnly.filter((a) => a.status === "rejected").length,
  };
};




  const overallStats = {
    pending: appointments.filter((a) => a.status === "pending").length,
    rejected: appointments.filter((a) => a.status === "rejected").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
  };

  const getFilteredAppointments = () => {

     const to24HourTime = (timeStr) => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier?.toUpperCase() === "PM" && hours !== "12") {
      hours = String(Number(hours) + 12);
    }
    if (modifier?.toUpperCase() === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

    let filtered = appointments;

    if (activeTab === "pending") {
      filtered = filtered.filter((a) => a.status === "pending" || a.status === "rejected");
      
      if (pendingStatusFilter === "pending") {
        filtered = filtered.filter((a) => a.status === "pending");
      } else if (pendingStatusFilter === "rejected") {
        filtered = filtered.filter((a) => a.status === "rejected");
      }

      if (timeFilter === "today") {
        filtered = filtered.filter((a) => a.date === today);
      } else if (timeFilter === "yesterday") {
        filtered = filtered.filter((a) => a.date === yesterday);
      } else if (timeFilter === "lastWeek") {
        filtered = filtered.filter((a) => a.date >= lastWeekStart && a.date < today);
      }
    } // ✅ UPCOMING TAB — shows future or just-started appointments
else if (activeTab === "upcoming") {
  const now = new Date();

  filtered = filtered.filter((a) => {
    if (a.status !== "confirmed") return false;

const apptDateTime = new Date(`${a.date}T${to24HourTime(a.time)}:00`);
    const diffMin = (apptDateTime - now) / 1000 / 60; // future - now

    // Future appointments → always show
    if (diffMin > 0) return true;

    // Started but still within grace period
    if (a.type === "online" && diffMin >= -20) return true;
    if (a.type === "offline" && diffMin >= -45) return true;

    // Too old → hide
    return false;
  });

  if (timeFilter === "today") filtered = filtered.filter((a) => a.date === today);
  else if (timeFilter === "tomorrow") filtered = filtered.filter((a) => a.date === tomorrow);
  else if (timeFilter === "week") filtered = filtered.filter((a) => a.date <= nextWeek);
}

// ✅ COMPLETED TAB — shows only expired appointments
else if (activeTab === "completed") {
  const now = new Date();

  filtered = filtered.filter((a) => {
    if (a.status !== "confirmed") return false;

    const apptDateTime = new Date(`${a.date}T${a.time}:00`);
    const diffMin = (apptDateTime - now) / 1000 / 60;

    // Show if already ended
    if (a.type === "online" && diffMin < -20) return true;
    if (a.type === "offline" && diffMin < -45) return true;

    return false;
  });
}
// 🕓 Converts "03:30 PM" → "15:30" (for Date parsing)




    if (typeFilter === "online") {
      filtered = filtered.filter((a) => a.type === "online");
    } else if (typeFilter === "offline") {
      filtered = filtered.filter((a) => a.type === "offline");
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (a) =>
          (a.patient?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
          (a.doctor?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredAppointments = getFilteredAppointments();

const handleConfirm = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/appointments/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "confirmed" }),
    });
    const data = await res.json();
    if (data.success) {
      setAppointments((prev) => {
        const updated = prev.map((a) =>
          a.id === id ? { ...a, status: "confirmed" } : a
        );
        setTodayStats(calculateTodayStats(updated)); // ✅ instant update
        return updated;
      });
    }
  } catch (err) {
    console.error("Error confirming appointment:", err);
  }
};

const handleReject = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/appointments/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "rejected" }),
    });
    const data = await res.json();
    if (data.success) {
      setAppointments((prev) => {
        const updated = prev.map((a) =>
          a.id === id ? { ...a, status: "rejected" } : a
        );
        setTodayStats(calculateTodayStats(updated)); // ✅ instant update
        return updated;
      });
    }
  } catch (err) {
    console.error("Error rejecting appointment:", err);
  }
};



  // useEffect(() => {
  //   const currentUser = localStorage.getItem("currentUser");
  //   const staff = localStorage.getItem("staff");

  //   if (!currentUser && !staff) {
  //     alert("🔒 Please login to access appointments");
  //     setTimeout(() => {
  //       navigate("/login", { replace: true });
  //     }, 100);
  //     return;
  //   }

  //   const user = currentUser ? JSON.parse(currentUser) : null;
  //   if (user && user.role === "patient") {
  //     alert("⚠️ This page is only for staff members");
  //     setTimeout(() => {
  //       navigate("/", { replace: true });
  //     }, 100);
  //     return;
  //   }
  // }, [navigate]);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointments/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

  if (data.success) {
  const mapped = data.bookings.map((b) => ({
    id: b._id,
    patient: b.name,
    doctor: b.doctorId?.fullName,
    date: b.date?.split("T")[0] || "",
    time: b.time,
    type: b.bookingType,
    status: b.status,
    whatsapp: b.whatsapp,
    notes: b.notes,
  }));

  setAppointments(mapped);
 }
 

    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  fetchAppointments();

  // ♻️ Auto-refresh every 60 seconds
  const interval = setInterval(fetchAppointments, 60000);
  return () => clearInterval(interval);
}, [navigate]);
// ✅ Update "Today's Stats" live based on tabs
useEffect(() => {
  const todayStr = new Date().toISOString().split("T")[0];

  // Confirmed = all upcoming confirmed
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed");

  // Pending = all pending
  const pendingAppointments = appointments.filter((a) => a.status === "pending");

  // Rejected = only today’s rejected
  const rejectedToday = appointments.filter(
    (a) => a.status === "rejected" && a.date?.split("T")[0] === todayStr
  );

  // Today’s total = confirmed happening today
  const todayTotal = confirmedAppointments.filter(
    (a) => a.date?.split("T")[0] === todayStr
  ).length;

  setTodayStats({
    total: todayTotal,
    confirmed: confirmedAppointments.length,
    pending: pendingAppointments.length,
    rejected: rejectedToday.length,
  });
}, [appointments]);




  return (
    <div className="min-h-screen flex flex-col" style={{ background: THEME.bg }}>
{/* DESKTOP HEADER - Updated: Dashboard button, NOT sticky */}
<div
  className="hidden lg:block"
  style={{
    background: THEME.white,
    borderBottom: `1px solid ${THEME.border}`,
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
  }}
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/staff-dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: THEME.textSecondary }} />
        </button>
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "40px",
              height: "40px",
              background: THEME.primary,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: THEME.textPrimary }}>
              Appointment Management
            </h1>
            <p className="text-xs" style={{ color: THEME.textSecondary }}>
              {staff?.name || "Staff Dashboard"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/staff-dashboard")}
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
          title="Dashboard"
        >
          <Activity className="w-5 h-5" style={{ color: THEME.textSecondary }} />
          <span className="text-sm font-medium" style={{ color: THEME.textSecondary }}>
            Dashboard
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

{/* MOBILE HEADER - Updated: NOT sticky, Dashboard Button */}
<div
  className="lg:hidden"
  style={{
    background: THEME.white,
    borderBottom: `1px solid ${THEME.border}`,
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.3)",
  }}
>
  <div className="px-4">
    <div className="flex items-center justify-between h-14">
      {/* Left: Icon + Text */}
      <div className="flex items-center gap-2">
        <div
          style={{
            width: "32px",
            height: "32px",
            background: THEME.primary,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Calendar className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-base font-semibold" style={{ color: THEME.textPrimary }}>
          Appointments
        </h1>
      </div>

      {/* Right: Dashboard Button */}
      <button
        onClick={() => navigate("/staff-dashboard")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
      >
        <Activity className="w-4 h-4" style={{ color: THEME.textSecondary }} />
        <span className="text-xs font-medium" style={{ color: THEME.textSecondary }}>
          Dashboard
        </span>
      </button>
    </div>
  </div>
</div>


      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
          {/* Today's Stats - COMPRESSED for mobile */}
      {/* Today's Stats - Desktop: All 4, Mobile: Only Confirmed & Pending */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-3 lg:mb-6">
  {/* Desktop: Show all 4 cards */}
  <StatCard
    label="Today's Total"
    value={todayStats.total}
    icon={<Calendar className="w-5 h-5" />}
    color={THEME.primary}
    showOnMobile={false}
  />
  <StatCard
    label="Confirmed"
    value={todayStats.confirmed}
    icon={<CheckCircle className="w-5 h-5" />}
    color={THEME.success}
    showOnMobile={true}
  />
  <StatCard
    label="Pending"
    value={todayStats.pending}
    icon={<Clock className="w-5 h-5" />}
    color={THEME.warning}
    showOnMobile={true}
  />
  <StatCard
    label="Rejected"
    value={todayStats.rejected}
    icon={<XCircle className="w-5 h-5" />}
    color={THEME.danger}
    showOnMobile={false}
  />
</div>



          {/* DESKTOP FILTERS - Completely Unchanged */}
          <div
            className="hidden lg:block"
            style={{
              background: THEME.white,
              border: `1px solid ${THEME.border}`,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab("pending");
                    setPendingStatusFilter("all");
                    setTimeFilter("all");
                  }}
                  className="px-6 py-2.5 rounded-md font-medium text-sm transition-all flex items-center gap-2"
                  style={{
                    background: activeTab === "pending" ? THEME.warning : THEME.lightBg,
                    color: activeTab === "pending" ? THEME.white : THEME.textSecondary,
                  }}
                >
                  <Clock className="w-4 h-4" />
                  Pending Requests
                  {overallStats.pending > 0 && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: activeTab === "pending" ? "rgba(255,255,255,0.3)" : THEME.warning,
                        color: THEME.white,
                      }}
                    >
                      {overallStats.pending}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab("upcoming");
                    setTimeFilter("all");
                  }}
                  className="px-6 py-2.5 rounded-md font-medium text-sm transition-all"
                  style={{
                    background: activeTab === "upcoming" ? THEME.primary : THEME.lightBg,
                    color: activeTab === "upcoming" ? THEME.white : THEME.textSecondary,
                  }}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => {
                    setActiveTab("completed");
                    setTimeFilter("all");
                  }}
                  className="px-6 py-2.5 rounded-md font-medium text-sm transition-all"
                  style={{
                    background: activeTab === "completed" ? THEME.success : THEME.lightBg,
                    color: activeTab === "completed" ? THEME.white : THEME.textSecondary,
                  }}
                >
                  Completed
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    style={{ color: THEME.textSecondary }}
                  />
                  <input
                    type="text"
                    placeholder="Search patient or doctor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: THEME.border, width: "240px" }}
                  />
                </div>

                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: THEME.border }}
                >
                  {activeTab === "pending" ? (
                    <>
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="lastWeek">Last Week</option>
                    </>
                  ) : (
                    <>
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="week">This Week</option>
                    </>
                  )}
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: THEME.border }}
                >
                  <option value="all">All Types</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>

          {/* MOBILE FILTERS - Stacked */}
          <div
            className="lg:hidden space-y-3 mb-4"
            style={{
              background: THEME.white,
              border: `1px solid ${THEME.border}`,
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab("pending");
                  setPendingStatusFilter("all");
                  setTimeFilter("all");
                }}
                className="flex-1 px-3 py-2 rounded-md font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                style={{
                  background: activeTab === "pending" ? THEME.warning : THEME.lightBg,
                  color: activeTab === "pending" ? THEME.white : THEME.textSecondary,
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                Pending
                {overallStats.pending > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: activeTab === "pending" ? "rgba(255,255,255,0.3)" : THEME.warning,
                      color: THEME.white,
                    }}
                  >
                    {overallStats.pending}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("upcoming");
                  setTimeFilter("all");
                }}
                className="flex-1 px-3 py-2 rounded-md font-medium text-xs transition-all"
                style={{
                  background: activeTab === "upcoming" ? THEME.primary : THEME.lightBg,
                  color: activeTab === "upcoming" ? THEME.white : THEME.textSecondary,
                }}
              >
                Upcoming
              </button>
              <button
                onClick={() => {
                  setActiveTab("completed");
                  setTimeFilter("all");
                }}
                className="flex-1 px-3 py-2 rounded-md font-medium text-xs transition-all"
                style={{
                  background: activeTab === "completed" ? THEME.success : THEME.lightBg,
                  color: activeTab === "completed" ? THEME.white : THEME.textSecondary,
                }}
              >
                Completed
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: THEME.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search patient or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
              >
                {activeTab === "pending" ? (
                  <>
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastWeek">Last Week</option>
                  </>
                ) : (
                  <>
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="week">This Week</option>
                  </>
                )}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
              >
                <option value="all">All Types</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === "pending" ? (
            <PendingRequestsSection
              appointments={filteredAppointments}
              onConfirm={handleConfirm}
              onReject={handleReject}
              statusFilter={pendingStatusFilter}
              setStatusFilter={setPendingStatusFilter}
              stats={overallStats}
              typeFilter={typeFilter}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <AppointmentSection
                title="Online Consultations"
                icon={<Video className="w-5 h-5" />}
                appointments={filteredAppointments.filter((a) => a.type === "online")}
                type="online"
                color={THEME.primary}
                typeFilter={typeFilter}
              />

              <AppointmentSection
                title="Offline Appointments"
                icon={<MapPin className="w-5 h-5" />}
                appointments={filteredAppointments.filter((a) => a.type === "offline")}
                type="offline"
                color={THEME.success}
                typeFilter={typeFilter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* STAT CARD - DESKTOP: Original Style, MOBILE: Compressed Style (Conditional) */
function StatCard({ label, value, icon, color, showOnMobile = true }) {
  return (
    <>
      {/* DESKTOP VIEW - Original Style (Always Show) */}
      <div
        className="hidden lg:block"
        style={{
          background: THEME.white,
          border: `1px solid ${THEME.border}`,
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div
            style={{
              width: "48px",
              height: "48px",
              background: `${color}15`,
              color: color,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(icon, { className: "w-6 h-6" })}
          </div>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
        <p className="text-sm font-medium" style={{ color: THEME.textSecondary }}>{label}</p>
      </div>

      {/* MOBILE VIEW - Compressed Style (Conditional) */}
      {showOnMobile && (
        <div
          className="lg:hidden"
          style={{
            background: THEME.white,
            border: `1px solid ${THEME.border}`,
            borderRadius: "6px",
            padding: "8px",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <div
              style={{
                width: "28px",
                height: "28px",
                background: `${color}15`,
                color: color,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {React.cloneElement(icon, { className: "w-4 h-4" })}
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-lg font-bold leading-none" style={{ color }}>{value}</p>
              <p className="text-[10px] font-medium mt-0.5 leading-tight truncate" style={{ color: THEME.textSecondary }}>
                {label}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


/* PENDING REQUESTS SECTION - WITH FILTER LOGIC */
function PendingRequestsSection({ appointments, onConfirm, onReject, statusFilter, setStatusFilter, stats, typeFilter }) {
  // Show/hide sections based on filter
  const showOnlineSection = typeFilter === "all" || typeFilter === "online";
  const showOfflineSection = typeFilter === "all" || typeFilter === "offline";

  const onlineAppointments = appointments.filter((a) => a.type === "online");
  const offlineAppointments = appointments.filter((a) => a.type === "offline");

  return (
    <div>
      {/* DESKTOP HEADER - Unchanged */}
      <div className="hidden lg:flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "40px",
              height: "40px",
              background: `${THEME.warning}15`,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: THEME.warning }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: THEME.textPrimary }}>
              Pending Requests
            </h2>
            <p className="text-sm" style={{ color: THEME.textSecondary }}>
              Review and approve appointment requests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" style={{ color: THEME.textSecondary }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{ 
              borderColor: THEME.border,
              minWidth: "200px"
            }}
          >
            <option value="all">All Requests ({stats.pending + stats.rejected})</option>
            <option value="pending">Pending Only ({stats.pending})</option>
            <option value="rejected">Rejected Only ({stats.rejected})</option>
          </select>
        </div>
      </div>

      {/* MOBILE HEADER - Simplified */}
      <div className="lg:hidden mb-4">
        <div
          style={{
            background: THEME.white,
            border: `1px solid ${THEME.border}`,
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              style={{
                width: "32px",
                height: "32px",
                background: `${THEME.warning}15`,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle className="w-4 h-4" style={{ color: THEME.warning }} />
            </div>
            <h2 className="text-base font-semibold" style={{ color: THEME.textPrimary }}>
              Pending Requests
            </h2>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{ borderColor: THEME.border }}
          >
            <option value="all">All Requests ({stats.pending + stats.rejected})</option>
            <option value="pending">Pending Only ({stats.pending})</option>
            <option value="rejected">Rejected Only ({stats.rejected})</option>
          </select>
        </div>
      </div>

      {/* Two Column Grid - Show/Hide based on filter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* ONLINE CONSULTATIONS - Only show if filter is "all" or "online" */}
        {showOnlineSection && (
          <div
            style={{
              background: THEME.white,
              border: `2px solid ${THEME.primary}`,
              borderRadius: "8px",
              padding: "16px",
              minHeight: "400px",
            }}
            className="lg:p-6"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 pb-3 lg:pb-4" style={{ borderBottom: `2px solid ${THEME.border}` }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: `${THEME.primary}15`,
                  color: THEME.primary,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm lg:text-lg font-semibold" style={{ color: THEME.textPrimary }}>
                  Online Consultations
                </h2>
                <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
                  {onlineAppointments.length} {onlineAppointments.length === 1 ? "request" : "requests"}
                </p>
              </div>
            </div>

            {onlineAppointments.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="mb-3 lg:mb-4 flex justify-center" style={{ color: THEME.border }}>
                  <Video size={48} className="lg:w-16 lg:h-16" />
                </div>
                <p className="text-sm lg:text-base font-medium mb-1" style={{ color: THEME.textSecondary }}>
                  No Online Requests
                </p>
                <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
                  {statusFilter === "pending" ? "No pending online requests" : 
                   statusFilter === "rejected" ? "No rejected online requests" :
                   "All online requests handled"}
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "520px" }}>
                {onlineAppointments.map((appointment) => (
                  <PendingAppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onConfirm={onConfirm}
                    onReject={onReject}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* OFFLINE APPOINTMENTS - Only show if filter is "all" or "offline" */}
        {showOfflineSection && (
          <div
            style={{
              background: THEME.white,
              border: `2px solid ${THEME.success}`,
              borderRadius: "8px",
              padding: "16px",
              minHeight: "400px",
            }}
            className="lg:p-6"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 pb-3 lg:pb-4" style={{ borderBottom: `2px solid ${THEME.border}` }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: `${THEME.success}15`,
                  color: THEME.success,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm lg:text-lg font-semibold" style={{ color: THEME.textPrimary }}>
                  Offline Appointments
                </h2>
                <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
                  {offlineAppointments.length} {offlineAppointments.length === 1 ? "request" : "requests"}
                </p>
              </div>
            </div>

            {offlineAppointments.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="mb-3 lg:mb-4 flex justify-center" style={{ color: THEME.border }}>
                  <MapPin size={48} className="lg:w-16 lg:h-16" />
                </div>
                <p className="text-sm lg:text-base font-medium mb-1" style={{ color: THEME.textSecondary }}>
                  No Offline Requests
                </p>
                <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
                  {statusFilter === "pending" ? "No pending offline requests" : 
                   statusFilter === "rejected" ? "No rejected offline requests" :
                   "All offline requests handled"}
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "520px" }}>
                {offlineAppointments.map((appointment) => (
                  <PendingAppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onConfirm={onConfirm}
                    onReject={onReject}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* PENDING APPOINTMENT CARD */
function PendingAppointmentCard({ appointment, onConfirm, onReject }) {
  const isPending = appointment.status === "pending";
  const isRejected = appointment.status === "rejected";

  return (
    <div
      style={{
        background: THEME.white,
        border: `2px solid ${isPending ? THEME.warning : THEME.danger}`,
        borderRadius: "8px",
        padding: "12px",
        opacity: isRejected ? 0.7 : 1,
      }}
      className="hover:shadow-md transition-shadow lg:p-4"
    >
      <div className="flex items-start justify-between mb-2 lg:mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm lg:text-base mb-1 truncate" style={{ color: THEME.textPrimary }}>
  Dr. {appointment.doctor || "Doctor Name"}          </h3>
           
        </div>
        <span
          className="text-xs font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full ml-2 flex-shrink-0"
          style={{
            background: isPending ? THEME.warning : THEME.danger,
            color: THEME.white,
          }}
        >
          {isPending ? "PENDING" : "REJECTED"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4 text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" style={{ color: THEME.primary }} />
          <span className="font-medium">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" style={{ color: THEME.primary }} />
          <span className="font-medium">{appointment.time}</span>
        </div>
      </div>
{/* Patient Details Block */}
<div
  className="mt-2 lg:mt-3 rounded-md border p-2 lg:p-3"
  style={{ borderColor: THEME.border, background: THEME.lightBg }}
>
  <p
    className="font-semibold text-xs lg:text-sm mb-1.5 flex items-center gap-1"
    style={{ color: THEME.textPrimary }}
  >
    👤 Patient Details
  </p>

  <ul className="space-y-0.5 text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
    <li>
      <span className="font-medium">• Name:</span> {appointment.patient || "Unknown"}
    </li>
 {/* Show WhatsApp only for offline appointments */}
{appointment.whatsapp && appointment.type === "offline" && (
  <li>
    <span className="font-medium">• WhatsApp:</span>{" "}
    <a
      href={`https://wa.me/${appointment.whatsapp.replace("+", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {appointment.whatsapp}
    </a>
  </li>
)}

    {appointment.notes && (
      <li>
        <span className="font-medium">• Notes:</span> {appointment.notes}
      </li>
    )}
  </ul>
</div>


      {isPending && (
        <div className="flex gap-2 lg:gap-3 pt-2 lg:pt-3" style={{ borderTop: `1px solid ${THEME.border}` }}>
          <button
            onClick={() => onConfirm(appointment.id)}
            className="flex-1 px-3 lg:px-4 py-2 lg:py-2.5 rounded-md text-white font-semibold text-xs lg:text-sm transition hover:opacity-90 flex items-center justify-center gap-1.5 lg:gap-2"
            style={{ background: THEME.success }}
          >
            <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            Confirm
          </button>
          <button
            onClick={() => onReject(appointment.id)}
            className="flex-1 px-3 lg:px-4 py-2 lg:py-2.5 rounded-md text-white font-semibold text-xs lg:text-sm transition hover:opacity-90 flex items-center justify-center gap-1.5 lg:gap-2"
            style={{ background: THEME.danger }}
          >
            <XCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            Reject
          </button>
        </div>
      )}

      {isRejected && (
        <div className="pt-2 lg:pt-3" style={{ borderTop: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm" style={{ color: THEME.danger }}>
            <XCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            <span className="font-medium">This request was rejected</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* APPOINTMENT SECTION - WITH FILTER LOGIC */
function AppointmentSection({ title, icon, appointments, type, color, typeFilter }) {
  // Don't render section if it's filtered out
  if (typeFilter === "online" && type === "offline") return null;
  if (typeFilter === "offline" && type === "online") return null;

  return (
    <div
      style={{
        background: THEME.white,
        border: `1px solid ${THEME.border}`,
        borderRadius: "8px",
        padding: "16px",
        minHeight: "400px",
      }}
      className="lg:p-6"
    >
      <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 pb-3 lg:pb-4" style={{ borderBottom: `2px solid ${THEME.border}` }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: `${color}15`,
            color: color,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-sm lg:text-lg font-semibold" style={{ color: THEME.textPrimary }}>
            {title}
          </h2>
          <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
            {appointments.length} {appointments.length === 1 ? "appointment" : "appointments"}
          </p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 lg:py-16">
          <div className="mb-3 lg:mb-4 flex justify-center" style={{ color: THEME.border }}>
            {type === "online" ? <Video size={48} className="lg:w-16 lg:h-16" /> : <MapPin size={48} className="lg:w-16 lg:h-16" />}
          </div>
          <p className="text-sm lg:text-base font-medium mb-1" style={{ color: THEME.textSecondary }}>
            No {type} appointments
          </p>
          <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
            All {type} appointments will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "520px" }}>
      {appointments.map((appointment) =>
  type === "online" ? (
    <OnlineAppointmentCard key={appointment.id} appointment={appointment} />
  ) : (
    <AppointmentCard key={appointment.id} appointment={appointment} />
  )
)}

        </div>
      )}
    </div>
  );
}
/* 🏥 OFFLINE APPOINTMENT CARD — Fixed Day Logic, Original Style */
function AppointmentCard({ appointment }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(null);
  const [dayText, setDayText] = useState("");

  // 🗓 Determine correct label text: Today / Tomorrow / Weekday
  const getDayText = (dateString) => {
    const apptDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (apptDate.toDateString() === today.toDateString()) return "Today";
    if (apptDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return apptDate.toLocaleDateString("en-US", { weekday: "long" });
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const apptTime = new Date(`${appointment.date}T${appointment.time}:00`);
      const diffMs = apptTime - now;
      const diffMin = diffMs / 1000 / 60;

      // Update day label
      setDayText(getDayText(appointment.date));

      // Update countdown timer
      if (diffMin > 0) {
        const hours = Math.floor(diffMin / 60);
        const minutes = Math.floor(diffMin % 60);
        const formatted =
          hours > 0
            ? `${hours}h ${String(minutes).padStart(2, "0")}m`
            : `${String(minutes).padStart(2, "0")}m`;
        setTimeLeft(formatted);
      } else {
        setTimeLeft(null);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [appointment.date, appointment.time]);

  const handleMarkCompleted = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/update/${appointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Appointment marked as completed!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error marking appointment as completed:", err);
    }
  };

  return (
    <div
      className="hover:shadow-md transition-all"
      style={{
        background: THEME.white,
        border: `1px solid ${THEME.border}`,
        borderLeft: `5px solid ${THEME.success}`,
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm lg:text-base mb-0.5" style={{ color: THEME.textPrimary }}>
            Dr. {appointment.doctor || "Doctor Name"}
          </h3>
          <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
            Offline Consultation
          </p>
        </div>

        {/* ✅ Keep same look, but correct logic */}
        <div
          className="px-2 py-0.5 text-xs font-medium rounded-full"
          style={{
            background: "#E6F4EA",
            color: THEME.success,
          }}
        >
          {timeLeft ? `🕓 In ${timeLeft}` : dayText}
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center justify-between mb-3 text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" style={{ color: THEME.primary }} />
          <span>{appointment.date}</span>
          <Clock className="w-4 h-4 ml-2" style={{ color: THEME.primary }} />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" style={{ color: THEME.success }} />
          <span>Clinic Visit</span>
        </div>
      </div>

      {/* Patient Info */}
      <div
        className="rounded-md border p-2 lg:p-3 mb-3"
        style={{ borderColor: THEME.border, background: THEME.lightBg }}
      >
        <p className="font-semibold text-xs lg:text-sm mb-1 flex items-center gap-1" style={{ color: THEME.textPrimary }}>
          👤 Patient Details
        </p>
        <ul className="space-y-0.5 text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
          <li>
            <span className="font-medium">• Name:</span> {appointment.patient || "Unknown"}
          </li>

          {appointment.whatsapp && (
            <li>
              <span className="font-medium">• WhatsApp:</span>{" "}
              <a
                href={`https://wa.me/${appointment.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {appointment.whatsapp}
              </a>
            </li>
          )}

          {appointment.notes && (
            <li>
              <span className="font-medium">• Notes:</span> {appointment.notes}
            </li>
          )}
        </ul>
      </div>

      {/* Action Button */}
      <button
        onClick={handleMarkCompleted}
        className="w-full py-2 lg:py-2.5 flex items-center justify-center gap-2 rounded-md font-semibold text-sm text-white transition hover:opacity-90"
        style={{ background: THEME.success }}
      >
        <CheckCircle className="w-4 h-4" />
        Mark as Completed
      </button>
    </div>
  );
}

/* 🎥 ONLINE VIDEO APPOINTMENT CARD — with Day Label (Today / Tomorrow / Monday) */
function OnlineAppointmentCard({ appointment }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(null);
  const [isJoinable, setIsJoinable] = useState(false);
  const [dayLabel, setDayLabel] = useState("");

  // 🗓 Helper function to get readable day
  const getDayLabel = (dateString) => {
    const apptDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isToday = apptDate.toDateString() === today.toDateString();
    const isTomorrow = apptDate.toDateString() === tomorrow.toDateString();

    if (isToday) return "📅 Today";
    if (isTomorrow) return "📅 Tomorrow";

    return `📅 ${apptDate.toLocaleDateString("en-US", { weekday: "long" })}`; // Monday, Tuesday...
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const apptTime = new Date(`${appointment.date}T${appointment.time}:00`);
      const diffMs = apptTime - now;
      const diffMin = diffMs / 1000 / 60;

      // Unlock 10 min before start, up to 30 min after
      setIsJoinable(diffMin <= 10 && diffMin >= -30);

      // Live countdown
      if (diffMin > 0) {
        const minutes = Math.floor(diffMin);
        const seconds = Math.floor((diffMin - minutes) * 60);
        setTimeLeft(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
      } else {
        setTimeLeft(null);
      }

      // Update day label
      setDayLabel(getDayLabel(appointment.date));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [appointment.date, appointment.time]);

  const handleJoinVideo = () => {
    if (!isJoinable) {
      alert("⏰ You can join only 10 minutes before the consultation time.");
      return;
    }
    navigate(`/video/${appointment.id}`);
  };

  return (
    <div
      className="hover:shadow-md transition-all"
      style={{
        background: THEME.white,
        border: `1px solid ${THEME.border}`,
        borderLeft: `4px solid ${THEME.primary}`,
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3
            className="font-semibold text-sm lg:text-base mb-0.5"
            style={{ color: THEME.textPrimary }}
          >
            Dr. {appointment.doctor || "Doctor Name"}
          </h3>
          <p className="text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
            Online Consultation
          </p>
        </div>

        {/* Status Badge */}
        <div className="text-right">
          <div
            className="px-2 py-0.5 text-xs font-medium rounded-full inline-block"
            style={{
              background: "#E8F0FE",
              color: THEME.primary,
            }}
          >
            Confirmed
          </div>
          <p
            className="text-[11px] mt-1 font-medium"
            style={{ color: THEME.textSecondary }}
          >
            {dayLabel}
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div
        className="flex items-center justify-between mb-3 text-xs lg:text-sm"
        style={{ color: THEME.textSecondary }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" style={{ color: THEME.primary }} />
          <span>{appointment.date}</span>
          <Clock className="w-4 h-4 ml-2" style={{ color: THEME.primary }} />
          <span>{appointment.time}</span>
        </div>

        {/* ⏳ Countdown */}
        {timeLeft && (
          <span
            className="text-[11px] lg:text-sm font-medium"
            style={{
              color: isJoinable ? THEME.success : THEME.warning,
            }}
          >
            {isJoinable ? "🟢 You can join now" : `⏳ Starts in ${timeLeft}`}
          </span>
        )}
      </div>

      {/* Patient Info */}
      <div
        className="rounded-md border p-2 lg:p-3 mb-3"
        style={{ borderColor: THEME.border, background: THEME.lightBg }}
      >
        <p
          className="font-semibold text-xs lg:text-sm mb-1 flex items-center gap-1"
          style={{ color: THEME.textPrimary }}
        >
          👤 Patient Details
        </p>
        <ul className="space-y-0.5 text-xs lg:text-sm" style={{ color: THEME.textSecondary }}>
          <li>
            <span className="font-medium">• Name:</span>{" "}
            {appointment.patient || "Unknown"}
          </li>
          {appointment.notes && (
            <li>
              <span className="font-medium">• Notes:</span> {appointment.notes}
            </li>
          )}
        </ul>
      </div>

      {/* Join Button */}
      <button
        onClick={handleJoinVideo}
        disabled={!isJoinable}
        className={`w-full py-2 lg:py-2.5 flex items-center justify-center gap-2 rounded-md font-semibold text-sm transition-all ${
          isJoinable
            ? "text-white hover:opacity-90"
            : "opacity-70 cursor-not-allowed text-white"
        }`}
        style={{
          background: isJoinable ? THEME.primary : THEME.secondary,
          boxShadow: isJoinable ? "0 0 8px rgba(26,115,232,0.4)" : "none",
        }}
      >
        <Video className="w-4 h-4" />
        {isJoinable ? "Join Video Call" : "Join Locked (10 min early)"}
      </button>
    </div>
  );
}

// src/pages/MyBookings.jsx - WITH SIMPLIFIED FILTER & TODAY'S DATA
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Phone, User, RefreshCcw, XCircle, CheckCircle, Clock, MapPin, Video, AlertCircle, ExternalLink, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../utils/auth";

/* ---------- Helpers ---------- */
function safeParse(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function bookingDateTimeObj(b) {
  if (!b || !b.date) return null;
  const dt = new Date(`${b.date}T${b.time || "00:00"}`);
  return isNaN(dt.getTime()) ? null : dt;
}

function isUpcoming(b) {
  const dt = bookingDateTimeObj(b);
  return dt && dt.getTime() >= Date.now();
}

function isToday(b) {
  const dt = bookingDateTimeObj(b);
  if (!dt) return false;
  const today = new Date();
  return dt.getDate() === today.getDate() &&
         dt.getMonth() === today.getMonth() &&
         dt.getFullYear() === today.getFullYear();
}

function formatDate(b) {
  const dt = bookingDateTimeObj(b);
  if (!dt) return b.date || "—";
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(b) {
  return b.time || "—";
}

/* ---------- Component ---------- */
export default function MyBookings() {
  const navigate = useNavigate();
  const { user: ctxUser } = useAuth();
  const currentUser = ctxUser || getCurrentUser() || null;

  const [activeTab, setActiveTab] = useState("online");
  const [statusFilter, setStatusFilter] = useState("upcoming"); // "upcoming", "pending", "rejected", "past"
  const [allBookings, setAllBookings] = useState(() => safeParse("drbooq_bookings", []));

  useEffect(() => {
    function onStorage(e) {
      if (!e.key || e.key === "drbooq_bookings") {
        setAllBookings(safeParse("drbooq_bookings", []));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const myBookings = useMemo(() => {
    if (!currentUser) return [];
    const phone = currentUser.phone || "";
    return allBookings
      .filter((b) => b && String(b.patientContact || "").includes(phone))
      .map((b) => ({ ...b, isUpcoming: isUpcoming(b), isToday: isToday(b) }))
      .sort((a, b) => {
        const aDate = bookingDateTimeObj(a);
        const bDate = bookingDateTimeObj(b);
        if (!aDate || !bDate) return 0;
        return bDate.getTime() - aDate.getTime();
      });
  }, [allBookings, currentUser]);

  const onlineBookings = myBookings.filter((b) => b.bookingType === "online");
  const offlineBookings = myBookings.filter((b) => b.bookingType !== "online");
  const currentBookings = activeTab === "online" ? onlineBookings : offlineBookings;

  // Today's counts for stats
  const todayConfirmed = currentBookings.filter((b) => b.isToday && b.status === "confirmed");
  const todayPending = currentBookings.filter((b) => b.isToday && (b.status === "pending" || b.status === "pending_verification"));
  const todayRejected = currentBookings.filter((b) => b.isToday && b.status === "rejected");
  const todayCompleted = currentBookings.filter((b) => b.isToday && !b.isUpcoming && b.status !== "rejected");

  // Filter based on status filter
  const getFilteredBookings = () => {
    switch (statusFilter) {
      case "upcoming":
        // Show confirmed upcoming appointments
        return currentBookings.filter((b) => b.isUpcoming && b.status === "confirmed");
      case "pending":
        return currentBookings.filter((b) => b.isUpcoming && (b.status === "pending" || b.status === "pending_verification"));
      case "rejected":
        return currentBookings.filter((b) => b.status === "rejected");
      case "past":
        return currentBookings.filter((b) => !b.isUpcoming && b.status !== "rejected");
      default:
        return currentBookings;
    }
  };

  const filteredBookings = getFilteredBookings();

  /* ---------- Actions ---------- */
  function updateBooking(id, updates) {
    const next = allBookings.map((b) => (b.id === id ? { ...b, ...updates } : b));
    saveKey("drbooq_bookings", next);
    setAllBookings(next);
  }

  function handleReschedule(b) {
    const newDate = window.prompt("Enter new date (YYYY-MM-DD):", b.date || "");
    const newTime = window.prompt("Enter new time (HH:MM):", b.time || "");
    if (!newDate || !newTime) return;
    updateBooking(b.id, {
      date: newDate,
      time: newTime,
      status: "pending_verification",
      notes: "Rescheduled by patient. Awaiting doctor confirmation.",
    });
    alert("✅ Reschedule request sent to doctor!");
  }

  function handleRefund(b) {
    if (!window.confirm(`Request refund for ${b.patientName}?`)) return;
    alert(`💸 Refund request initiated. You'll receive confirmation shortly.`);
    updateBooking(b.id, { status: "refunded" });
  }

  function handleJoinCall(b) {
    const meetLink = b.meetLink || `https://meet.google.com/drbooq-${b.id}`;
    window.open(meetLink, "_blank");
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Sign in Required</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Please sign in to view your bookings</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-[#0071BC] text-white rounded-lg font-medium hover:bg-[#005a94] transition text-sm sm:text-base"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">My Bookings</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your appointments</p>
        </div>

        {/* Tabs: Online / Offline */}
        <div className="flex gap-2 mb-4 sm:mb-6 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab("online")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition text-xs sm:text-base ${
              activeTab === "online"
                ? "bg-[#0071BC] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Online ({onlineBookings.length})</span>
            <span className="sm:hidden">Online ({onlineBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("offline")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition text-xs sm:text-base ${
              activeTab === "offline"
                ? "bg-[#0071BC] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Clinic ({offlineBookings.length})</span>
            <span className="sm:hidden">Clinic ({offlineBookings.length})</span>
          </button>
        </div>

        {/* Summary Stats - TODAY'S DATA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-700 font-medium">Confirmed</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">{todayConfirmed.length}</p>
                <p className="text-xs text-blue-600">Today</p>
              </div>
              <CheckCircle className="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-yellow-700 font-medium">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-900">{todayPending.length}</p>
                <p className="text-xs text-yellow-600">Today</p>
              </div>
              <Clock className="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-red-700 font-medium">Rejected</p>
                <p className="text-xl sm:text-2xl font-bold text-red-900">{todayRejected.length}</p>
                <p className="text-xs text-red-600">Today</p>
              </div>
              <AlertCircle className="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{todayCompleted.length}</p>
                <p className="text-xs text-gray-600">Today</p>
              </div>
              <Calendar className="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Filter Dropdown - Below Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071BC] focus:border-transparent"
            >
              <option value="upcoming">Upcoming (Confirmed)</option>
              <option value="pending">Pending Only</option>
              <option value="rejected">Rejected Only</option>
              <option value="past">Past/Completed</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredBookings.map((b) => {
              let cardType = "past";
              if (b.status === "confirmed" && b.isUpcoming) cardType = "confirmed";
              else if ((b.status === "pending" || b.status === "pending_verification") && b.isUpcoming) cardType = "pending";
              else if (b.status === "rejected") cardType = "rejected";

              return (
                <BookingCard 
                  key={b.id} 
                  booking={b} 
                  type={cardType}
                  isOnline={activeTab === "online"}
                  onJoinCall={handleJoinCall}
                  onReschedule={handleReschedule}
                  onRefund={handleRefund}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              {activeTab === "online" ? (
                <Video className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              ) : (
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No Bookings Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {statusFilter === "upcoming" ? "You don't have any upcoming confirmed appointments" : "No bookings match this filter"}
            </p>
            <button
              onClick={() => navigate("/doctors")}
              className="px-6 py-2.5 bg-[#0071BC] text-white rounded-lg font-medium hover:bg-[#005a94] transition text-sm sm:text-base"
            >
              Find a Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Booking Card Component ---------- */
function BookingCard({ booking, type, isOnline, onReschedule, onRefund, onJoinCall }) {
  const b = booking;

  const borderColors = {
    confirmed: "border-blue-200 bg-blue-50/30",
    pending: "border-yellow-200 bg-yellow-50/30",
    rejected: "border-red-200 bg-red-50/30",
    past: "border-gray-200 bg-white",
  };

  return (
    <div className={`rounded-xl border ${borderColors[type]} p-4 sm:p-6 hover:shadow-md transition-all`}>
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Type & Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {isOnline ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
              <Video className="w-3 h-3" />
              Online
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
              <MapPin className="w-3 h-3" />
              Clinic
            </span>
          )}

          {type === "confirmed" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              Confirmed
            </span>
          )}
          {type === "pending" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium">
              <Clock className="w-3 h-3" />
              Pending
            </span>
          )}
          {type === "rejected" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
              <XCircle className="w-3 h-3" />
              Rejected
            </span>
          )}
        </div>

        {/* Doctor Name */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {b.doctorName || "Doctor Appointment"}
        </h3>

        {/* Date & Time */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {formatDate(b)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {formatTime(b)}
          </span>
        </div>

        {/* Patient Info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {b.patientName}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {b.patientContact}
          </span>
        </div>

        {/* Notes */}
        {b.notes && (
          <div className="text-xs sm:text-sm text-gray-600 bg-white/80 p-2.5 sm:p-3 rounded-lg border border-gray-200">
            <span className="font-medium">Note:</span> {b.notes}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          {/* JOIN VIDEO CALL BUTTON for Online Confirmed */}
          {type === "confirmed" && isOnline && (
            <button
              onClick={() => onJoinCall(b)}
              className="w-full px-4 py-2.5 bg-[#0071BC] text-white rounded-lg text-sm font-medium hover:bg-[#005a94] transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Video className="w-4 h-4" />
              Join Video Call
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          {type === "confirmed" && !isOnline && (
            <div className="w-full bg-blue-100 text-blue-800 px-4 py-2.5 rounded-lg text-center text-sm font-medium">
              ✅ Ready for clinic visit
            </div>
          )}

          {type === "pending" && (
            <div className="w-full bg-yellow-100 text-yellow-800 px-4 py-2.5 rounded-lg text-center text-sm font-medium">
              ⏳ Waiting for doctor
            </div>
          )}

          {type === "rejected" && (
            <>
              <button
                onClick={() => onReschedule(b)}
                className="w-full px-4 py-2.5 bg-[#0071BC] text-white rounded-lg text-sm font-medium hover:bg-[#005a94] transition flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Reschedule
              </button>
              <button
                onClick={() => onRefund(b)}
                className="w-full px-4 py-2.5 bg-white border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Request Refund
              </button>
            </>
          )}

          {type === "past" && (
            <div className="w-full bg-gray-100 text-gray-600 px-4 py-2.5 rounded-lg text-center text-sm font-medium">
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
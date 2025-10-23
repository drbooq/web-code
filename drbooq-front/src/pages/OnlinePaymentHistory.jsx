// src/pages/OnlinePaymentHistory.jsx - Mobile Optimized Payment History Dashboard

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
  X,
  CreditCard,
  CheckCircle,
  Clock,
  User,
  ArrowUpRight,
  Eye,
  ChevronDown,
  Activity
} from "lucide-react";

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

export default function OnlinePaymentHistory() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch online doctors
      const doctorRes = await fetch("http://localhost:5000/api/doctors/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const doctorData = await doctorRes.json();
      const onlineDocs = doctorData.filter((d) => d.onlineConsultation);
      setDoctors(onlineDocs);

      // Fetch payments
      const paymentRes = await fetch("http://localhost:5000/api/payment/history", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const paymentData = await paymentRes.json();
      setPayments(paymentData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setPayments([]); // ✅ no mock data, just empty
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser.role || currentUser.role !== "staff") {
    alert("Access denied! This page is for staff members only.");
    navigate("/");
  }
}, [navigate]);

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    if (selectedDoctor && payment.doctorId !== selectedDoctor) return false;

    if (
      searchQuery &&
      !payment.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (statusFilter !== "all" && payment.status !== statusFilter) return false;

    const paymentDate = new Date(payment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (dateRange) {
      case "today":
        return paymentDate >= today;
      case "week":
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return paymentDate >= weekAgo;
      case "month":
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return paymentDate >= monthAgo;
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = calculateStats(filteredPayments, selectedDoctor);

  return (
    <div className="min-h-screen" style={{ background: THEME.bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 shadow-sm"
        style={{ background: THEME.white, borderBottom: `1px solid ${THEME.border}` }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ background: THEME.primary }}
              >
                <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-semibold" style={{ color: THEME.textPrimary }}>
                  Payment History
                </h1>
                <p className="text-xs hidden sm:block" style={{ color: THEME.textSecondary }}>
                  Online consultation earnings
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/staff-dashboard")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition hover:bg-gray-100"
              style={{ color: THEME.textSecondary }}
            >
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6">
        {/* Stats Cards - Mobile: 2x2 Grid, Desktop: 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* Mobile Row 1: Total Earnings & Your Payout */}
          <StatCard
            label="Total Earnings"
            value={`₹${stats.totalEarnings.toLocaleString()}`}
            subtext={`${stats.totalPayments} consults`}
            icon={<DollarSign />}
            color={THEME.success}
            trend="+12.5%"
          />
          <StatCard
            label="Your Payout (88%)"
            value={`₹${stats.yourPayout.toLocaleString()}`}
            subtext={`After commission`}
            icon={<TrendingUp />}
            color={THEME.primary}
          />
          {/* Mobile Row 2: This Month & Pending */}
          <StatCard
            label="This Month"
            value={`₹${stats.monthEarnings.toLocaleString()}`}
            subtext={`${stats.monthPayments} consults`}
            icon={<Calendar />}
            color="#9C27B0"
          />
          <StatCard
            label="Pending"
            value={`₹${stats.pendingAmount.toLocaleString()}`}
            subtext={`${stats.pendingCount} payments`}
            icon={<Clock />}
            color={THEME.warning}
          />
        </div>

        {/* Filters */}
        <div
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm"
          style={{ border: `1px solid ${THEME.border}` }}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: THEME.textSecondary }} />
            <h3 className="font-semibold text-xs sm:text-sm" style={{ color: THEME.textPrimary }}>
              Filters
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {/* Doctor Filter */}
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="px-2.5 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            >
              <option value="">All Doctors</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.fullName}
                </option>
              ))}
            </select>

            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-2.5 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: THEME.border }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: THEME.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                style={{ borderColor: THEME.border }}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDoctor || searchQuery || dateRange !== "all" || statusFilter !== "all") && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t" style={{ borderColor: THEME.border }}>
              <span className="text-xs font-medium" style={{ color: THEME.textSecondary }}>
                Active:
              </span>
              {selectedDoctor && (
                <FilterChip
                  label={`Dr. ${doctors.find((d) => d._id === selectedDoctor)?.fullName}`}
                  onRemove={() => setSelectedDoctor("")}
                />
              )}
              {dateRange !== "all" && (
                <FilterChip
                  label={dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}
                  onRemove={() => setDateRange("all")}
                />
              )}
              {statusFilter !== "all" && (
                <FilterChip
                  label={statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  onRemove={() => setStatusFilter("all")}
                />
              )}
            </div>
          )}
        </div>

        {/* Payments Table */}
        {loading ? (
          <LoadingState />
        ) : filteredPayments.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead style={{ background: THEME.lightBg }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Transaction
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Your Payout
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold" style={{ color: THEME.textSecondary }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment, idx) => (
                    <PaymentRow key={payment.id || idx} payment={payment} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards - Compact Design */}
            <div className="lg:hidden space-y-2 sm:space-y-3">
              {filteredPayments.map((payment, idx) => (
                <PaymentCard key={payment.id || idx} payment={payment} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Stats Card Component - Optimized for mobile
function StatCard({ label, value, subtext, icon, color, trend }) {
  return (
    <div
      className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 border hover:shadow-md transition"
      style={{ borderColor: THEME.border }}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
          {React.cloneElement(icon, { className: "w-3.5 h-3.5 sm:w-5 sm:h-5", style: { color } })}
        </div>
        {trend && (
          <span className="text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full hidden sm:inline-flex" style={{ background: "#E8F5E9", color: "#2E7D32" }}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-base sm:text-2xl font-bold mb-0.5 sm:mb-1 leading-tight" style={{ color: THEME.textPrimary }}>
        {value}
      </p>
      <p className="text-xs font-medium sm:font-normal leading-tight" style={{ color: THEME.textPrimary }}>
        {label}
      </p>
      <p className="text-xs mt-0.5 sm:mt-1 leading-tight" style={{ color: THEME.textSecondary }}>
        {subtext}
      </p>
    </div>
  );
}

// Filter Chip Component
function FilterChip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium"
      style={{ background: "#E8F4FD", color: THEME.primary }}
    >
      <span className="truncate max-w-[120px]">{label}</span>
      <button onClick={onRemove} className="hover:bg-blue-200 rounded-full p-0.5 flex-shrink-0">
        <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </button>
    </span>
  );
}

// Payment Row (Desktop) - No changes
function PaymentRow({ payment }) {
  const commission = payment.amount * 0.12;
  const payout = payment.amount - commission;

  return (
    <tr className="border-b hover:bg-gray-50" style={{ borderColor: THEME.border }}>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium" style={{ color: THEME.textPrimary }}>
            {payment.transactionId}
          </p>
          <p className="text-xs" style={{ color: THEME.textSecondary }}>
            ID: {payment.id}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm" style={{ color: THEME.textPrimary }}>
          Dr. {payment.doctorName}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm" style={{ color: THEME.textPrimary }}>
          {payment.patientName}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm" style={{ color: THEME.textSecondary }}>
          {new Date(payment.date).toLocaleDateString()}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>
          ₹{payment.amount.toLocaleString()}
        </p>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-bold" style={{ color: THEME.success }}>
            ₹{payout.toFixed(0)}
          </p>
          <p className="text-xs" style={{ color: THEME.textSecondary }}>
            -₹{commission.toFixed(0)} (12%)
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={payment.status} />
      </td>
    </tr>
  );
}

// Payment Card (Mobile) - Compact and better organized
function PaymentCard({ payment }) {
  const commission = payment.amount * 0.12;
  const payout = payment.amount - commission;

  return (
    <div className="bg-white rounded-lg p-3 border shadow-sm" style={{ borderColor: THEME.border }}>
      {/* Top Section: Doctor, Patient, Status */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold mb-0.5 truncate" style={{ color: THEME.textPrimary }}>
            Dr. {payment.doctorName}
          </p>
          <p className="text-xs truncate" style={{ color: THEME.textSecondary }}>
            {payment.patientName}
          </p>
        </div>
        <StatusBadge status={payment.status} />
      </div>

      {/* Middle Section: Fee and Payout */}
      <div className="grid grid-cols-2 gap-2 py-2.5 border-t border-b" style={{ borderColor: THEME.border }}>
        <div>
          <p className="text-xs mb-0.5" style={{ color: THEME.textSecondary }}>
            Consultation Fee
          </p>
          <p className="text-base font-bold" style={{ color: THEME.textPrimary }}>
            ₹{payment.amount}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs mb-0.5" style={{ color: THEME.textSecondary }}>
            Your Payout
          </p>
          <p className="text-base font-bold" style={{ color: THEME.success }}>
            ₹{payout.toFixed(0)}
          </p>
          <p className="text-xs" style={{ color: THEME.danger }}>
            -₹{commission.toFixed(0)} (12%)
          </p>
        </div>
      </div>

      {/* Bottom Section: Date and Transaction ID */}
      <div className="flex items-center justify-between mt-2.5 gap-2">
        <p className="text-xs flex-shrink-0" style={{ color: THEME.textSecondary }}>
          {new Date(payment.date).toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short',
            year: 'numeric'
          })}
        </p>
        <p className="text-xs font-mono truncate" style={{ color: THEME.textSecondary }}>
          {payment.transactionId}
        </p>
      </div>
    </div>
  );
}

// Status Badge - Optimized for mobile
function StatusBadge({ status }) {
  const config = {
    completed: { 
      bg: "#E8F5E9", 
      color: "#2E7D32", 
      label: "Completed", 
      icon: <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 
    },
    pending: { 
      bg: "#FFF3CD", 
      color: "#664D03", 
      label: "Pending", 
      icon: <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 
    },
  };

  const style = config[status] || config.pending;

  return (
    <span
      className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
      style={{ background: style.bg, color: style.color }}
    >
      {style.icon}
      <span className="hidden sm:inline">{style.label}</span>
      <span className="sm:hidden">{status === 'completed' ? '✓' : '...'}</span>
    </span>
  );
}

// Loading State
function LoadingState() {
  return (
    <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
      <Activity className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300 animate-spin" />
      <p className="text-sm sm:text-base text-gray-500">Loading payment history...</p>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
      <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
      <p className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No payments found</p>
      <p className="text-xs sm:text-sm text-gray-500">Try adjusting your filters</p>
    </div>
  );
}

// Calculate Stats
function calculateStats(payments, selectedDoctor) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  const commission = totalEarnings * 0.12;
  const yourPayout = totalEarnings - commission;

  const monthPayments = payments.filter((p) => new Date(p.date) >= monthStart);
  const monthEarnings = monthPayments.reduce((sum, p) => sum + p.amount, 0);

  const pending = payments.filter((p) => p.status === "pending");
  const pendingAmount = pending.reduce((sum, p) => sum + (p.amount - p.amount * 0.12), 0);

  return {
    totalEarnings,
    commission,
    yourPayout,
    totalPayments: payments.length,
    monthEarnings,
    monthPayments: monthPayments.length,
    pendingAmount,
    pendingCount: pending.length,
  };
}

 
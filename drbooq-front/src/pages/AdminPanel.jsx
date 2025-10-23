// src/pages/AdminPanel.jsx - PART 1: Main Component & Analytics

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Users, Hospital, Calendar, 
  DollarSign, Activity, Clock, CheckCircle, XCircle, 
  AlertCircle, Eye, EyeOff, ChevronDown, ChevronUp,
  Video, MapPin, Stethoscope, CreditCard, Filter, Download
} from "lucide-react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const THEME = {
  primary: "#0071BC",
  dark: "#003057",
  light: "#E6F3FA",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("today"); // today, week, month, year
  const [masterVisible, setMasterVisible] = useState(true);
  
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  // Load data
// Load data
useEffect(() => {
  const loadData = async () => {
    try {
      // 🏥 Load hospitals from backend
      const hospitalRes = await fetch("http://localhost:5000/api/hospitals/admin/all");
      const hospitalData = await hospitalRes.json();
      setHospitals(hospitalData.hospitals || hospitalData || []);

      // 🩺 Load doctors from backend (both offline & online)
      const doctorRes = await fetch("http://localhost:5000/api/doctors/admin/all");
      const doctorData = await doctorRes.json();
      const allDoctors = Array.isArray(doctorData)
        ? doctorData
        : doctorData.doctors || [];

      // Separate offline and online doctors
      setDoctors(allDoctors.filter((d) => !d.onlineConsultation));
      setOnlineDoctors(allDoctors.filter((d) => d.onlineConsultation));

      // (Optional) Keep old local mock data for bookings and visibility
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const visibility = localStorage.getItem("masterVisibility");

      setBookings(savedBookings);
      setMasterVisible(visibility ? JSON.parse(visibility) : true);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  loadData();
}, []);



  // Calculate analytics
  const analytics = calculateAnalytics(doctors, hospitals, onlineDoctors, bookings, dateRange);

  // Toggle master visibility
 const handleMasterVisibility = async () => {
  const newValue = !masterVisible;
  setMasterVisible(newValue);
  localStorage.setItem("masterVisibility", JSON.stringify(newValue));

  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in as admin.");

    await Promise.all([
      fetch("http://localhost:5000/api/hospitals/toggle-visibility", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ visible: newValue }),
      }),
      fetch("http://localhost:5000/api/doctors/toggle-all-visibility", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ visible: newValue }),
      }),
    ]);

    alert(
      newValue
        ? "👁️ Platform visibility turned ON for patients"
        : "🚫 Platform is now hidden from patients"
    );
  } catch (err) {
    console.error("Visibility update failed:", err);
    alert("⚠️ Failed to update visibility on server.");
  }
};


  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "revenue", label: "Revenue", icon: DollarSign },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "doctors", label: "Doctors", icon: Users },
    { id: "hospitals", label: "Hospitals", icon: Hospital },
    { id: "pending", label: "Pending Approvals", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-500">Manage your healthcare platform</p>
            </div>
            
            {/* Master Visibility Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMasterVisibility}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                  masterVisible
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {masterVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                {masterVisible ? "Platform Visible" : "Platform Hidden"}
              </button>
              
              {/* Date Range Filter */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-1 overflow-x-auto pb-px" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 font-medium text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab.id
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {activeTab === "overview" && <OverviewTab analytics={analytics} />}
        {activeTab === "revenue" && <RevenueTab analytics={analytics} bookings={bookings} />}
        {activeTab === "bookings" && <BookingsTab bookings={bookings} analytics={analytics} />}
        {activeTab === "doctors" && (
          <DoctorsManagementTab 
            offlineDoctors={doctors} 
            onlineDoctors={onlineDoctors}
            setDoctors={setDoctors}
            setOnlineDoctors={setOnlineDoctors}
          />
        )}
        {activeTab === "hospitals" && (
          <HospitalsManagementTab 
            hospitals={hospitals}
            setHospitals={setHospitals}
          />
        )}
        {activeTab === "pending" && (
          <PendingApprovalsTab
            doctors={doctors}
            onlineDoctors={onlineDoctors}
            hospitals={hospitals}
            setDoctors={setDoctors}
            setOnlineDoctors={setOnlineDoctors}
            setHospitals={setHospitals}
          />
        )}
      </div>
    </div>
  );
}

// Analytics Calculation Function
function calculateAnalytics(doctors, hospitals, onlineDoctors, bookings, dateRange) {
  const now = new Date();
  const filterByDate = (date) => {
    const bookingDate = new Date(date);
    switch (dateRange) {
      case "today":
        return bookingDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return bookingDate >= weekAgo;
      case "month":
        return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
      case "year":
        return bookingDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const filteredBookings = bookings.filter(b => filterByDate(b.date || b.createdAt));
  
  // Online vs Offline bookings
  const onlineBookings = filteredBookings.filter(b => b.type === "online");
  const offlineBookings = filteredBookings.filter(b => b.type === "offline");
  
  // Status counts
  const confirmed = filteredBookings.filter(b => b.status === "confirmed").length;
  const pending = filteredBookings.filter(b => b.status === "pending").length;
  const rejected = filteredBookings.filter(b => b.status === "rejected").length;
  
  // Revenue calculation
  const onlineRevenue = onlineBookings.reduce((sum, b) => sum + (b.fee || 0), 0);
  const offlineRevenue = offlineBookings.reduce((sum, b) => sum + 9, 0); // ₹9 per booking
  const totalRevenue = onlineRevenue + offlineRevenue;
  
  // Doctor stats
  const approvedDoctors = doctors.filter(d => d.status === "approved").length;
  const pendingDoctors = doctors.filter(d => d.status === "pending").length;
  const approvedOnlineDoctors = onlineDoctors.filter(d => d.status === "approved").length;
  const pendingOnlineDoctors = onlineDoctors.filter(d => d.status === "pending").length;
  
  // Hospital stats
  const approvedHospitals = hospitals.filter(h => h.status === "approved").length;
  const pendingHospitals = hospitals.filter(h => h.status === "pending").length;

  return {
    totalBookings: filteredBookings.length,
    onlineBookings: onlineBookings.length,
    offlineBookings: offlineBookings.length,
    confirmed,
    pending,
    rejected,
    totalRevenue,
    onlineRevenue,
    offlineRevenue,
    totalDoctors: approvedDoctors + approvedOnlineDoctors,
    offlineDoctors: approvedDoctors,
    onlineDoctorsCount: approvedOnlineDoctors,
    pendingDoctors: pendingDoctors + pendingOnlineDoctors,
    totalHospitals: approvedHospitals,
    pendingHospitals,
    avgBookingValue: filteredBookings.length > 0 ? (totalRevenue / filteredBookings.length) : 0,
    conversionRate: filteredBookings.length > 0 ? ((confirmed / filteredBookings.length) * 100).toFixed(1) : 0,
  };
}

// Overview Tab Component
function OverviewTab({ analytics }) {
  const statCards = [
    {
      label: "Total Revenue",
      value: `₹${analytics.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trending: "up",
      icon: DollarSign,
      color: "bg-green-500",
      subtext: `Online: ₹${analytics.onlineRevenue.toLocaleString()} | Offline: ₹${analytics.offlineRevenue.toLocaleString()}`
    },
    {
      label: "Total Bookings",
      value: analytics.totalBookings,
      change: "+8.2%",
      trending: "up",
      icon: Calendar,
      color: "bg-blue-500",
      subtext: `Online: ${analytics.onlineBookings} | Offline: ${analytics.offlineBookings}`
    },
    {
      label: "Active Doctors",
      value: analytics.totalDoctors,
      change: "+5",
      trending: "up",
      icon: Stethoscope,
      color: "bg-purple-500",
      subtext: `Offline: ${analytics.offlineDoctors} | Online: ${analytics.onlineDoctorsCount}`
    },
    {
      label: "Active Hospitals",
      value: analytics.totalHospitals,
      change: "+2",
      trending: "up",
      icon: Hospital,
      color: "bg-orange-500",
      subtext: `Pending: ${analytics.pendingHospitals}`
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trending === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trending === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Status</h3>
          <Doughnut
            data={{
              labels: ["Confirmed", "Pending", "Rejected"],
              datasets: [{
                data: [analytics.confirmed, analytics.pending, analytics.rejected],
                backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
              }]
            }}
            options={{ plugins: { legend: { position: "bottom" } } }}
          />
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Rate:</span>
              <span className="font-semibold text-green-600">{analytics.conversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Booking Value:</span>
              <span className="font-semibold">₹{analytics.avgBookingValue.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Online vs Offline Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Split</h3>
          <Bar
            data={{
              labels: ["Online Consultations", "Offline Bookings"],
              datasets: [{
                label: "Revenue (₹)",
                data: [analytics.onlineRevenue, analytics.offlineRevenue],
                backgroundColor: ["#0071BC", "#10b981"],
              }]
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <QuickStat 
              icon={CheckCircle}
              label="Confirmed Today"
              value={analytics.confirmed}
              color="text-green-600"
            />
            <QuickStat 
              icon={Clock}
              label="Pending Approvals"
              value={analytics.pending + analytics.pendingDoctors + analytics.pendingHospitals}
              color="text-yellow-600"
            />
            <QuickStat 
              icon={Video}
              label="Online Doctors"
              value={analytics.onlineDoctorsCount}
              color="text-blue-600"
            />
            <QuickStat 
              icon={MapPin}
              label="Offline Doctors"
              value={analytics.offlineDoctors}
              color="text-purple-600"
            />
          </div>
        </div>
      </div>

      {/* Pending Actions Alert */}
      {(analytics.pendingDoctors > 0 || analytics.pendingHospitals > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 mb-1">Pending Approvals</h4>
              <p className="text-sm text-yellow-700 mb-3">
                You have {analytics.pendingDoctors} doctors and {analytics.pendingHospitals} hospitals waiting for approval.
              </p>
              <button 
                onClick={() => window.scrollTo(0, 0)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition"
              >
                Review Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <span className={`text-lg font-bold ${color}`}>{value}</span>
    </div>
  );
}
// PART 2: Revenue, Bookings, and Doctor/Hospital Management Tabs

// Revenue Tab Component
function RevenueTab({ analytics, bookings }) {
  const [view, setView] = useState("summary"); // summary, transactions, export

  // Calculate daily revenue for chart
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const revenueByDay = last7Days.map(day => {
    const dayBookings = bookings.filter(b => {
      const bookingDate = new Date(b.date || b.createdAt);
      return bookingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === day;
    });
    
    const online = dayBookings.filter(b => b.type === "online").reduce((sum, b) => sum + (b.fee || 0), 0);
    const offline = dayBookings.filter(b => b.type === "offline").length * 9;
    
    return { online, offline, total: online + offline };
  });

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold mb-1">₹{analytics.totalRevenue.toLocaleString()}</p>
          <p className="text-xs opacity-75">All transactions</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Online Revenue</p>
          <p className="text-3xl font-bold mb-1">₹{analytics.onlineRevenue.toLocaleString()}</p>
          <p className="text-xs opacity-75">{analytics.onlineBookings} consultations</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Offline Revenue</p>
          <p className="text-3xl font-bold mb-1">₹{analytics.offlineRevenue.toLocaleString()}</p>
          <p className="text-xs opacity-75">{analytics.offlineBookings} bookings × ₹9</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Revenue Trends (Last 7 Days)</h3>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
        
        <Line
          data={{
            labels: last7Days,
            datasets: [
              {
                label: "Online Revenue",
                data: revenueByDay.map(d => d.online),
                borderColor: "#0071BC",
                backgroundColor: "rgba(0, 113, 188, 0.1)",
                tension: 0.4,
              },
              {
                label: "Offline Revenue",
                data: revenueByDay.map(d => d.offline),
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ₹${context.parsed.y}`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `₹${value}`
                }
              }
            }
          }}
        />
      </div>

      {/* Revenue Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
        
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-700">Category</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Bookings</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Avg. Value</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Total Revenue</th>
                <th className="p-3 text-sm font-semibold text-gray-700">% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Online Consultations</span>
                </td>
                <td className="p-3">{analytics.onlineBookings}</td>
                <td className="p-3">₹{analytics.onlineBookings > 0 ? (analytics.onlineRevenue / analytics.onlineBookings).toFixed(0) : 0}</td>
                <td className="p-3 font-semibold text-green-600">₹{analytics.onlineRevenue.toLocaleString()}</td>
                <td className="p-3">{analytics.totalRevenue > 0 ? ((analytics.onlineRevenue / analytics.totalRevenue) * 100).toFixed(1) : 0}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Offline Bookings</span>
                </td>
                <td className="p-3">{analytics.offlineBookings}</td>
                <td className="p-3">₹9</td>
                <td className="p-3 font-semibold text-green-600">₹{analytics.offlineRevenue.toLocaleString()}</td>
                <td className="p-3">{analytics.totalRevenue > 0 ? ((analytics.offlineRevenue / analytics.totalRevenue) * 100).toFixed(1) : 0}%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="p-3">Total</td>
                <td className="p-3">{analytics.totalBookings}</td>
                <td className="p-3">₹{analytics.avgBookingValue.toFixed(0)}</td>
                <td className="p-3 text-green-600">₹{analytics.totalRevenue.toLocaleString()}</td>
                <td className="p-3">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block sm:hidden space-y-3">
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Online Consultations</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Bookings</p>
                <p className="font-bold">{analytics.onlineBookings}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-bold text-green-600">₹{analytics.onlineRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-purple-50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Offline Bookings</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Bookings</p>
                <p className="font-bold">{analytics.offlineBookings}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-bold text-green-600">₹{analytics.offlineRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bookings Tab Component
function BookingsTab({ bookings, analytics }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesType = typeFilter === "all" || b.type === typeFilter;
    const matchesSearch = !searchQuery || 
      b.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.patientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Booking Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total" value={analytics.totalBookings} color="bg-blue-500" />
        <StatCard label="Confirmed" value={analytics.confirmed} color="bg-green-500" />
        <StatCard label="Pending" value={analytics.pending} color="bg-yellow-500" />
        <StatCard label="Rejected" value={analytics.rejected} color="bg-red-500" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg text-sm"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings ({filteredBookings.length})</h3>
        
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.slice(0, 20).map((booking, idx) => (
              <BookingCard key={idx} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border-l-4" style={{ borderLeftColor: color.replace('bg-', '#') }}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function BookingCard({ booking }) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  const typeIcons = {
    online: <Video className="w-4 h-4" />,
    offline: <MapPin className="w-4 h-4" />,
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              {typeIcons[booking.type]}
              {booking.type}
            </span>
          </div>
          
          <h4 className="font-semibold text-gray-900 mb-1">{booking.patientName || "Patient"}</h4>
          <p className="text-sm text-gray-600">Doctor: {booking.doctorName}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(booking.date || booking.createdAt).toLocaleDateString()} at {booking.time}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            ₹{booking.type === "online" ? booking.fee : 9}
          </p>
          <p className="text-xs text-gray-500">{booking.type === "online" ? "Consultation" : "Booking Fee"}</p>
        </div>
      </div>
    </div>
  );
}

// Doctors Management Tab
function DoctorsManagementTab({ offlineDoctors, onlineDoctors, setDoctors, setOnlineDoctors }) {
  const [view, setView] = useState("offline"); // offline, online
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
const handleDelete = async (index, type) => {
  const doctor = type === "offline" ? offlineDoctors[index] : onlineDoctors[index];
  if (!doctor) return;

  if (!window.confirm(`⚠️ Are you sure you want to delete "${doctor.fullName}" permanently?`))
    return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("⚠️ Please log in as admin first.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/doctors/admin/delete/${doctor._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      alert(`❌ ${data.message || "Failed to delete doctor"}`);
      return;
    }

    alert(`✅ Doctor "${doctor.fullName}" deleted successfully`);

    // ✅ Update local state instantly
    if (type === "offline") {
      setDoctors((prev) => prev.filter((d) => d._id !== doctor._id));
    } else {
      setOnlineDoctors((prev) => prev.filter((d) => d._id !== doctor._id));
    }
  } catch (error) {
    console.error("Error deleting doctor:", error);
    alert("⚠️ Server error while deleting doctor. Please try again later.");
  }
};



  const doctors = view === "offline" 
    ? offlineDoctors.filter(d => d.status === "approved")
    : onlineDoctors.filter(d => d.status === "approved");

  const filtered = doctors.filter(d => 
    d.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctors Management</h2>
          <p className="text-sm text-gray-600">Total: {doctors.length} doctors</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("offline")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              view === "offline"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-1" />
            Offline ({offlineDoctors.filter(d => d.status === "approved").length})
          </button>
          <button
            onClick={() => setView("online")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              view === "online"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Video className="w-4 h-4 inline mr-1" />
            Online ({onlineDoctors.filter(d => d.status === "approved").length})
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No doctors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((doc, idx) => (
              <DoctorManagementCard
                key={idx}
                doctor={doc}
                index={idx}
                type={view}
                onDelete={handleDelete}
                onSelect={setSelectedDoctor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DoctorManagementCard({ doctor, index, type, onDelete, onSelect }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex gap-3">
        {doctor.photo ? (
          <img src={doctor.photo} alt={doctor.fullName} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {doctor.fullName?.charAt(0)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{doctor.fullName}</h4>
          <p className="text-sm text-blue-600">{doctor.specialization}</p>
          <p className="text-xs text-gray-500">{doctor.experience} yrs exp | ₹{doctor.fee}</p>
          {type === "offline" && (
            <p className="text-xs text-gray-500">{doctor.hospital}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onSelect(doctor)}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(index, type)}
          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
// PART 3: Hospitals Management & Pending Approvals

// Hospitals Management Tab
function HospitalsManagementTab({ hospitals, setHospitals }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const approvedHospitals = hospitals.filter(h => h.status === "approved");
  
  const filtered = approvedHospitals.filter(h => {
    const matchesSearch = !searchQuery || 
      h.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.district?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !stateFilter || h.state === stateFilter;
    return matchesSearch && matchesState;
  });

  const states = [...new Set(approvedHospitals.map(h => h.state).filter(Boolean))];
const handleDelete = async (id) => {
  if (!window.confirm("⚠️ Are you sure you want to delete this hospital permanently?")) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("⚠️ Please log in as admin first.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/hospitals/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Delete failed:", data);
      alert(`❌ ${data.message || "Failed to delete hospital"}`);
      return;
    }

    alert("✅ Hospital deleted successfully!");
    setHospitals((prev) => prev.filter((h) => h._id !== id));
  } catch (error) {
    console.error("Error deleting hospital:", error);
    alert("⚠️ Server error while deleting hospital. Please try again later.");
  }
};



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospitals Management</h2>
          <p className="text-sm text-gray-600">Total: {approvedHospitals.length} hospitals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg text-sm"
          />
          
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <option value="">All States</option>
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Hospital className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hospitals found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((hospital, idx) => (
              <HospitalManagementCard
                key={hospital.id || idx}
                hospital={hospital}
                onDelete={handleDelete}
                onSelect={setSelectedHospital}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <HospitalDetailsModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
}

function HospitalManagementCard({ hospital, onDelete, onSelect }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex gap-3">
        {hospital.logo ? (
          <img src={hospital.logo} alt={hospital.name} className="w-16 h-16 rounded-lg object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {hospital.name?.charAt(0)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{hospital.name}</h4>
          <p className="text-sm text-blue-600">{hospital.type}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={12} />
            {hospital.district}, {hospital.state}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onSelect(hospital)}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(hospital._id)}
          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function HospitalDetailsModal({ hospital, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Type</p>
                <p className="font-medium">{hospital.type}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Registration</p>
                <p className="font-medium">{hospital.registrationNumber}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">State</p>
                <p className="font-medium">{hospital.state}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">District</p>
                <p className="font-medium">{hospital.district}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">Address</p>
                <p className="font-medium">{hospital.road}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">WhatsApp</p>
                <p className="font-medium">{hospital.whatsapp || hospital.staffPhone}</p>
              </div>
              {hospital.established && (
                <div>
                  <p className="text-gray-500 mb-1">Established</p>
                  <p className="font-medium">{hospital.established}</p>
                </div>
              )}
              {hospital.certifications && (
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Certifications</p>
                  <p className="font-medium">
                    {Array.isArray(hospital.certifications) 
                      ? hospital.certifications.join(", ") 
                      : hospital.certifications}
                  </p>
                </div>
              )}
              {hospital.location && (
                <div className="col-span-2">
                  <a
                    href={hospital.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View on Map →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pending Approvals Tab
function PendingApprovalsTab({ doctors, onlineDoctors, hospitals, setDoctors, setOnlineDoctors, setHospitals }) {
  const [activeSection, setActiveSection] = useState("doctors");

  const pendingDoctors = doctors.filter(d => d.status === "pending");
  const pendingOnline = onlineDoctors.filter(d => d.status === "pending");
  const pendingHospitals = hospitals.filter(h => h.status === "pending");

  const totalPending = pendingDoctors.length + pendingOnline.length + pendingHospitals.length;

const handleVerify = async (index, status, type) => {
  let reason = "";

  if (status === "rejected") {
    reason = prompt("Enter rejection reason:");
    if (!reason) {
      alert("⚠️ Rejection reason is required.");
      return;
    }
  }

  try {
    // 🩺 OFFLINE DOCTOR or 🌐 ONLINE DOCTOR
    if (type === "offline-doctor" || type === "online-doctor") {
      const doctor = type === "offline-doctor" ? doctors[index] : onlineDoctors[index];
      const token = localStorage.getItem("token");

      if (!token) {
        alert("⚠️ Admin not logged in. Please log in again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/doctors/status/${doctor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            rejectionReason: status === "rejected" ? reason : "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Failed to update doctor status."}`);
        return;
      }

      alert(`✅ Doctor ${status} successfully`);

      // ✅ Update frontend state immediately
      const updateState = (prev) =>
        prev.map((d) => (d._id === doctor._id ? data.doctor : d));

      if (type === "offline-doctor") setDoctors(updateState);
      else setOnlineDoctors(updateState);
    }

    // 🏥 HOSPITAL (Server Protected)
    else if (type === "hospital") {
      const hospital = hospitals[index];
      const token = localStorage.getItem("token");

      if (!token) {
        alert("⚠️ Admin not logged in. Please log in again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/hospitals/update-status/${hospital._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            reason: status === "rejected" ? reason : "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Failed to update hospital status."}`);
        return;
      }

      alert(`✅ Hospital ${status} successfully`);

      // ✅ Update frontend state instantly
      const updatedHospitals = hospitals.map((h) =>
        h._id === hospital._id ? data.hospital : h
      );
      setHospitals(updatedHospitals);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("⚠️ Server error while updating status. Please try again later.");
  }
};



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
            <p className="text-sm text-gray-600">{totalPending} items waiting for your review</p>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
        <TabButton
          active={activeSection === "doctors"}
          onClick={() => setActiveSection("doctors")}
          label="Offline Doctors"
          count={pendingDoctors.length}
        />
        <TabButton
          active={activeSection === "online"}
          onClick={() => setActiveSection("online")}
          label="Online Doctors"
          count={pendingOnline.length}
        />
        <TabButton
          active={activeSection === "hospitals"}
          onClick={() => setActiveSection("hospitals")}
          label="Hospitals"
          count={pendingHospitals.length}
        />
      </div>

      {/* Content */}
      {activeSection === "doctors" && (
        <PendingDoctorsList
          doctors={pendingDoctors}
          type="offline-doctor"
          onVerify={handleVerify}
          originalList={doctors}
        />
      )}
      
      {activeSection === "online" && (
        <PendingDoctorsList
          doctors={pendingOnline}
          type="online-doctor"
          onVerify={handleVerify}
          originalList={onlineDoctors}
        />
      )}
      
      {activeSection === "hospitals" && (
        <PendingHospitalsList
          hospitals={pendingHospitals}
          onVerify={handleVerify}
          originalList={hospitals}
        />
      )}
    </div>
  );
}

function TabButton({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label} ({count})
    </button>
  );
}

function PendingDoctorsList({ doctors, type, onVerify, originalList }) {
  const [expanded, setExpanded] = useState(null);

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <p className="text-gray-500">No pending doctors</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {doctors.map((doctor, idx) => {
        const originalIndex = originalList.findIndex(d => d === doctor);
        
        return (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                {doctor.photo ? (
                  <img src={doctor.photo} alt={doctor.fullName} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {doctor.fullName?.charAt(0)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{doctor.fullName}</h4>
                  <p className="text-sm text-blue-600">{doctor.specialization}</p>
                  <p className="text-xs text-gray-500">{doctor.experience} yrs | ₹{doctor.fee}</p>
                  {type === "offline-doctor" && (
                    <p className="text-xs text-gray-500">{doctor.hospital}</p>
                  )}
                </div>

                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {expanded === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onVerify(originalIndex, "approved", type)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button
                  onClick={() => onVerify(originalIndex, "rejected", type)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expanded === idx && (
              <div className="bg-gray-50 border-t p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">License Number</p>
                    <p className="font-medium">{doctor.license}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Experience</p>
                    <p className="font-medium">{doctor.experience} years</p>
                  </div>
                  {type === "offline-doctor" && (
                    <>
                      <div>
                        <p className="text-gray-500 mb-1">State</p>
                        <p className="font-medium">{doctor.state}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">District</p>
                        <p className="font-medium">{doctor.district}</p>
                      </div>
                    </>
                  )}
                  {type === "online-doctor" && doctor.languages && (
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-1">Languages</p>
                      <p className="font-medium">
                        {Array.isArray(doctor.languages) ? doctor.languages.join(", ") : doctor.languages}
                      </p>
                    </div>
                  )}
                  {doctor.education && doctor.education.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-1">Education</p>
                      <p className="font-medium">
                        {doctor.education.map(e => e.degree).filter(Boolean).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PendingHospitalsList({ hospitals, onVerify, originalList }) {
  const [expanded, setExpanded] = useState(null);

  if (hospitals.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <p className="text-gray-500">No pending hospitals</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {hospitals.map((hospital, idx) => {
        const originalIndex = originalList.findIndex(h => h === hospital);
        
        return (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                {hospital.logo ? (
                  <img src={hospital.logo} alt={hospital.name} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {hospital.name?.charAt(0)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                  <p className="text-sm text-blue-600">{hospital.type}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {hospital.district}, {hospital.state}
                  </p>
                </div>

                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {expanded === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onVerify(originalIndex, "approved", "hospital")}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button
                  onClick={() => onVerify(originalIndex, "rejected", "hospital")}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expanded === idx && (
              <div className="bg-gray-50 border-t p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Registration Number</p>
                    <p className="font-medium">{hospital.registrationNumber}</p>
                  </div>
                  {hospital.established && (
                    <div>
                      <p className="text-gray-500 mb-1">Established</p>
                      <p className="font-medium">{hospital.established}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-gray-500 mb-1">Address</p>
                    <p className="font-medium">{hospital.road}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">WhatsApp</p>
                    <p className="font-medium">{hospital.whatsapp || hospital.staffPhone}</p>
                  </div>
                  {hospital.certifications && (
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-1">Certifications</p>
                      <p className="font-medium">
                        {Array.isArray(hospital.certifications) 
                          ? hospital.certifications.join(", ") 
                          : hospital.certifications}
                      </p>
                    </div>
                  )}
                  {hospital.location && (
                    <div className="col-span-2">
                      <a
                        href={hospital.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View on Map →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

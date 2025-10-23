// src/pages/Dashboard.jsx - Updated with Filter & Mobile Tab Design
import React, { useState } from "react";
import { Calendar, Heart, User, Phone, Trash2, Edit3, Bell, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, MapPin, Stethoscope, Mail, LogOut, Eye, Filter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    location.state?.openSavedTab ? "saved" : "overview"
  );

  const navigate = useNavigate();

  // Profile data
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("9876543210");
  const [email, setEmail] = useState("john.doe@example.com");
 
  // Modal states
  const [profileModal, setProfileModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteOtpSent, setDeleteOtpSent] = useState(false);
  const [deleteOtp, setDeleteOtp] = useState("");

  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Apollo Hospital", date: "15/01/2024", time: "10:30 AM", status: "Confirmed", type: "Video" },
    { id: 2, doctor: "Dr. Priya Sharma", specialty: "Neurologist", hospital: "Fortis Hospital", date: "18/01/2024", time: "2:00 PM", status: "Pending", type: "Clinic" },
    { id: 3, doctor: "Dr. Sneha Iyer", specialty: "Dermatologist", hospital: "City Hospital", date: "20/01/2024", time: "4:00 PM", status: "Rejected", type: "Video" },
  ]);

  // Saved hospitals and doctors
  const savedHospitals = [
    { id: 1, name: "Apollo Hospital", location: "Mumbai", type: "Multi-specialty" },
    { id: 2, name: "Fortis Hospital", location: "Delhi", type: "Super-specialty" },
    { id: 3, name: "City Hospital", location: "Bangalore", type: "General" },
  ];

  const savedDoctors = [
    { id: 1, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Apollo Hospital" },
    { id: 2, name: "Dr. Priya Sharma", specialty: "Neurologist", hospital: "Fortis Hospital" },
  ];

  /* ---------------- Profile Edit ---------------- */
  const handleSendOtp = () => {
    if (newPhone.length === 10) {
      setOtpSent(true);
      alert("OTP sent to " + newPhone);
    } else {
      alert("Enter valid 10-digit number");
    }
  };

  const handleVerifyOtp = () => {
    if (!newName.trim()) {
      alert("⚠️ Please enter a valid name");
      return;
    }
    if (otp === "1234") {
      setName(newName);
      setPhone(newPhone);
      setProfileModal(false);
      setOtpSent(false);
      setOtp("");
      setNewName("");
      setNewPhone("");
      alert("✅ Profile updated successfully!");
    } else {
      alert("Invalid OTP (use 1234 as demo)");
    }
  };

  /* ---------------- Account Delete ---------------- */
  const handleDeleteAccount = () => {
    if (deleteOtp !== "1234") {
      alert("❌ Invalid OTP. Use 1234 for demo.");
      return;
    }
    localStorage.removeItem("user");
    alert("🗑️ Account deleted permanently!");
    navigate("/patient-signup");
  };

  /* ---------------- Logout ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  const upcomingCount = appointments.filter(a => a.status === "Confirmed").length;
  const completedCount = 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 sm:py-8">
            <StatCard
              icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#0071BC]" />}
              label="Upcoming"
              value={upcomingCount}
              trend="+2 this week"
              bgColor="bg-blue-50"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
              label="Completed"
              value={completedCount}
              trend="All time"
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
              label="Saved"
              value={savedHospitals.length + savedDoctors.length}
              trend="Hospitals & Doctors"
              bgColor="bg-red-50"
            />
            <StatCard
              icon={<Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
              label="Doctors Visited"
              value="8"
              trend="Unique doctors"
              bgColor="bg-emerald-50"
            />
          </div>

          {/* Navigation Tabs - Updated Mobile Design */}
          <div className="mb-6">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop View - Unchanged */}
              <div className="hidden lg:flex">
                {[
                  { id: "overview", label: "Overview", icon: <TrendingUp className="w-4 h-4" /> },
                  { id: "saved", label: "Saved", icon: <Heart className="w-4 h-4" /> },
                  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap text-base ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-[#0071BC] border-b-2 border-[#0071BC]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile View - Compact Tabs */}
              <div className="flex lg:hidden">
                {[
                  { id: "overview", label: "Overview", icon: <TrendingUp className="w-4 h-4" /> },
                  { id: "saved", label: "Saved", icon: <Heart className="w-4 h-4" /> },
                  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-3 font-medium transition-all text-xs ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-[#0071BC] border-b-2 border-[#0071BC]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6 pb-8">
            {activeTab === "overview" && <OverviewTab appointments={appointments} />}
            {activeTab === "saved" && <SavedTab hospitals={savedHospitals} doctors={savedDoctors} />}
            {activeTab === "profile" && (
              <ProfileTab
                name={name}
                phone={phone}
                email={email}
                setProfileModal={setProfileModal}
                setNewName={setNewName}
                setNewPhone={setNewPhone}
                setDeleteModal={setDeleteModal}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {profileModal && (
        <ProfileModal
          newName={newName}
          newPhone={newPhone}
          otp={otp}
          otpSent={otpSent}
          setNewName={setNewName}
          setNewPhone={setNewPhone}
          setOtp={setOtp}
          handleSendOtp={handleSendOtp}
          handleVerifyOtp={handleVerifyOtp}
          onClose={() => setProfileModal(false)}
        />
      )}

      {deleteModal && (
        <DeleteModal
          deleteOtp={deleteOtp}
          setDeleteOtp={setDeleteOtp}
          deleteOtpSent={deleteOtpSent}
          setDeleteOtpSent={setDeleteOtpSent}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDeleteAccount}
        />
      )}
    </div>
  );
}

/* ---------------- Stat Card Component ---------------- */
function StatCard({ icon, label, value, trend, bgColor }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`${bgColor} p-2 sm:p-3 rounded-lg sm:rounded-xl`}>
          {icon}
        </div>
      </div>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-xs text-gray-500">{trend}</p>
    </div>
  );
}

/* ---------------- Overview Tab ---------------- */
function OverviewTab({ appointments }) {
  const upcoming = appointments.filter(a => a.status === "Confirmed");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Upcoming Appointments</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} compact />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Calendar className="w-12 h-12 text-gray-400" />}
            title="No upcoming appointments"
            description="Book your first appointment to get started"
          />
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <ActivityItem
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            title="Appointment Completed"
            description="Dr. Rajesh Kumar - Cardiologist"
            time="2 days ago"
          />
          <ActivityItem
            icon={<Heart className="w-5 h-5 text-red-600" />}
            title="Hospital Saved"
            description="Apollo Hospital added to favorites"
            time="5 days ago"
          />
          <ActivityItem
            icon={<Calendar className="w-5 h-5 text-[#0071BC]" />}
            title="Appointment Booked"
            description="Dr. Priya Sharma - Neurologist"
            time="1 week ago"
          />
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
}

function AppointmentCard({ appointment, compact = false }) {
  const statusColors = {
    Confirmed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className={`bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 hover:border-[#0071BC] transition-all ${compact ? '' : 'hover:shadow-sm'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{appointment.doctor}</h3>
              <p className="text-xs sm:text-sm text-[#0071BC]">{appointment.specialty}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[appointment.status]}`}>
              {appointment.status}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {appointment.date} • {appointment.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {appointment.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Saved Tab with Filter Dropdown ---------------- */
function SavedTab({ hospitals, doctors }) {
  const [filterType, setFilterType] = useState("all"); // "all", "hospitals", "doctors"

  const handleViewHospital = (hospital) => {
    alert(`Viewing ${hospital.name}\nLocation: ${hospital.location}\nType: ${hospital.type}`);
  };

  const handleViewDoctor = (doctor) => {
    alert(`Viewing ${doctor.name}\nSpecialty: ${doctor.specialty}\nHospital: ${doctor.hospital}`);
  };

  // Filter logic
  const showHospitals = filterType === "all" || filterType === "hospitals";
  const showDoctors = filterType === "all" || filterType === "doctors";

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071BC] focus:border-transparent"
          >
            <option value="all">All Saved Items</option>
            <option value="hospitals">Hospitals Only</option>
            <option value="doctors">Doctors Only</option>
          </select>
        </div>
      </div>

      {/* Saved Hospitals */}
      {showHospitals && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#0071BC]" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Saved Hospitals</h2>
            <span className="ml-auto bg-blue-100 px-2.5 py-1 rounded-full text-sm font-medium text-[#0071BC]">
              {hospitals.length}
            </span>
          </div>

          {hospitals.length > 0 ? (
            <div className="space-y-3">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#0071BC] transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{hospital.name}</h3>
                          <p className="text-xs sm:text-sm text-[#0071BC]">{hospital.type}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-600 transition ml-3">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {hospital.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewHospital(hospital)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0071BC] text-white rounded-lg hover:bg-[#005186] transition text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MapPin className="w-12 h-12 text-gray-400" />}
              title="No saved hospitals"
              description="Start saving your favorite hospitals"
            />
          )}
        </div>
      )}

      {/* Saved Doctors */}
      {showDoctors && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Saved Doctors</h2>
            <span className="ml-auto bg-emerald-100 px-2.5 py-1 rounded-full text-sm font-medium text-emerald-700">
              {doctors.length}
            </span>
          </div>

          {doctors.length > 0 ? (
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{doctor.name}</h3>
                          <p className="text-xs sm:text-sm text-emerald-600">{doctor.specialty}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-600 transition ml-3">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{doctor.hospital}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDoctor(doctor)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Stethoscope className="w-12 h-12 text-gray-400" />}
              title="No saved doctors"
              description="Start saving your favorite doctors"
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Profile Tab ---------------- */
function ProfileTab({ name, phone, email, setProfileModal, setNewName, setNewPhone, setDeleteModal, handleLogout }) {
  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0071BC] to-[#005186] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{name}</h2>
              <p className="text-blue-100 text-sm">Patient ID: #PTN-2024-001</p>
            </div>
            <button
              onClick={() => {
                setProfileModal(true);
                setNewName(name);
                setNewPhone(phone);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0071BC] rounded-lg hover:bg-blue-50 transition font-medium text-sm shadow-lg"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0071BC]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#0071BC]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Your Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl sm:text-3xl font-bold text-[#0071BC]">12</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Appointments</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600">8</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Doctors</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-2xl sm:text-3xl font-bold text-red-600">5</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Hospitals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <LogOut className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Logout</p>
                <p className="text-xs text-gray-500">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => setDeleteModal(true)}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-xl hover:bg-red-50 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-600 text-sm">Delete Account</p>
                <p className="text-xs text-red-500">Permanently remove account</p>
              </div>
            </div>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Empty State ---------------- */
function EmptyState({ icon, title, description }) {
  return (
    <div className="text-center py-8 sm:py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl mb-4">
        {icon}
      </div>
       <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

/* ---------------- Profile Modal with Blue Theme ---------------- */
function ProfileModal({ newName, newPhone, otp, otpSent, setNewName, setNewPhone, setOtp, handleSendOtp, handleVerifyOtp, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#0071BC] focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
            <input
              type="text"
              placeholder="10-digit number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#0071BC] focus:border-transparent text-sm"
            />
          </div>
          {!otpSent ? (
            <button onClick={handleSendOtp} className="w-full px-4 py-3 bg-[#0071BC] text-white rounded-xl font-medium hover:bg-[#005186] transition">
              Send OTP
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0071BC] focus:border-transparent"
              />
              <button onClick={handleVerifyOtp} className="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
                Verify & Save
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Delete Modal ---------------- */
function DeleteModal({ deleteOtp, setDeleteOtp, deleteOtpSent, setDeleteOtpSent, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">Delete Account</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          This will permanently remove your account and all data. This action cannot be undone.
        </p>
        {!deleteOtpSent ? (
          <button
            onClick={() => {
              setDeleteOtpSent(true);
              alert("📲 OTP sent to your phone (use 1234 for demo)");
            }}
            className="w-full px-4 py-3 bg-[#0071BC] text-white rounded-xl font-medium hover:bg-[#005186] transition"
          >
            Send Verification OTP
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter OTP to confirm"
              value={deleteOtp}
              onChange={(e) => setDeleteOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              onClick={onDelete}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
            >
              Permanently Delete Account
            </button>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

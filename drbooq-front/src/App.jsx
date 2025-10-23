  // src/App.jsx
  import React from "react";
  import { Routes, Route, useLocation } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import PrivacyPage from './pages/Privacy';

  import Home from "./pages/Home";
  import OfflineDoctors from "./pages/OfflineDoctors";
  import DoctorProfile from "./pages/DoctorProfile";
  import Booking from "./pages/Booking";
  import MyBookings from "./pages/MyBookings";
  import AdminPanel from "./pages/AdminPanel";
  import Login from "./pages/Login";
  import PatientSignup from "./pages/PatientSignup";
  import StaffSignup from "./pages/StaffSignup";
  import StaffDashboard from "./pages/StaffDashboard";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Hospitals from "./pages/Hospitals";
  import HospitalDetails from "./pages/HospitalDetails";
  import TopMenu from "./components/TopMenu";
   import AddHospital from "./pages/AddHospital";
  import About from "./pages/About";
  import Dashboard from "./pages/PatientDashboard";
  import ArticlePage from "./pages/ArticlePage";
  import LatestArticles from "./components/home/LatestArticles";
  import Contact from "./pages/Contact";
  import Terms from "./pages/Terms";
  import Appointments from "./pages/Appointments";
  import OnlineDoctors from "./pages/OnlineDoctors";
  import AddOnlineDoctor from "./pages/AddOnlineDoctor";
  import AddOfflineDoctor from "./pages/AddOfflineDoctor";
  import HelpCenter from "./pages/HelpCenter";
import PaymentHistory from "./pages/OnlinePaymentHistory";

  export default function App() {
    const location = useLocation();

    // Hide TopMenu on login/signup/staff/appointments pages
    const hideMenuRoutes = [
      "/login",
      "/patient-Signup",
      "/staff-signup",
      "/staff-dashboard",
      "/doctor/register-staff",
      "/appointments", // ✅ ADDED - Hide TopMenu on appointments page
      "/add-online-doctor",
      "/add-offline-doctor",
      "/online-payment-history",
      "/admin",
    ];
    const shouldShowMenu = !hideMenuRoutes.includes(location.pathname);

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {shouldShowMenu && <TopMenu />}
        {shouldShowMenu && <div className="h-14" />}

        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />

            {/* Doctor Routes */}
            <Route path="/offline-doctors" element={<OfflineDoctors />} />
            <Route path="/online-consultation" element={<OnlineDoctors />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/online-doctor/:id" element={<DoctorProfile />} />

            {/* Hospital Routes */}
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/register-hospital" element={<AddHospital />} />

            {/* Info Pages */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpCenter />} />

            {/* Articles */}
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/articles" element={<LatestArticles />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/patient-signup" element={<PatientSignup />} />
            <Route path="/staff-signup" element={<StaffSignup />} />

            {/* Booking Routes */}
            <Route path="/booking/:id" element={<Booking />} />
 
            {/* Patient Routes - Protected */}
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes */}
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/doctor/register-staff" element={<AddOfflineDoctor />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/add-online-doctor" element={<AddOnlineDoctor />} />
            <Route path="/add-offline-doctor" element={<AddOfflineDoctor />} />
                    <Route path="/online-payment-history" element={<PaymentHistory />} />


            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />} />

            {/* Fallback - Redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    );
  }

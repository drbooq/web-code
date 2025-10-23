// src/pages/PatientSignup.jsx
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "../hooks/useTypingEffect";

export default function PatientSignup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api"; // ✅ Backend URL

  const text = useTypingEffect(
    ["Join DRBOOQ Today", "Book Doctors in Minutes", "Healthcare Made Simple"],
    100,
    50,
    2000
  );

/* ---------------- Step 1: Send OTP ---------------- */
/* ---------------- Step 1: Send OTP ---------------- */
/* ---------------- Step 1: Send OTP ---------------- */
const handleSendOtp = async () => {
  if (!name.trim() || !phone.trim()) {
    alert("⚠️ Please fill all required fields");
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert("⚠️ Please enter a valid 10-digit mobile number");
    return;
  }

  try {
    // ✅ 1️⃣ Check if already exists as PATIENT
    const patientRes = await fetch(`${API_BASE}/patient/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const patientData = await patientRes.json();

    if (patientRes.ok && patientData.user) {
      alert("⚠️ This phone number is already registered as a Patient.\nPlease log in instead.");
      navigate("/login");
      return;
    }

    // ✅ 2️⃣ Check if already exists as STAFF
    const staffRes = await fetch(`${API_BASE}/staff/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const staffData = await staffRes.json();

    if (staffRes.ok && staffData.staff) {
      alert("⚠️ This phone number belongs to a Staff account.\nPlease use Staff Login instead.");
      navigate("/login");
      return;
    }

    // ✅ 3️⃣ If new → send OTP (demo)
    alert(`📲 OTP sent to ${phone} (Demo: use 1234)`);
    setStep(2);
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Server error. Please try again later.");
  }
};

 useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const staff = localStorage.getItem("staff");
    if (currentUser || staff) {
      alert("🚫 You are already logged in! Please logout before signing up again.");
      navigate("/", { replace: true });
    }
  }, [navigate]);


  /* ------------------ Step 2: Verify OTP & Register ------------------ */
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("⚠️ Please enter the OTP");
      return;
    }

    if (otp !== "1234") {
      alert("❌ Invalid OTP. Use 1234 for demo.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/patient/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify({ ...data.patient, role: "patient" }));
        alert("✅ Signup successful!");
        navigate("/");
      } else {
        alert(`⚠️ ${data.message || "Signup failed"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server connection failed. Please check your backend.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      
      {/* ✅ LEFT SIDE - DESKTOP - UNCHANGED */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#0071BC] to-[#003057] px-6 py-12 text-white text-center overflow-hidden">
        {/* Glow circles background */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Typing Text */}
        <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold h-16 transition-all duration-500 ease-in-out">
          {text}
          <span className="border-r-2 border-white animate-pulse ml-1"></span>
        </h2>
        <p className="relative z-10 mt-4 text-lg opacity-90 max-w-md">
          Secure • Trusted • Easy to use
        </p>
      </div>

      {/* ✅ RIGHT SIDE - DESKTOP UNCHANGED + MOBILE WITH BLUE HEADER */}
      <div className="relative flex items-center justify-center bg-white px-4 sm:px-6 py-8 sm:py-12 lg:bg-white lg:px-4 lg:sm:px-6 lg:py-8 lg:sm:py-12 min-h-screen lg:min-h-0">
        
        {/* ✅ MOBILE ONLY: Blue Header at Top */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#0071BC] to-[#005a94] lg:hidden"></div>
        
        <div className="w-full max-w-md relative z-10">
          
          {/* ✅ DESKTOP: Original card, MOBILE: Improved card with border */}
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border-2 border-gray-100 lg:border-0 lg:shadow-lg lg:rounded-2xl lg:p-6 lg:sm:p-8">
            
            {/* Mobile: Show logo/brand at top - UNCHANGED */}
            <div className="text-center mb-6 lg:hidden">
              <h2 className="text-2xl font-bold text-[#0071BC]">DRBOOQ</h2>
              <p className="text-xs text-gray-500 mt-1">Healthcare Made Simple</p>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#003057] mb-2">
              Create{" "}
              <span className="text-[#0071BC]">Account</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Sign up with your phone number</p>

            {/* Step 1 - Name & Phone WITH +91 */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-sm sm:text-base"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
                    Full Name *
                  </label>
                </div>

                {/* Phone Number WITH +91 */}
                <div className="relative">
                  {/* ✅ +91 Prefix - centered vertically */}
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium text-sm sm:text-base pointer-events-none z-10">
                    +91
                  </span>
                  
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    maxLength="10"
                    className="peer w-full border border-[#E5E9EB] rounded-lg pl-14 pr-4 py-3 focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
                    style={{ paddingTop: '12px', paddingBottom: '12px' }}
                  />
                  
                  {/* ✅ Floating label - only shows on focus or when filled */}
                  {(phone || document.activeElement === document.querySelector('input[type="tel"]')) && (
                    <label className="absolute left-14 -top-2 text-[#0071BC] text-xs bg-white px-1">
                      Phone Number *
                    </label>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={!name || !phone}
                  className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold shadow-md transition text-sm sm:text-base ${
                    name && phone
                      ? "bg-[#0071BC] hover:bg-[#005a94] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* Step 2 - OTP Verification */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  We've sent a verification code to <strong className="text-[#0071BC]">+91 {phone}</strong>
                </p>

                {/* OTP Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter OTP *"
                    maxLength="4"
                    className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-center text-xl sm:text-2xl tracking-widest"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
                    Enter OTP *
                  </label>
                </div>

                <p className="text-xs text-center text-gray-500">
                  Demo: Use <strong>1234</strong> as OTP
                </p>

                <button
                  onClick={handleVerifyOtp}
                  disabled={!otp}
                  className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold shadow-md transition text-sm sm:text-base ${
                    otp
                      ? "bg-[#0071BC] hover:bg-[#005a94] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Verify OTP & Signup
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                  }}
                  className="w-full text-center text-xs sm:text-sm text-gray-500 hover:text-[#0071BC] transition-colors font-medium"
                >
                  ← Back to edit phone number
                </button>
              </div>
            )}

            {/* Footer - UNCHANGEDddd */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-7">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#0071BC] font-semibold hover:underline"
              >
                Login
              </a>
            </p>

            <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            are you doctor?{" "}
              <a
                href="/staff-signup"
                className="text-[#003057] font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

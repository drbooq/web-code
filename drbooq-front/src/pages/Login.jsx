// import React, { useState } from "react";
// import { Phone, Key } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import useTypingEffect from "../hooks/useTypingEffect";

// export default function Login() {
//   const [step, setStep] = useState(1);
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [userType, setUserType] = useState(null);
//   const navigate = useNavigate();

//   const API_BASE = "http://localhost:5000/api"; // ✅ backend base URL

//   const text = useTypingEffect(
//     ["Welcome to DRBOOQ", "Your Trusted Health Partner"],
//     100,
//     50,
//     1500
//   );

//   /* ---------------- handlers ---------------- */

//   // ✅ Send OTP — check in backend if phone exists in either staff or patient
//   const handleSendOtp = async () => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phoneRegex.test(phone)) {
//       alert("⚠️ Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       // 1️⃣ Try finding in patient collection
//       let res = await fetch(`${API_BASE}/patient/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone }),
//       });

//       let data = await res.json();

//       if (res.ok) {
//         setUserType("patient");
//         setStep(2);
//         alert(`✅ OTP sent to ${phone} (Demo: 1234)`);
//         return;
//       }

//       // 2️⃣ If not found as patient, try staff
//       res = await fetch(`${API_BASE}/staff/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone }),
//       });

//       data = await res.json();

//       if (res.ok) {
//         setUserType("staff");
//         setStep(2);
//         alert(`✅ OTP sent to ${phone} (Demo: 1234)`);
//       } else {
//         alert("⚠️ No account found. Please sign up first.");
//         navigate("/patient-signup");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Server error. Please try again later.");
//     }
//   };

//   // ✅ Verify OTP
//   const handleVerifyOtp = async () => {
//     if (otp !== "1234") {
//       alert("❌ Invalid OTP (Demo: use 1234)");
//       return;
//     }

//     try {
//       let res, data;

//       if (userType === "patient") {
//         res = await fetch(`${API_BASE}/patient/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone }),
//         });
//         data = await res.json();

//         if (res.ok) {
//           localStorage.setItem("currentUser", JSON.stringify({ ...data.user, role: "patient" }));
//           alert("✅ Patient login successful");
//           navigate("/");
//         } else {
//           alert("⚠️ Patient not found. Please sign up first.");
//           navigate("/patient-signup");
//         }
//       } else if (userType === "staff") {
//         res = await fetch(`${API_BASE}/staff/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone }),
//         });
//         data = await res.json();
// if (res.ok) {
//   // ✅ Save both for compatibility
//   localStorage.setItem("currentUser", JSON.stringify({ ...data.staff, role: "staff" }));
//   localStorage.setItem("staff", JSON.stringify({ ...data.staff }));

//   alert("✅ Staff login successful!");
//   navigate("/staff-dashboard");
// }
//  else {
//           alert("⚠️ Staff not found. Please sign up first.");
//           navigate("/staff-signup");
//         }
//       } else {
//         alert("⚠️ Something went wrong. Please try again.");
//         setStep(1);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Error verifying OTP");
//     }
//   };
import React, { useState, useEffect } from "react";
import { Phone, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "../hooks/useTypingEffect";

export default function Login() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api";
  const text = useTypingEffect(
    ["Welcome to DRBOOQ", "Your Trusted Health Partner"],
    100,
    50,
    1500
  );

  // ✅ CHECK IF ALREADY LOGGED IN - Redirect to appropriate dashboard
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const staff = localStorage.getItem("staff");
    
    if (currentUser || staff) {
      const user = currentUser ? JSON.parse(currentUser) : JSON.parse(staff);
      
      if (user.role === "staff" || staff) {
        alert("✅ Already logged in as Staff");
        navigate("/staff-dashboard", { replace: true });
      } else {
        alert("✅ Already logged in as Patient");
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      // Check if patient
      let res = await fetch(`${API_BASE}/patient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      let data = await res.json();

      if (res.ok) {
        setUserType("patient");
        setStep(2);
        alert(`✅ OTP sent to ${phone} (Demo: 1234)`);
        return;
      }

      // Check if staff
      res = await fetch(`${API_BASE}/staff/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      data = await res.json();

      if (res.ok) {
        setUserType("staff");
        setStep(2);
        alert(`✅ OTP sent to ${phone} (Demo: 1234)`);
      } else {
        alert("⚠️ No account found. Please sign up first.");
        navigate("/patient-signup");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Please try again later.");
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async () => {
    if (otp !== "1234") {
      alert("❌ Invalid OTP (Demo: use 1234)");
      return;
    }

    try {
      // Clear all old data before logging in new user
      localStorage.removeItem("token");
      localStorage.removeItem("staff");
      localStorage.removeItem("currentUser");

      let res, data;

      if (userType === "patient") {
        res = await fetch(`${API_BASE}/patient/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        data = await res.json();

        if (res.ok) {
          localStorage.setItem("currentUser", JSON.stringify({ ...data.user, role: "patient" }));
          alert("✅ Patient login successful");
          navigate("/");
        } else {
          alert("⚠️ Patient not found. Please sign up first.");
          navigate("/patient-signup");
        }
      } else if (userType === "staff") {
        res = await fetch(`${API_BASE}/staff/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("staff", JSON.stringify(data.staff));
          localStorage.setItem("currentUser", JSON.stringify({ ...data.staff, role: "staff" }));

          alert("✅ Staff login successful!");
          navigate("/staff-dashboard");
        } else {
          alert("⚠️ Staff not found. Please sign up first.");
          navigate("/staff-signup");
        }
      } else {
        alert("⚠️ Something went wrong. Please try again.");
        setStep(1);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error verifying OTP");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      
      {/* LEFT SIDE - DESKTOP */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#0071BC] to-[#003057] px-6 py-10 text-white text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold h-16 transition-all duration-500 ease-in-out leading-tight">
          {text}
          <span className="border-r-2 border-white animate-pulse ml-1"></span>
        </h2>
        <p className="relative z-10 mt-4 text-lg opacity-90 max-w-sm">
          Secure • Trusted • Private
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center bg-white px-4 sm:px-6 py-8 sm:py-12 lg:bg-white lg:px-4 lg:sm:px-6 lg:py-8 lg:sm:py-12 min-h-screen lg:min-h-0">
        
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#0071BC] to-[#005a94] lg:hidden"></div>
        
        <div className="w-full max-w-md relative z-10">
          
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border-2 border-gray-100 lg:border-0 lg:shadow-lg lg:rounded-2xl lg:p-6 lg:sm:p-8">
            
            <div className="text-center mb-6 lg:hidden">
              <h2 className="text-2xl font-bold text-[#0071BC]">DRBOOQ</h2>
              <p className="text-xs text-gray-500 mt-1">Your Trusted Health Partner</p>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#003057] mb-2">
              Welcome <span className="text-[#0071BC]">Back</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Login with your phone number</p>

            {/* Step 1 → Phone */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
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
                  
                  {(phone || document.activeElement === document.querySelector('input[type="tel"]')) && (
                    <label className="absolute left-14 -top-2 text-[#0071BC] text-xs bg-white px-1">
                      Phone Number *
                    </label>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={!phone}
                  className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold shadow-md transition text-sm sm:text-base ${
                    phone
                      ? "bg-[#0071BC] hover:bg-[#005a94] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* Step 2 → OTP */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  We've sent a verification code to <strong className="text-[#0071BC]">+91 {phone}</strong>
                </p>

                {userType && (
                  <div className={`p-2.5 sm:p-3 rounded-lg text-center font-semibold text-xs sm:text-sm ${
                    userType === "staff" 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}>
                    {userType === "staff" ? "🏥 Staff Login" : "👤 Patient Login"}
                  </div>
                )}

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
                  Verify OTP & Login
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setUserType(null);
                  }}
                  className="w-full text-center text-xs sm:text-sm text-gray-500 hover:text-[#0071BC] transition-colors font-medium"
                >
                  ← Back to edit phone number
                </button>
              </div>
            )}

            <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-7">
              Don't have an account?{" "}
              <a
                href="/patient-signup"
                className="text-[#0071BC] font-semibold hover:underline"
              >
                Sign up as Patient
              </a>
            </p>

            <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              Hospital staff?{" "}
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

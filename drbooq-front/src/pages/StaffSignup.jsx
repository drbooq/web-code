// // src/pages/StaffSignup.jsx
// import React, { useState,useEffect } from "react";
// import { ArrowRight, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function StaffSignup() {
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState({
//     staffName: "",
//     designation: "",
//     phone: "",
//     email: "",
//   });
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const API_BASE = "http://localhost:5000/api"; // ✅ Backend URL

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const prevStep = () => setStep((prev) => prev - 1);

//   /* ---------------- Step 1: Send OTP ---------------- */
//  /* ---------------- Step 1: Send OTP ---------------- */
// /* ---------------- Step 1: Send OTP ---------------- */
// const handleSendOtp = async () => {
//   if (!form.staffName || !form.designation || !form.phone) {
//     alert("⚠️ Please fill all required fields");
//     return;
//   }

//   const phoneRegex = /^[6-9]\d{9}$/;
//   if (!phoneRegex.test(form.phone)) {
//     alert("⚠️ Please enter a valid 10-digit mobile number");
//     return;
//   }

//   try {
//     // ✅ 1️⃣ Check if already exists in STAFF
//     const staffRes = await fetch(`${API_BASE}/staff/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone: form.phone }),
//     });

//     const staffData = await staffRes.json();

//     if (staffRes.ok && staffData.staff) {
//       alert("⚠️ This phone number is already registered as Staff.\nPlease log in instead.");
//       navigate("/login");
//       return;
//     }

//     // ✅ 2️⃣ Check if already exists in PATIENT
//     const patientRes = await fetch(`${API_BASE}/patient/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone: form.phone }),
//     });

//     const patientData = await patientRes.json();

//     if (patientRes.ok && patientData.user) {
//       alert("⚠️ This phone number is already registered as a Patient.\nPlease log in instead.");
//       navigate("/login");
//       return;
//     }

//     // ✅ 3️⃣ If not found in either → allow OTP
//     alert(`📲 OTP sent to ${form.phone} (Demo: use 1234)`);
//     setStep(2);
//   } catch (err) {
//     console.error("Error:", err);
//     alert("❌ Server error. Please try again later.");
//   }
// };

//   useEffect(() => {
//     const currentUser = localStorage.getItem("currentUser");
//     const staff = localStorage.getItem("staff");

//     if (currentUser || staff) {
//       const user = currentUser ? JSON.parse(currentUser) : JSON.parse(staff);

//       if (user.role === "staff" || staff) {
//         alert("✅ Already logged in as Staff. Please logout first.");
//         navigate("/staff-dashboard", { replace: true });
//       } else {
//         alert("✅ Already logged in as Patient. Please logout first.");
//         navigate("/", { replace: true });
//       }
//     }
//   }, [navigate]);

//   /* ---------------- Step 2: Verify OTP & Signup ---------------- */
// /* ---------------- Step 2: Verify OTP & Signup ---------------- */
// const handleVerifyOtp = async () => {
//   if (!otp) {
//     alert("⚠️ Please enter OTP");
//     return;
//   }

//   if (otp !== "1234") {
//     alert("❌ Invalid OTP. Use 1234 for demo.");
//     return;
//   }

//   try {
//     const res = await fetch(`${API_BASE}/staff/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: form.staffName,
//         designation: form.designation,
//         phone: form.phone,
//         email: form.email,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // ✅ Clear old login/signup data to prevent cross-account bugs
//       localStorage.removeItem("token");
//       localStorage.removeItem("staff");
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("hospital");

//       // ✅ Save new signup data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("staff", JSON.stringify(data.staff));
//       localStorage.setItem(
//         "currentUser",
//         JSON.stringify({ ...data.staff, role: "staff" })
//       );

//       alert("✅ Staff signup successful!");
//       navigate("/staff-dashboard");
//     } else {
//       alert(`⚠️ ${data.message || "Signup failed"}`);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("❌ Could not connect to server. Check backend connection..");
//   }
// };



//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      
//       {/* ✅ LEFT SIDE - DESKTOP - UNCHANGED */}
//       <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#0071BC] to-[#003057] px-6 py-12 text-white text-center overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>
//         <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>

//         <div className="relative z-10 space-y-4 animate-fadeIn">
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//             Welcome to <span className="text-yellow-300">DRBOOQ</span>
//           </h1>

//           <p className="text-lg md:text-xl font-medium opacity-90">
//             Simplify Hospital & Doctor Management
//           </p>

//           <p className="text-sm md:text-base italic opacity-80">
//             "Empowering healthcare with smarter connections."
//           </p>
//         </div>

//         <style>
//           {`
//             @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//             .animate-fadeIn { animation: fadeIn 1s ease-in-out forwards; }
//           `}
//         </style>
//       </div>

//       {/* ✅ RIGHT SIDE - DESKTOP UNCHANGED + MOBILE WITH BLUE HEADER */}
//       <div className="relative flex items-center justify-center bg-white px-4 sm:px-6 py-8 sm:py-12 lg:bg-white lg:px-4 lg:sm:px-6 lg:py-8 lg:sm:py-12 min-h-screen lg:min-h-0">
        
//         {/* ✅ MOBILE ONLY: Blue Header at Top */}
//         <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#0071BC] to-[#005a94] lg:hidden"></div>
        
//         <div className="w-full max-w-md relative z-10">
          
//           {/* ✅ DESKTOP: Original card, MOBILE: Improved card with border */}
//           <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border-2 border-gray-100 lg:border-0 lg:shadow-lg lg:rounded-2xl lg:p-6 lg:sm:p-8">
            
//             {/* Mobile: Show logo/brand at top - UNCHANGED */}
//             <div className="text-center mb-6 lg:hidden">
//               <h2 className="text-2xl font-bold text-[#0071BC]">DRBOOQ</h2>
//               <p className="text-xs text-gray-500 mt-1">Doctor Registration</p>
//             </div>

//             {/* STEP 0 → Welcome Intro */}
//             {step === 0 && (
//               <div className="text-center space-y-4 sm:space-y-6">
//                 <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003057] mb-2">
//                   Create Your Account
//                 </h1>
//                 <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
//                   Join the <span className="text-[#0071BC] font-semibold">DRBOOQ</span> healthcare platform.  
//                   Easily manage your hospital, doctors, and appointments in one place.
//                 </p>

//                 <div className="bg-[#F8FAFC] border border-[#E1EAF2] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm text-gray-600 leading-relaxed shadow-inner">
//                   <ul className="text-left list-disc list-inside space-y-1">
//                     <li>Register your hospital and staff.</li>
//                     <li>Manage doctors and appointments.</li>
//                     <li>Enable both offline & online consultations.</li>
//                   </ul>
//                 </div>

//                 <button
//                   onClick={() => setStep(1)}
//                   className="bg-[#0071BC] hover:bg-[#005A91] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:shadow-xl transition-all w-full sm:w-auto"
//                 >
//                   Get Started <ArrowRight className="inline-block ml-2 w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             {/* STEP 1 → Staff Details WITH +91 */}
//             {step === 1 && (
//               <div className="space-y-4 sm:space-y-6">
//                 <h1 className="text-2xl sm:text-4xl font-extrabold text-[#003057] mb-2">
//                   Doctor <span className="text-[#0071BC]">Registration</span>
//                 </h1>
//                 <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
//                   Enter your hospital doctor details to proceed
//                 </p>

//                 {/* Staff Name */}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="staffName"
//                     value={form.staffName}
//                     onChange={handleChange}
//                     required
//                     placeholder="Full Name *"
//                     className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-sm sm:text-base"
//                   />
//                   <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
//                      Full Name *
//                   </label>
//                 </div>

//                 {/* Designation */}
//                 <div>
//                   <select
//                     name="designation"
//                     value={form.designation}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-[#E5E9EB] rounded-lg px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
//                   >
//                     <option value="">Select Designation *</option>
//                     <option value="Doctor">Doctor</option>
//                     <option value="Receptionist">Receptionist</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Nurse">Nurse</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 {/* Phone WITH +91 */}
//                 <div className="relative">
//                   {/* ✅ +91 Prefix - centered vertically */}
//                   <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium text-sm sm:text-base pointer-events-none z-10">
//                     +91
//                   </span>
                  
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     required
//                     placeholder="WhatsApp Number *"
//                     maxLength="10"
//                     className="peer w-full border border-[#E5E9EB] rounded-lg pl-14 pr-4 py-3 focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
//                     style={{ paddingTop: '12px', paddingBottom: '12px' }}
//                   />
                  
//                   {/* ✅ Floating label - only shows on focus or when filled */}
//                   {(form.phone || document.activeElement?.name === 'phone') && (
//                     <label className="absolute left-14 -top-2 text-[#0071BC] text-xs bg-white px-1">
//                       WhatsApp Number *
//                     </label>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="Official Email (optional)"
//                     className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-sm sm:text-base"
//                   />
//                   <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
//                     Official Email (optional)
//                   </label>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-2 sm:gap-3">
//                   <button
//                     onClick={() => setStep(0)}
//                     className="flex-1 flex items-center justify-center gap-2 border py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
//                   >
//                     <ArrowLeft className="w-4 h-4" /> Back
//                   </button>
//                   <button
//                     disabled={!form.staffName || !form.designation || !form.phone}
//                     onClick={handleSendOtp}
//                     className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
//                       form.staffName && form.designation && form.phone
//                         ? "bg-[#0071BC] text-white hover:bg-[#005a94]"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Send OTP <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//                     <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
//             not a doctor?{" "}
//               <a
//                 href="/patient-signup"
//                 className="text-[#003057] font-semibold hover:underline"
//               >
//                 Register here
//               </a>
//             </p>
//               </div>
//             )}

//             {/* STEP 2 → OTP Verification */}
//             {step === 2 && (
//               <div className="space-y-4 sm:space-y-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-[#003057] text-center">Verify OTP</h2>
//                 <p className="text-sm sm:text-base text-gray-600 text-center">
//                   We've sent an OTP to <b>+91 {form.phone}</b>
//                 </p>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Enter OTP *"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     maxLength="4"
//                     required
//                     className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-center text-xl sm:text-2xl tracking-widest"
//                   />
//                   <label className="absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
//                     Enter OTP *
//                   </label>
//                 </div>

//                 <p className="text-xs text-center text-gray-500">
//                   Demo: Use <strong>1234</strong> as OTP
//                 </p>

//                 <div className="flex gap-2 sm:gap-3">
//                   <button
//                     onClick={prevStep}
//                     className="flex-1 flex items-center justify-center gap-2 border py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
//                   >
//                     <ArrowLeft className="w-4 h-4" /> Back
//                   </button>
//                   <button
//                     disabled={!otp}
//                     onClick={handleVerifyOtp}
//                     className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
//                       otp
//                         ? "bg-[#0071BC] text-white hover:bg-[#005a94]"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Verify & Signup
//                   </button>
//                 </div>
               
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/StaffSignup.jsx - WITH ROLE SELECTION
import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Users, Stethoscope, Hospital } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffSignup() {
  const [step, setStep] = useState(-1); // -1 = Role Selection, 0 = Welcome, 1 = Form, 2 = OTP
  const [form, setForm] = useState({
    staffName: "",
    designation: "",
    phone: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const prevStep = () => setStep((prev) => prev - 1);

  /* ---------------- Step 1: Send OTP ---------------- */
  const handleSendOtp = async () => {
    if (!form.staffName || !form.designation || !form.phone) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("⚠️ Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      // Check if already exists in STAFF
      const staffRes = await fetch(`${API_BASE}/staff/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });

      const staffData = await staffRes.json();

      if (staffRes.ok && staffData.staff) {
        alert("⚠️ This phone number is already registered as Staff.\nPlease log in instead.");
        navigate("/login");
        return;
      }

      // Check if already exists in PATIENT
      const patientRes = await fetch(`${API_BASE}/patient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });

      const patientData = await patientRes.json();

      if (patientRes.ok && patientData.user) {
        alert("⚠️ This phone number is already registered as a Patient.\nPlease log in instead.");
        navigate("/login");
        return;
      }

      alert(`📲 OTP sent to ${form.phone} (Demo: use 1234)`);
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
      const user = currentUser ? JSON.parse(currentUser) : JSON.parse(staff);

      if (user.role === "staff" || staff) {
        alert("✅ Already logged in as Staff. Please logout first.");
        navigate("/staff-dashboard", { replace: true });
      } else {
        alert("✅ Already logged in as Patient. Please logout first.");
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  /* ---------------- Step 2: Verify OTP & Signup ---------------- */
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("⚠️ Please enter OTP");
      return;
    }

    if (otp !== "1234") {
      alert("❌ Invalid OTP. Use 1234 for demo.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/staff/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.staffName,
          designation: form.designation,
          phone: form.phone,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("staff");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("hospital");

        localStorage.setItem("token", data.token);
        localStorage.setItem("staff", JSON.stringify(data.staff));
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...data.staff, role: "staff" })
        );

        alert("✅ Staff signup successful!");
        navigate("/staff-dashboard");
      } else {
        alert(`⚠️ ${data.message || "Signup failed"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Could not connect to server. Check backend connection..");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      
      {/* LEFT SIDE - DESKTOP */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#0071BC] to-[#003057] px-6 py-12 text-white text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>

        <div className="relative z-10 space-y-4 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-yellow-300">DRBOOQ</span>
          </h1>

          <p className="text-lg md:text-xl font-medium opacity-90">
            Simplify Hospital & Doctor Management
          </p>

          <p className="text-sm md:text-base italic opacity-80">
            "Empowering healthcare with smarter connections."
          </p>
        </div>

        <style>
          {`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .animate-fadeIn { animation: fadeIn 1s ease-in-out forwards; }
          `}
        </style>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center bg-white px-4 sm:px-6 py-8 sm:py-12 min-h-screen lg:min-h-0">
        
        {/* MOBILE ONLY: Blue Header */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#0071BC] to-[#005a94] lg:hidden"></div>
        
        <div className="w-full max-w-md relative z-10">
          
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border-2 border-gray-100 lg:border-0">
            
            {/* Mobile Logo */}
            <div className="text-center mb-6 lg:hidden">
              <h2 className="text-2xl font-bold text-[#0071BC]">DRBOOQ</h2>
              <p className="text-xs text-gray-500 mt-1">Registration</p>
            </div>

            {/* STEP -1: Role Selection */}
       {step === -1 && (
  <div
    className="
      space-y-6 
      sm:space-y-8 
      mt-[-2rem] sm:mt-0           /* ✅ shift up on mobile */
      scale-[0.95] sm:scale-100    /* ✅ slightly smaller on mobile */
      transition-transform
    "
  >
    <div className="text-center space-y-2">
      <h1 className="text-xl sm:text-3xl font-extrabold text-[#003057]">
        Who are you?
      </h1>
      <p className="text-xs sm:text-base text-gray-600">
        Select your role to continue
      </p>
    </div>

    <div className="space-y-3 sm:space-y-4">
      {/* Doctor / Hospital Staff Option */}
      <button
        onClick={() => setStep(0)}
        className="
          w-full group relative overflow-hidden
          bg-gradient-to-r from-[#0071BC] to-[#005a94]
          hover:from-[#005a94] hover:to-[#003057]
          text-white rounded-xl
          p-4 sm:p-6
          transition-all duration-300 shadow-lg hover:shadow-xl
          transform hover:-translate-y-1
          flex items-center min-h-[120px] sm:min-h-[140px]
        "
      >
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
        <div className="relative flex items-center gap-3 sm:gap-4 w-full">
          <div className="bg-white/20 p-2 sm:p-3 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-base sm:text-xl font-bold">
              Doctor / Hospital Staff
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Manage hospital & appointments
            </p>
          </div>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* Patient Option */}
      <button
        onClick={() => navigate("/patient-signup")}
        className="
          w-full group relative overflow-hidden
          bg-white hover:bg-gray-50
          border-2 border-gray-200 hover:border-[#0071BC]
          text-gray-800 rounded-xl
          p-4 sm:p-6
          transition-all duration-300 shadow-md hover:shadow-lg
          transform hover:-translate-y-1
          flex items-center min-h-[120px] sm:min-h-[140px]
        "
      >
        <div className="relative flex items-center gap-3 sm:gap-4 w-full">
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg group-hover:bg-blue-100 transition flex items-center justify-center">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#0071BC]" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-base sm:text-xl font-bold text-gray-900">
              Patient
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Book appointments & consult doctors
            </p>
          </div>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-[#0071BC] group-hover:translate-x-1 transition-all" />
        </div>
      </button>
    </div>

    <div className="text-center pt-2 sm:pt-4">
      <p className="text-xs sm:text-sm text-gray-500">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-[#0071BC] font-semibold hover:underline"
        >
          Login here
        </a>
      </p>
    </div>
  </div>
)}


            {/* STEP 0: Welcome Intro */}
            {step === 0 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003057] mb-2">
                  Create Your Account
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  Join the <span className="text-[#0071BC] font-semibold">DRBOOQ</span> healthcare platform.  
                  Easily manage your hospital, doctors, and appointments in one place.
                </p>

                <div className="bg-[#F8FAFC] border border-[#E1EAF2] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm text-gray-600 leading-relaxed shadow-inner">
                  <ul className="text-left list-disc list-inside space-y-1">
                    <li>Register your hospital and staff.</li>
                    <li>Manage doctors and appointments.</li>
                    <li>Enable both offline & online consultations.</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(-1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    <ArrowLeft className="inline-block mr-2 w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-[#0071BC] hover:bg-[#005A91] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all"
                  >
                    Get Started <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: Staff Details */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#003057] mb-2">
                  Doctor <span className="text-[#0071BC]">Registration</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
                  Enter your hospital doctor details to proceed
                </p>

                {/* Staff Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="staffName"
                    value={form.staffName}
                    onChange={handleChange}
                    required
                    placeholder="Full Name *"
                    className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-sm sm:text-base"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
                     Full Name *
                  </label>
                </div>

                {/* Designation */}
                <div>
                  <select
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#E5E9EB] rounded-lg px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
                  >
                    <option value="">Select Designation *</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Phone WITH +91 */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium text-sm sm:text-base pointer-events-none z-10">
                    +91
                  </span>
                  
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="WhatsApp Number *"
                    maxLength="10"
                    className="peer w-full border border-[#E5E9EB] rounded-lg pl-14 pr-4 py-3 focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
                    style={{ paddingTop: '12px', paddingBottom: '12px' }}
                  />
                  
                  {(form.phone || document.activeElement?.name === 'phone') && (
                    <label className="absolute left-14 -top-2 text-[#0071BC] text-xs bg-white px-1">
                      WhatsApp Number *
                    </label>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Official Email (optional)"
                    className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-sm sm:text-base"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
                    Official Email (optional)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="flex-1 flex items-center justify-center gap-2 border py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    disabled={!form.staffName || !form.designation || !form.phone}
                    onClick={handleSendOtp}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                      form.staffName && form.designation && form.phone
                        ? "bg-[#0071BC] text-white hover:bg-[#005a94]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#003057] text-center">Verify OTP</h2>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  We've sent an OTP to <b>+91 {form.phone}</b>
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter OTP *"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="4"
                    required
                    className="peer w-full border border-[#E5E9EB] rounded-lg px-4 pt-5 pb-2 focus:ring-2 focus:ring-[#0071BC] placeholder-transparent text-center text-xl sm:text-2xl tracking-widest"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[#0071BC]">
                    Enter OTP *
                  </label>
                </div>

                <p className="text-xs text-center text-gray-500">
                  Demo: Use <strong>1234</strong> as OTP
                </p>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={prevStep}
                    className="flex-1 flex items-center justify-center gap-2 border py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    disabled={!otp}
                    onClick={handleVerifyOtp}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                      otp
                        ? "bg-[#0071BC] text-white hover:bg-[#005a94]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Verify & Signup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
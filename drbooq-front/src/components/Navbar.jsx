// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation added
import { LogOut, Settings, CalendarCheck, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../utils/auth";

function formatMemberSince(user) {
  if (!user) return "";
  const keys = ["createdAt", "created_at", "joinedAt", "joined_at", "signupAt", "signup_at"];
  for (const k of keys) {
    if (user[k]) {
      try {
        return new Date(user[k]).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
        });
      } catch {}
    }
  }
  return null;
}

function readBookingCount(user) {
  try {
    const raw = JSON.parse(localStorage.getItem("drbooq_bookings") || "[]");
    if (!user) return raw.length;
    const id = user.id || user._id || null;
    return raw.filter((b) => b?.patientId && id && String(b.patientId) === String(id)).length;
  } catch {
    return 0;
  }
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Track current route
  const { user: authUser, updateUser } = useAuth() || {};
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  const [user, setUser] = useState(() => {
    const staffData = JSON.parse(localStorage.getItem("staff") || "null");
    const persisted = getCurrentUser();
    return authUser || staffData || persisted || null;
  });

  const [bookingCount, setBookingCount] = useState(() => readBookingCount(user));
  const memberSince = formatMemberSince(user);
  const isStaff = user && (user.role === "staff" || localStorage.getItem("staff"));

  // ✅ UPDATED - Only block booking/payment/my-bookings for staff
  useEffect(() => {
    const staffData = localStorage.getItem("staff");
    const isStaffUser = staffData !== null;

    if (!isStaffUser) return; // Not staff, allow all routes

    // ✅ ONLY these routes are restricted for staff
    const restrictedRoutes = [
      "/booking/",      // Booking pages
      "/payment",       // Payment page
      "/my-bookings",   // My Bookings page
      "/dashboard"      // Patient Dashboard
    ];

    // Check if current route is restricted
    const isRestricted = restrictedRoutes.some(route => 
      location.pathname.startsWith(route) || location.pathname === route
    );

    if (isRestricted) {
      alert("⚠️ Staff members cannot book appointments or make payments. Please use the Staff Dashboard.");
      navigate("/staff-dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const syncUser = () => {
      const staffData = JSON.parse(localStorage.getItem("staff") || "null");
      const persisted = getCurrentUser();
      setUser(authUser || staffData || persisted || null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, [authUser]);

  useEffect(() => {
    const onStorage = () => {
      setBookingCount(readBookingCount(getCurrentUser() || user));
      setUser(getCurrentUser() || user);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

function handleLogout() {
  try {
    if (typeof updateUser === "function") updateUser(null);
  } catch {}

  // ✅ Full localStorage cleanup
  const keepKeys = []; // keep only if you want to preserve something like theme later
  Object.keys(localStorage).forEach((key) => {
    if (!keepKeys.includes(key)) localStorage.removeItem(key);
  });

  // Optional: if you also store tokens/cookies separately
  sessionStorage.clear();

  setUser(null);
  setOpen(false);
  setMobileMenu(false);

  alert("👋 Logged out successfully!");
  navigate("/login", { replace: true });

  // ✅ Small delay before reload to ensure navigate completes
  setTimeout(() => window.location.reload(), 200);
}


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu((prev) => !prev)}
                className="sm:hidden relative w-5 h-4 flex flex-col justify-between items-center focus:outline-none group"
              >
                <span
                  className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenu
                      ? "rotate-45 translate-y-[6px] bg-[#0071BC]"
                      : "bg-[#003057] group-hover:bg-[#0071BC]"
                  }`}
                ></span>
                <span
                  className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenu
                      ? "opacity-0"
                      : "bg-[#003057] group-hover:bg-[#0071BC]"
                  }`}
                ></span>
                <span
                  className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenu
                      ? "-rotate-45 -translate-y-[6px] bg-[#0071BC]"
                      : "bg-[#003057] group-hover:bg-[#0071BC]"
                  }`}
                ></span>
              </button>

              <Link to="/" className="flex items-center gap-2 no-underline">
                <img
                  src="/images/logo/logo.jpg"
                  alt="Logo"
                  className="hidden sm:block h-9 w-9 rounded-full object-cover"
                />
                <div className="text-2xl sm:text-3xl font-extrabold text-[#005186] tracking-tight">
                  DRBOOQ
                </div>
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 sm:gap-5">
              {!isStaff && (
                <span
                  onClick={() => navigate("/staff-signup")}
                  className="hidden sm:inline text-sm text-[#4A4A4A] cursor-pointer hover:text-[#003057]"
                >
                  For doctors
                </span>
              )}
              <span className="hidden sm:inline text-sm text-[#4A4A4A] cursor-pointer hover:text-[#003057]">
                Get the app
              </span>

              {user ? (
                <>
                  {isStaff ? (
                    <button
                      onClick={() => navigate("/appointments")}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md bg-[#0071BC] text-white text-sm font-semibold hover:bg-[#005a94] transition"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Appointments
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/my-bookings")}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md bg-[#0071BC] text-white text-sm font-semibold hover:bg-[#005a94] transition"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      My Bookings
                      {bookingCount > 0 && (
                        <span className="ml-1 bg-white text-[#0071BC] rounded-full px-2 py-0.5 text-xs font-bold">
                          {bookingCount}
                        </span>
                      )}
                    </button>
                  )}

                  <div className="hidden sm:block relative" ref={menuRef}>
                    <button
                      onClick={() => setOpen((v) => !v)}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium text-[#003057] rounded-md hover:bg-gray-50 transition"
                    >
                      Profile
                    </button>

                 {open && (
  <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
    <div className="px-4 py-3 border-b bg-gray-50">
      <div className="text-sm font-semibold text-[#003057]">My Account</div>
      <div className="text-xs text-[#4A4A4A]">
        {user?.name || user?.staffName || "User"}
      </div>
      {memberSince && (
        <div className="text-xs text-gray-400">Member since {memberSince}</div>
      )}
    </div>

    <div className="flex flex-col divide-y divide-gray-100">
      {user ? (
        isStaff ? (
          /* 🧑‍⚕️ STAFF MENU */
          <>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/staff-dashboard");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Staff Dashboard
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/appointments");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              View Appointments
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/online-payment-history");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Payment History
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/app-download");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Get the App
            </button>
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </>
        ) : (
          /* 🧍‍♂️ PATIENT MENU */
          <>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/dashboard");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Dashboard / Profile
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/my-bookings");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              My Bookings
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/dashboard", { state: { openSavedTab: true } });
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Saved Doctors & Hospitals
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/app-download");
              }}
              className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
            >
              Get the App
            </button>
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )
      ) : (
        /* 🚪 NOT LOGGED IN MENU */
        <>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/patient-signup");
            }}
            className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
          >
            For Patients
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/staff-signup");
            }}
            className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
          >
            For Doctors / Staff
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/app-download");
            }}
            className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
          >
            Get the App
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
          >
            Login
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/patient-signup");
            }}
            className="px-4 py-2 text-sm text-left text-[#003057] hover:bg-[#E6F3FA]"
          >
            Signup
          </button>
        </>
      )}
    </div>
  </div>
)}

                  </div>

                  <button
                    onClick={() =>
                      navigate(isStaff ? "/appointments" : "/my-bookings")
                    }
                    className="sm:hidden px-3 py-1.5 rounded-md bg-[#0071BC] text-white text-sm font-semibold"
                  >
                    {isStaff ? "Appointments" : "My Bookings"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-md border border-[#0071BC] text-[#0071BC] text-sm font-semibold hover:bg-[#E6F3FA] transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/patient-signup")}
                    className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-md bg-[#0071BC] text-white text-sm font-semibold hover:bg-[#005a94] transition"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
    {/* Mobile Dropdown */}
{mobileMenu && (
  <div className="sm:hidden border-t border-gray-200 bg-white shadow-md">
    <div className="flex flex-col p-3 space-y-2">
      {user ? (
        isStaff ? (
          /* 🧑‍⚕️ STAFF MENU */
          <>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/staff-dashboard");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Profile / Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/appointments");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              View Appointments
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/online-payment-history");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Payment History
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/app-download");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Get the App
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                handleLogout();
              }}
              className="w-full text-left text-red-600 text-sm font-medium py-2 px-2 rounded hover:bg-red-50"
            >
              Logout
            </button>
          </>
        ) : (
          /* 🧍‍♂️ PATIENT MENU */
          <>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/dashboard");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Profile / Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/my-bookings");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              My Bookings
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/dashboard", { state: { openSavedTab: true } });
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Saved Doctors & Hospitals
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/app-download");
              }}
              className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
            >
              Get the App
            </button>
            <button
              onClick={() => {
                setMobileMenu(false);
                handleLogout();
              }}
              className="w-full text-left text-red-600 text-sm font-medium py-2 px-2 rounded hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )
      ) : (
        /* 🚪 NOT LOGGED IN MENU */
        <>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/patient-signup");
            }}
            className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
          >
            For Patients
          </button>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/staff-signup");
            }}
            className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
          >
            For Doctors / Staff
          </button>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/app-download");
            }}
            className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
          >
            Get the App
          </button>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/login");
            }}
            className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
          >
            Login
          </button>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/patient-signup");
            }}
            className="w-full text-left text-[#003057] text-sm font-medium py-2 px-2 rounded hover:bg-[#E6F3FA]"
          >
            Signup
          </button>
        </>
      )}
    </div>
  </div>
)}

      </nav>

      <div className="h-14 sm:h-16" />
    </>
  );
}

import React, { useState } from "react";
import { Building2, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import indiaData from "../../data/indiaStatesDistricts.json";

export default function NearHospitals() {
  const [stateVal, setStateVal] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const states = indiaData.states ? indiaData.states.map((item) => item.state) : [];
  const districts = stateVal
    ? indiaData.states.find((s) => s.state === stateVal)?.districts || []
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stateVal) {
      alert("⚠️ Please select a state first.");
      return;
    }
    navigate(`/hospitals?state=${stateVal}&district=${district}`);
  };

  return (
    <section
      className="
        font-['Inter','Helvetica Neue',Arial,sans-serif]
        py-8 sm:py-16          /* ⬅️ slightly reduced top/bottom padding on desktop */
        -mt-4 sm:-mt-10        /* ⬅️ only desktop view moved upward */
      "
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full">
        {/* ✅ Blue Box Wrapper */}
        <div className="bg-[#E9F2FA] rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-16 items-center">
            
            {/* ✅ LEFT Section */}
            <div className="space-y-3 sm:space-y-8 text-center sm:text-left">
              <h2 className="text-[1.8rem] sm:text-[2.4rem] font-bold text-[#003057] leading-snug">
                Find Near{" "}
                <span className="text-[#0071BC]">Hospitals & Clinics</span>
              </h2>

              {/* Shorter Text for Mobile */}
              <p className="sm:hidden text-[0.82rem] text-[#003057] leading-snug max-w-xs mx-auto">
                Find nearby trusted hospitals and clinics quickly and securely.
              </p>
              <p className="hidden sm:block text-lg text-[#003057] leading-relaxed max-w-lg">
                Locate trusted healthcare facilities in your area. Browse verified hospitals and clinics with complete details.
              </p>

              {/* ✅ Features — visible only on desktop */}
              <div className="space-y-5 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#0071BC]" />
                  </div>
                  <span className="text-[1.05rem] text-[#003057] font-medium">
                    Multi-specialty hospitals
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <Star className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-[1.05rem] text-[#003057] font-medium">
                    Verified ratings & reviews
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#0071BC]" />
                  </div>
                  <span className="text-[1.05rem] text-[#003057] font-medium">
                    Real-time availability
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ RIGHT: Search Box */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-10 border border-[#E5E9EB]">
              <h3 className="text-[0.95rem] sm:text-[1.4rem] font-semibold text-center text-[#003057]">
                Search <span className="text-[#0071BC]">Hospitals</span>
              </h3>

              <form onSubmit={handleSubmit} className="mt-4 sm:mt-8 space-y-3 sm:space-y-5">
                {/* State Dropdown */}
                <select
                  value={stateVal}
                  onChange={(e) => {
                    setStateVal(e.target.value);
                    setDistrict("");
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#E5E9EB] rounded-md focus:ring-2 focus:ring-[#0071BC] text-[#003057] text-[0.8rem] sm:text-base"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {/* District Dropdown */}
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!stateVal}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md text-[0.8rem] sm:text-base focus:ring-2 focus:ring-[#0071BC] ${
                    !stateVal
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                      : "bg-white border-[#E5E9EB] text-[#003057]"
                  }`}
                >
                  <option value="">
                    {stateVal ? "Select District" : "Choose State First"}
                  </option>
                  {districts.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 bg-[#0071BC] text-white text-[0.85rem] sm:text-base font-semibold rounded-full hover:bg-[#005a94] transition-all duration-300"
                >
                  Find Hospitals
                </button>
              </form>

              <p className="mt-3 text-center text-[0.7rem] sm:text-sm text-[#4A4A4A]">
                Can’t find your location?{" "}
                <a
                  href="/hospitals"
                  className="text-[#0071BC] font-medium hover:underline"
                >
                  Browse all →
                </a>
              </p>
            </div>
          </div>

          {/* ✅ Bottom Stats */}
          <div className="mt-6 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">
            <div>
              <p className="text-[1.2rem] sm:text-[2rem] font-bold text-[#003057]">500+</p>
              <p className="text-[0.75rem] sm:text-base text-[#003057] mt-1 sm:mt-2">
                Partner Hospitals
              </p>
            </div>
            <div>
              <p className="text-[1.2rem] sm:text-[2rem] font-bold text-teal-700">50+</p>
              <p className="text-[0.75rem] sm:text-base text-[#003057] mt-1 sm:mt-2">
                Cities Covered
              </p>
            </div>
            <div>
              <p className="text-[1.2rem] sm:text-[2rem] font-bold text-[#003057]">24/7</p>
              <p className="text-[0.75rem] sm:text-base text-[#003057] mt-1 sm:mt-2">
                Support
              </p>
            </div>
            <div>
              <p className="text-[1.2rem] sm:text-[2rem] font-bold text-teal-600">98%</p>
              <p className="text-[0.75rem] sm:text-base text-[#003057] mt-1 sm:mt-2">
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

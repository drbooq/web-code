// src/pages/Hospitals.jsx - MOBILE OPTIMIZED

import React, { useEffect, useState, useMemo } from "react";
import { MapPin, Star, Search, Hospital, Building, X ,Heart} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import indiaData from "../data/indiaStatesDistricts.json";

const THEME = {
  primary: "#0071BC",
  dark: "#003057",
  light: "#E6F3FA",
  text: "#4A4A4A",
  bg: "#FFFFFF",
};

export default function Hospitals() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const [stateVal, setStateVal] = useState(queryParams.get("state") || "");
  const [district, setDistrict] = useState(queryParams.get("district") || "");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
useEffect(() => {
  const fetchHospitals = async () => {
    try {
const res = await fetch("http://localhost:5000/api/hospitals/public/all");
      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to load hospitals:", data.message);
        return;
      }

      

  const visibleHospitals = data.hospitals.filter(
  (h) => h.status === "approved"
);
setHospitals(visibleHospitals);

    } catch (error) {
      console.error("Error loading hospitals:", error);
    }
  };

  fetchHospitals();
}, []);

  const states = useMemo(() => {
    return indiaData.states ? indiaData.states.map((s) => s.state) : [];
  }, []);

  const districts = useMemo(() => {
    const selected = indiaData.states?.find((s) => s.state === stateVal);
    return selected ? selected.districts : [];
  }, [stateVal]);

  const types = [
    "Multi-specialty",
    "Super-specialty",
    "Clinic",
    "Nursing Home",
    "Diagnostic Center",
    "Private Practice",
  ];

  const filteredHospitals = hospitals.filter((h) => {
    return (
      (!stateVal || h.state === stateVal) &&
      (!district || h.district === district) &&
      (!type || h.type === type) &&
      (!search || h.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleResetFilters = () => {
    setStateVal("");
    setDistrict("");
    setType("");
    setSearch("");
  };

  const hasActiveFilters = stateVal || district || type || search;

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${THEME.light} 0%, #B3E0F7 100%)`,
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
            border: `1px solid ${THEME.light}`,
          }}
          className="sm:rounded-[16px] sm:p-6 sm:mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl sm:text-2xl md:text-4xl font-bold mb-1"
                style={{ color: THEME.dark }}
              >
                Find <span style={{ color: THEME.primary }}>Hospitals & Clinics</span>
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: THEME.text }}>
                Discover trusted healthcare facilities near you
              </p>
            </div>
            <Hospital size={40} style={{ color: THEME.primary }} className="hidden sm:block" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold" style={{ color: THEME.dark }}>
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
                style={{ color: THEME.primary }}
              >
                <X size={14} />
                Reset
              </button>
            )}
          </div>

          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 mb-3 sm:mb-4">
            {/* State */}
            <select
              value={stateVal}
              onChange={(e) => {
                setStateVal(e.target.value);
                setDistrict("");
              }}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!stateVal}
              style={{
                border: `1px solid ${THEME.light}`,
                background: !stateVal ? "#F9FAFB" : "white",
              }}
              className="w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {stateVal ? "All Districts" : "Select State"}
              </option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by hospital name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-1">
          <span className="font-semibold" style={{ color: THEME.primary }}>
            {filteredHospitals.length}
          </span>{" "}
          hospitals found
        </p>

        {/* Hospitals List */}
        {filteredHospitals.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
            <Building size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-base sm:text-lg mb-2">No hospitals found</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}/* Hospital Card - WITH SAVE/FAVORITE BUTTON */
/* Hospital Card - WITH SAVE/FAVORITE BUTTON (Hidden for Staff) */
function HospitalCard({ hospital, navigate }) {
  const [isSaved, setIsSaved] = useState(false);
  
  // ✅ Check if user is staff
  const isStaff = localStorage.getItem("staff") !== null;

  // Check if hospital is saved on mount
  useEffect(() => {
    // Only check saved status if NOT staff
    if (!isStaff) {
      const savedHospitals = JSON.parse(localStorage.getItem("savedHospitals") || "[]");
      setIsSaved(savedHospitals.some(h => h.id === hospital.id));
    }
  }, [hospital.id, isStaff]);

  const handleSaveToggle = (e) => {
    e.stopPropagation(); // Prevent card click
    
    // Prevent staff from saving
    if (isStaff) {
      alert("⚠️ Staff members cannot save hospitals.");
      return;
    }
    
    let savedHospitals = JSON.parse(localStorage.getItem("savedHospitals") || "[]");
    
    if (isSaved) {
      // Remove from saved
      savedHospitals = savedHospitals.filter(h => h.id !== hospital.id);
      setIsSaved(false);
    } else {
      // Add to saved
      savedHospitals.push(hospital);
      setIsSaved(true);
    }
    
    localStorage.setItem("savedHospitals", JSON.stringify(savedHospitals));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-400 p-3 sm:p-4 hover:shadow-md transition-shadow relative">
      {/* ✅ SAVE BUTTON - Top Right (Hidden for Staff) */}
    {/* ✅ MOBILE-ONLY Save Icon (Hidden on Desktop) */}
{!isStaff && (
  <button
    onClick={handleSaveToggle}
    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 sm:hidden"
    title={isSaved ? 'Remove from saved' : 'Save hospital'}
  >
    <Heart
      size={20}
      className={`transition-all ${
        isSaved
          ? 'fill-red-500 stroke-red-500'
          : 'stroke-gray-400 hover:stroke-red-500'
      }`}
    />
  </button>
)}

      {/* MOBILE: Stack Vertically */}
      <div className="flex flex-col sm:hidden space-y-3">
        {/* Top Row: Logo + Name */}
        <div className={`flex gap-3 ${!isStaff ? 'pr-8' : ''}`}>
          {hospital.logo ? (
            <img
              src={hospital.logo}
              alt={hospital.name}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0 bg-blue-50"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg flex items-center justify-center font-bold text-3xl text-blue-600 flex-shrink-0 bg-blue-50">
              {hospital.name?.charAt(0)?.toUpperCase() || "H"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
              {hospital.name}
            </h3>
            <p className="text-blue-600 text-base font-medium mb-1">
              {hospital.type}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{hospital.district}, {hospital.state}</span>
        </div>

        {/* Specialties */}
        {hospital.specialties && hospital.specialties.length > 0 && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Specialties:</span> {hospital.specialties.slice(0, 2).join(", ")}
            {hospital.specialties.length > 2 && "..."}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star size={16} fill="#FFC107" stroke="#FFC107" />
          <span className="text-base font-medium text-gray-900">
            {hospital.rating || "N/A"}
          </span>
          <span className="text-sm text-gray-500">
            ({hospital.reviews || 0})
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() =>
              navigate(`/hospital/${hospital._id}`, { state: { hospital } })
            }
            className="flex-1 px-4 py-2.5 bg-[#0071BC] text-white text-base font-semibold rounded-lg hover:bg-[#005A91] transition"
          >
            View Details
          </button>
          <button
            onClick={() =>
              navigate(`/hospital/${hospital._id}?tab=doctors`, { state: { hospital } })
            }
            className="px-4 py-2.5 border border-[#0071BC] text-[#0071BC] text-base font-semibold rounded-lg hover:bg-[#E6F3FA] transition"
          >
            Doctors
          </button>
        </div>
      </div>

   {/* DESKTOP: Horizontal Layout */}
<div className="hidden sm:flex items-center justify-between gap-6">
  {/* LEFT: Logo + Info */}
  <div className={`flex items-center gap-4 flex-1 ${!isStaff ? 'pr-8' : ''}`}>
    {hospital.logo ? (
      <img
        src={hospital.logo}
        alt={hospital.name}
        className="w-32 h-32 rounded-lg object-cover flex-shrink-0 bg-blue-50 shadow-sm"
      />
    ) : (
      <div className="w-32 h-32 rounded-lg flex items-center justify-center font-bold text-5xl text-blue-600 flex-shrink-0 bg-blue-50 shadow-sm">
        {hospital.name?.charAt(0)?.toUpperCase() || "H"}
      </div>
    )}

    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">
        {hospital.name}
      </h3>
      <p className="text-blue-600 text-base font-medium mb-2">
        {hospital.type}
      </p>

      <div className="flex items-start gap-2 text-base text-gray-600 mb-2">
        <MapPin size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
        <span>{hospital.state}, {hospital.district}, {hospital.road}</span>
      </div>

      {hospital.specialties && hospital.specialties.length > 0 && (
        <div className="text-base text-gray-600 mb-2">
          <span className="font-medium">Specialties:</span>{" "}
          {hospital.specialties.slice(0, 2).join(", ")}
          {hospital.specialties.length > 2 && "..."}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Star size={17} fill="#FFC107" stroke="#FFC107" />
        <span className="text-base font-medium text-gray-900">
          {hospital.rating || "N/A"}
        </span>
        <span className="text-base text-gray-500">
          ({hospital.reviews || 0} reviews)
        </span>
      </div>
    </div>
  </div>

  {/* RIGHT: Save + Buttons (side-by-side layout) */}
  <div className="flex items-center gap-4">
    {/* ✅ Save Icon (centered left of buttons) */}
    {!isStaff && (
      <button
        onClick={handleSaveToggle}
        className="p-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
        title={isSaved ? "Remove from saved" : "Save hospital"}
      >
        <Heart
          size={24}
          className={`transition-all ${
            isSaved
              ? "fill-red-500 stroke-red-500"
              : "stroke-gray-400 hover:stroke-red-500"
          }`}
        />
      </button>
    )}

    {/* Buttons stacked vertically */}
    <div className="flex flex-col gap-3 min-w-[200px]">
      <button
        onClick={() =>
          navigate(`/hospital/${hospital._id}`, { state: { hospital } })
        }
        className="w-full px-6 py-3 bg-[#0071BC] text-white text-base font-semibold rounded-xl 
                   hover:bg-[#005A91] transition-all shadow-md hover:shadow-lg"
      >
        View Details
      </button>

      <button
        onClick={() =>
          navigate(`/hospital/${hospital._id}?tab=doctors`, { state: { hospital } })
        }
        className="w-full px-6 py-3 border border-[#0071BC] text-[#0071BC] text-base font-semibold 
                   rounded-xl hover:bg-[#E6F3FA] transition-all shadow-sm hover:shadow-md"
      >
        View Doctors
      </button>
    </div>
  </div>
</div>

    </div>
  );
}

// src/pages/OfflineDoctors.jsx - FINAL FIXED VERSION

import React, { useState, useEffect, useMemo } from "react";
import { Star, MapPin, ChevronDown, ChevronUp, Building2, Search, X ,Heart} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import indiaData from "../data/indiaStatesDistricts.json";
import specializationsData from "../data/specializations.js";
import commonDiseases from "../data/commonDiseases.js";



const THEME = {
  primary: "#0071BC",
  dark: "#003057",
  light: "#E6F3FA",
  text: "#4A4A4A",
  bg: "#FFFFFF",
};

export default function OfflineDoctors() {
  const [stateVal, setStateVal] = useState("");
  const [district, setDistrict] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [disease, setDisease] = useState("");
  const [doctors, setDoctors] = useState([]);
    const [availability, setAvailability] = useState(""); // ✅ ADD THIS

const [diseasesLoadCount, setDiseasesLoadCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const diseases = commonDiseases;

  // ✅ NEW CODE - Progressive loading
  

const [loading, setLoading] = useState(true);
  

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/doctors/all");
      const data = await res.json();
      const offlineDocs = data.filter(
        (doc) => doc.status === "approved" && !doc.onlineConsultation
      );
      setDoctors(offlineDocs);
    } catch (err) {
      console.error("Error fetching offline doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, []);

/* ✅ ADD THIS */
const states = useMemo(() => {
  return indiaData.states ? indiaData.states.map((s) => s.state) : [];
}, []);

const districts = useMemo(() => {
  const selected = indiaData.states?.find((s) => s.state === stateVal);
  return selected ? selected.districts : [];
}, [stateVal]);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const specializationParam = queryParams.get("specialization");
    const stateParam = queryParams.get("state");
    const districtParam = queryParams.get("district");

    if (specializationParam) setSpecialization(specializationParam);
    if (stateParam) setStateVal(stateParam);
    if (districtParam) setDistrict(districtParam);
  }, [location.search]);

  const specializations = specializationsData.map((s) => ({
    value: s.title,
    label: s.title,
    desc: s.desc,
  }));

 
  const filteredDiseasesBySearch = searchQuery
    ? diseases.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diseases;

const displayedDiseases = diseases.slice(0, diseasesLoadCount);
const remainingDiseases = diseases.length - diseasesLoadCount;
const hasMore = remainingDiseases > 0;

  const filteredDoctors = doctors.filter((doc) => {
    const stateMatch = !stateVal || doc.state === stateVal;
    const districtMatch = !district || doc.district === district;
    const specializationMatch = !specialization || doc.specialization === specialization;
    const diseaseMatch =
      !disease ||
      doc.specialization === diseases.find((d) => d.name === disease)?.specialization;

    return stateMatch && districtMatch && specializationMatch && diseaseMatch;
  });

  const isOnline = location.pathname.includes("consultation");

  const handleResetFilters = () => {
    setStateVal("");
    setDistrict("");
    setSpecialization("");
    setDisease("");
    setSearchQuery("");
  };
/* ----------------------------------------
   ✅ Helper: Determine next available day
---------------------------------------- */
const getNextAvailablePriority = (availability = []) => {
  if (!Array.isArray(availability)) return { priority: 999 };

  const today = new Date();
  const todayIndex = today.getDay();
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < 7; i++) {
    const dayToCheck = DAYS[(todayIndex + i) % 7];
    const match = availability.find((a) => a.day === dayToCheck && a.available);
    if (match) return { priority: i }; // 0 = today, 1 = tomorrow, etc.
  }

  return { priority: 999 }; // not available this week
};

/* ----------------------------------------
   ✅ Sort doctors by availability
---------------------------------------- */
const sortedDoctors = [...filteredDoctors].sort((a, b) => {
  const aPriority = getNextAvailablePriority(a.availability).priority;
  const bPriority = getNextAvailablePriority(b.availability).priority;
  return aPriority - bPriority;
});

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
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
  {/* MOBILE VIEW: Stacked layout */}
  <div className="flex flex-col gap-3 lg:hidden">
    <div>
      <h1
        className="text-2xl font-bold mb-1"
        style={{ color: THEME.dark }}
      >
        Book <span style={{ color: THEME.primary }}>Offline Appointment</span>
      </h1>
      <p className="text-xs" style={{ color: THEME.text }}>
        Visit verified doctors at their clinic
      </p>
    </div>

    {/* Toggle Bar - Mobile */}
    <div className="flex gap-2 p-1 rounded-lg shadow-md bg-white">
      <button
        onClick={() => navigate("/offline-doctors")}
        className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
          !isOnline
            ? "text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        style={{
          background: !isOnline ? THEME.primary : "transparent",
        }}
      >
        🏥 Offline
      </button>
      <button
        onClick={() => navigate("/online-consultation")}
        className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
          isOnline
            ? "text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        style={{
          background: isOnline ? THEME.primary : "transparent",
        }}
      >
        💻 Online
      </button>
    </div>
  </div>

  {/* DESKTOP VIEW: Horizontal layout */}
  <div className="hidden lg:flex items-center justify-between">
    <div>
      <h1
        className="text-4xl font-bold mb-1"
        style={{ color: THEME.dark }}
      >
        Book <span style={{ color: THEME.primary }}>Offline Appointment</span>
      </h1>
      <p className="text-sm" style={{ color: THEME.text }}>
        Visit verified doctors at their clinic
      </p>
    </div>

    {/* Toggle Bar - Desktop */}
    <div className="flex items-center gap-2 p-1 rounded-lg shadow-md bg-white">
      <button
        onClick={() => navigate("/offline-doctors")}
        className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
          !isOnline
            ? "text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        style={{
          background: !isOnline ? THEME.primary : "transparent",
        }}
      >
        🏥 Offline Appointment
      </button>
      <button
        onClick={() => navigate("/online-consultation")}
        className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
          isOnline
            ? "text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        style={{
          background: isOnline ? THEME.primary : "transparent",
        }}
      >
        💻 Online Consultation
      </button>
    </div>
  </div>
</div>



        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold" style={{ color: THEME.dark }}>
              Filters
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs sm:text-sm font-medium hover:underline"
              style={{ color: THEME.primary }}
            >
              Reset
            </button>
          </div>

          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 mb-4 sm:mb-6">
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

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              style={{ border: `1px solid ${THEME.light}` }}
              className="w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Specializations</option>
              {specializations.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Common Health Issues */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3" style={{ color: THEME.text }}>
              Common Health Issues
            </h3>

            {/* MOBILE ONLY: Search Bar */}
            <div className="sm:hidden mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search health issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: `2px solid ${THEME.light}` }}
                  className="w-full pl-10 pr-10 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* ✅ Show Selected Disease Below Search (Mobile) */}
              {disease && !searchQuery && (
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-600">Selected:</span>
                  <button
                    onClick={() => setDisease("")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                  >
                    {disease}
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* DESKTOP: Show Pills */}
        {/* DESKTOP: Show Pills with Progressive Load */}
<div className="hidden sm:flex flex-wrap gap-2">
  {displayedDiseases.map((d, i) => (
    <button
      key={i}
      onClick={() => setDisease(disease === d.name ? "" : d.name)}
      className={`px-2.5 py-1 text-sm rounded-full font-medium transition ${
        disease === d.name
          ? "text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      style={{
        background: disease === d.name ? THEME.primary : undefined,
      }}
    >
      {d.name}
    </button>
  ))}
  
  {/* Progressive Load More Button */}
  {hasMore && (
    <button
      onClick={() => {
        // Load 30 more diseases each time
        const nextCount = Math.min(diseasesLoadCount + 30, diseases.length);
        setDiseasesLoadCount(nextCount);
      }}
      className="px-3 py-1 text-sm rounded-full font-medium transition flex items-center gap-1"
      style={{
        border: `1px solid ${THEME.primary}`,
        color: THEME.primary,
        background: "white",
      }}
    >
      +{Math.min(30, remainingDiseases)} More ({remainingDiseases} remaining)
      <ChevronDown size={14} />
    </button>
  )}
  
  {/* Show Less Button (appears when more than 20 are loaded) */}
  {diseasesLoadCount > 20 && (
    <button
      onClick={() => setDiseasesLoadCount(20)}
      className="px-3 py-1 text-sm rounded-full font-medium transition flex items-center gap-1"
      style={{
        border: `1px solid ${THEME.primary}`,
        color: THEME.primary,
        background: "white",
      }}
    >
      Show Less <ChevronUp size={14} />
    </button>
  )}
</div>


            {/* MOBILE: Show Search Results ONLY when typing */}
            {searchQuery && (
              <div className="sm:hidden">
                {filteredDiseasesBySearch.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredDiseasesBySearch.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDisease(d.name);
                          setSearchQuery("");
                        }}
                        className="px-2.5 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No health issues found for "{searchQuery}"
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-1">
          {filteredDoctors.length} doctors found
        </p>

        {/* Doctors List */}
   {/* Doctors List */}
{loading ? (
  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
    <p className="text-gray-500 text-base sm:text-lg mb-2">Loading doctors...</p>
    <p className="text-gray-400 text-xs sm:text-sm">Please wait a moment</p>
  </div>
) : filteredDoctors.length === 0 ? (
  <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
    <p className="text-gray-500 text-base sm:text-lg mb-2">No doctors found</p>
    <p className="text-gray-400 text-xs sm:text-sm">
      Try adjusting your filters
    </p>
  </div>
) : (
  <div className="space-y-3 sm:space-y-4">
   {sortedDoctors.map((doc) => (
  <DoctorCard key={doc._id || doc.id} doc={doc} navigate={navigate} />
))}

  </div>
)}

      </div>
    </div>
  );
}/* Doctor Card Component - WITH SAVE BUTTON */
function DoctorCard({ doc, navigate }) {
  const [isSaved, setIsSaved] = useState(false);

  // 🕒 Helper - find next available day
  const getNextAvailableDay = (availability = []) => {
    if (!Array.isArray(availability)) return null;

    const today = new Date();
    const todayIndex = today.getDay();
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < 7; i++) {
      const dayToCheck = DAYS[(todayIndex + i) % 7];
      const match = availability.find((a) => a.day === dayToCheck && a.available);
      if (match) {
        if (i === 0) return "Available Today";
        if (i === 1) return "Available Tomorrow";
        return `Available ${dayToCheck}`;
      }
    }

    return "Not Available";
  };

  // ✅ Check if user is staff
  const isStaff = localStorage.getItem("staff") !== null;

  // Check if doctor is saved on mount
  useEffect(() => {
    if (!isStaff) {
      const savedDoctors = JSON.parse(localStorage.getItem("savedDoctors") || "[]");
      setIsSaved(savedDoctors.some(d => d.id === doc.id));
    }
  }, [doc.id, isStaff]);

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    if (isStaff) {
      alert("⚠️ Staff members cannot save doctors.");
      return;
    }
    let savedDoctors = JSON.parse(localStorage.getItem("savedDoctors") || "[]");

    if (isSaved) {
      savedDoctors = savedDoctors.filter(d => d.id !== doc.id);
      setIsSaved(false);
    } else {
      savedDoctors.push(doc);
      setIsSaved(true);
    }
    localStorage.setItem("savedDoctors", JSON.stringify(savedDoctors));
  };


  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative border border-gray-200 ${
        getNextAvailableDay(doc.availability) === "Not Available" ? "opacity-60" : ""
      }`}
      style={{ padding: "24px 28px", minHeight: "150px" }}
    >
      {/* MOBILE: Stack Vertically */}
      <div className="flex flex-col lg:hidden space-y-3">
        {/* Mobile Header with Save Icon */}
        <div className="flex gap-3 items-start">
          {doc.photo ? (
            <img
              src={doc.photo}
              alt={doc.fullName}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 bg-blue-100"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white flex-shrink-0"
              style={{ background: THEME.primary }}
            >
              {doc.fullName?.charAt(0)?.toUpperCase() || "D"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base mb-0.5 truncate">
              Dr. {doc.fullName}
            </h3>
            <p className="text-sm mb-0.5" style={{ color: THEME.primary }}>
              {doc.specialization}
            </p>
            <p className="text-gray-600 text-xs">{doc.experience} years experience</p>
          </div>

          {/* Mobile Save Icon */}
          {!isStaff && (
            <button
              onClick={handleSaveToggle}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              title={isSaved ? "Remove from saved" : "Save doctor"}
            >
              <Heart
                size={18}
                className={`transition-all ${
                  isSaved
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-gray-400 hover:stroke-red-500"
                }`}
              />
            </button>
          )}
        </div>

        {/* Mobile Details */}
   {/* Mobile Details with updated icons */}
<div className="space-y-2">
  <div className="flex items-start gap-2 text-sm text-gray-700">
    {/* Hospital icon instead of MapPin */}
    <Building2 size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
    <div>
      <p className="font-medium text-sm">
        {doc.hospitalId?.name || doc.hospital || "Independent Doctor"}
      </p>
    </div>
  </div>

  <div className="flex items-start gap-2 text-sm text-gray-700">
    {/* MapPin icon for location line */}
    <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-gray-500 text-xs mt-0.5">
        {(doc.hospitalId?.district || doc.district)}, {(doc.hospitalId?.state || doc.state)}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-1.5">
    <Star size={14} fill="#FFC107" stroke="#FFC107" />
    <span className="text-sm font-medium text-gray-900">{doc.rating || "4.8"}</span>
    <span className="text-xs text-gray-500">({doc.reviewCount || "245"} reviews)</span>
  </div>
</div>


        {/* Mobile Availability & Fee */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div>
            {doc.availability && (
              <p className="text-xs font-medium text-green-600 mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                {getNextAvailableDay(doc.availability)}
              </p>
            )}
            <p className="text-xl font-bold text-gray-900">₹{doc.fee}</p>
            <p className="text-xs text-gray-500">Consultation fee</p>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex gap-2 pt-2">
          {!isStaff && (
            <button
              onClick={() => navigate(`/booking/${doc._id}`)}
              className="flex-1 px-3 py-2 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
              style={{ background: THEME.primary }}
            >
              Book Appointment
            </button>
          )}
          <button
            onClick={() => navigate(`/doctor/${doc._id}`)}
            className={`px-3 py-2 border text-sm font-semibold rounded-lg hover:bg-blue-50 transition ${
              isStaff ? "flex-1" : ""
            }`}
            style={{
              borderColor: THEME.primary,
              color: THEME.primary,
            }}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* DESKTOP: Enhanced 5-Column Layout */}
      <div className="hidden lg:flex items-center">
        {/* Column 1: Avatar */}
        <div className="flex-shrink-0" style={{ width: "120px" }}>
          {doc.photo ? (
            <img
              src={doc.photo}
              alt={doc.fullName}
              className="w-28 h-28 rounded-full object-cover bg-blue-100"
            />
          ) : (
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center font-bold text-4xl text-white"
              style={{ background: THEME.primary }}
            >
              {doc.fullName?.charAt(0)?.toUpperCase() || "D"}
            </div>
          )}
        </div>

        {/* Column 2: Name, Specialization, Experience */}
        <div style={{ width: "220px", paddingRight: "20px" }}>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            Dr. {doc.fullName}
          </h3>
          <p className="text-base mb-1" style={{ color: THEME.primary }}>
            {doc.specialization}
          </p>
          <p className="text-gray-600 text-sm">{doc.experience} years experience</p>
        </div>

        {/* Column 3: Hospital Details - Icon Swap */}
        <div style={{ width: "300px", paddingLeft: "12px", paddingRight: "20px" }}>
          <div className="flex items-start gap-2 mb-2.5">
            <Building2 size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900 text-base font-medium leading-tight"> 
                {doc.hospitalId?.name || doc.hospital || "Independent Doctor"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 mb-2.5">
            <MapPin size={15} className="text-gray-400 flex-shrink-0 " />
            <p className="text-gray-500 text-sm leading-tight" >
              {(doc.hospitalId?.district || doc.district)}, {(doc.hospitalId?.state || doc.state)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={15} fill="#FFC107" stroke="#FFC107" />
            <span className="text-base font-medium text-gray-900">{doc.rating || "4.8"}</span>
            <span className="text-sm text-gray-500">({doc.reviewCount || "245"} reviews)</span>
          </div>
        </div>

        {/* Column 4: Availability & Fee */}
        <div style={{ width: "200px", paddingLeft: "12px", paddingRight: "20px" }}>
          {doc.availability && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              <p className="text-base font-medium text-green-600">
                {getNextAvailableDay(doc.availability)}
              </p>
            </div>
          )}
          <p className="text-2xl font-bold text-gray-900 mb-0.5">₹{doc.fee}</p>
          <p className="text-sm text-gray-500">Consultation fee</p>
        </div>

        {/* Column 5: Save + Action Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          {!isStaff && (
            <button
              onClick={handleSaveToggle}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              title={isSaved ? "Remove from saved" : "Save doctor"}
            >
              <Heart
                size={22}
                className={`transition-all ${
                  isSaved
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-gray-400 hover:stroke-red-500"
                }`}
              />
            </button>
          )}
          <div className="flex flex-col gap-2.5">
            {!isStaff && (
              <button
                onClick={() => navigate(`/booking/${doc._id}`)}
                className="text-white text-base font-semibold rounded-lg hover:opacity-90 transition"
                style={{
                  background: THEME.primary,
                  padding: "11px 40px",
                  minWidth: "220px"
                }}
              >
                Book Appointment
              </button>
            )}
            <button
              onClick={() => navigate(`/doctor/${doc._id}`)}
              className="border text-base font-semibold rounded-lg hover:bg-blue-50 transition"
              style={{
                borderColor: THEME.primary,
                color: THEME.primary,
                padding: "11px 40px",
                minWidth: "220px"
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

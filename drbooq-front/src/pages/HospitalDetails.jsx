import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Star, Phone, MapPin, Clock, Heart, ChevronLeft } from "lucide-react";

export default function HospitalProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const urlParams = new URLSearchParams(location.search);
  const defaultTab = urlParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Updated states
  const [hospital, setHospital] = useState(location.state?.hospital || null);
  const [loading, setLoading] = useState(!location.state?.hospital);

  /* ==================== FETCH HOSPITAL FROM BACKEND ==================== */
  useEffect(() => {
    if (hospital) return; // already from navigation

    const fetchHospital = async () => {
      try {
        setLoading(true);
const res = await fetch(`http://localhost:5000/api/hospitals/public/all`);
        const data = await res.json();

        if (res.ok && data.hospitals) {
          const found = data.hospitals.find(
            (h) => String(h._id) === String(id)
          );
          if (found) setHospital(found);
        } else {
          console.error("Failed to fetch hospital:", data.message);
        }
      } catch (err) {
        console.error("Error fetching hospital:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id, hospital]);

  /* ==================== HANDLE LOADING & NOT FOUND ==================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading hospital details...</p>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-600">Hospital not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#0071BC]">
          ← Back
        </button>
      </div>
    );
  }

  /* ==================== LOAD DOCTORS FROM LOCALSTORAGE ==================== */
  const allDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");

  const doctors = allDoctors.filter((doc) => {
    if (!doc || !hospital) return false;
    if (doc.status !== "approved" || doc.visibility === false) return false;

    const docHospitalName = (doc.hospital || "").trim().toLowerCase();
    const hospitalName = (hospital.name || "").trim().toLowerCase();

    const matchById =
      hospital._id && String(doc.hospitalId) === String(hospital._id);
    const matchByReg =
      hospital.registrationNumber &&
      doc.hospitalRegNo &&
      doc.hospitalRegNo.trim().toLowerCase() ===
        hospital.registrationNumber.trim().toLowerCase();
    const matchByName =
      docHospitalName !== "" &&
      hospitalName !== "" &&
      docHospitalName === hospitalName;

    return matchById || matchByReg || matchByName;
  });

  /* ==================== PREPARE DATA ==================== */
  const reviewsList = hospital.reviewsList || [];
  const images = hospital.images || [];
  const visibleReviews = showAllReviews
    ? reviewsList
    : reviewsList.slice(0, 5);

  const filteredDoctors = doctors.filter((doc) => {
    const searchTerm = doctorSearch.toLowerCase();
    return (
      (doc.fullName || doc.name || "")
        .toLowerCase()
        .includes(searchTerm) ||
      (doc.specialization || "").toLowerCase().includes(searchTerm)
    );
  });

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Mobile Header - Back Button */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-bold text-gray-900 text-base truncate">{hospital.name}</h1>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24">
        {/* ✅ MOBILE-OPTIMIZED Top Info Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
          {/* Mobile: Stacked Layout */}
          <div className="flex flex-col lg:hidden space-y-4">
            {/* Logo + Basic Info */}
            <div className="flex items-start gap-4">
              {hospital.logo ? (
                <img
                  src={hospital.logo}
                  alt={`${hospital.name} Logo`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-[#E9F2FA] flex items-center justify-center font-bold text-[#0071BC] text-2xl sm:text-3xl shadow-sm flex-shrink-0">
                  {hospital.initials || hospital.name?.charAt(0)}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-[#003057] mb-1 line-clamp-2">
                  {hospital.name}
                </h1>
                <p className="text-[#0071BC] font-medium text-sm mb-2">{hospital.type}</p>
                
                {/* Rating */}
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="font-medium">{hospital.rating || "N/A"}</span>
                  <span className="text-gray-500 ml-1 text-xs">
                    ({hospital.reviews || 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Established Badge */}
            {hospital.established && (
              <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium inline-block w-fit">
                📅 Established {hospital.established}
              </span>
            )}

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">
                {[hospital.road, hospital.district, hospital.state, hospital.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              {hospital.staffPhone && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={`tel:${hospital.staffPhone}`} className="hover:text-[#0071BC]">
                    {hospital.staffPhone}
                  </a>
                </div>
              )}
              {hospital.emergency && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0071BC] flex-shrink-0" />
                  <span className="text-green-600 font-medium text-xs">
                    Emergency: {hospital.emergency}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-[#0071BC] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#005a94] transition">
                Book Appointment
              </button>
              {hospital.location && hospital.location.trim() !== "" && (
                <button
                  onClick={() => {
                    const url = hospital.location.startsWith("http")
                      ? hospital.location
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.location)}`;
                    window.open(url, "_blank");
                  }}
                  className="px-4 py-2.5 border-2 border-[#0071BC] text-[#0071BC] rounded-lg font-semibold text-sm hover:bg-[#E9F2FA] transition"
                >
                  📍
                </button>
              )}
            </div>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden lg:flex gap-6">
            {/* Avatar / Logo */}
            <div className="flex flex-col items-center w-1/4">
              {hospital.logo ? (
                <img
                  src={hospital.logo}
                  alt={`${hospital.name} Logo`}
                  className="w-32 h-32 object-cover rounded-xl border shadow-md mb-3"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-[#E9F2FA] flex items-center justify-center font-bold text-[#0071BC] text-3xl mb-3 shadow-md">
                  {hospital.initials || hospital.name?.charAt(0)}
                </div>
              )}

              <div className="flex items-center text-yellow-500 text-sm mb-3">
                <Star className="w-4 h-4 mr-1 fill-current" />
                {hospital.rating || "N/A"}
                <span className="text-gray-500 ml-1">
                  ({hospital.reviews || 0})
                </span>
              </div>

              <button className="bg-[#0071BC] text-white px-5 py-2 rounded-lg font-medium w-full hover:bg-[#005a94] transition">
                Book Appointment
              </button>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#003057] mb-1">
                {hospital.name}
              </h1>
              <p className="text-[#0071BC] font-medium mb-4">{hospital.type}</p>

              <div className="flex flex-col gap-y-3 text-sm text-[#003057]">
                {hospital.established && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium inline-block w-fit">
                    Established {hospital.established}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0071BC]" />
                  {[hospital.state, hospital.district, hospital.road, hospital.pincode]
                    .filter(Boolean)
                    .join(", ")}
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                  {hospital.staffPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <a href={`tel:${hospital.staffPhone}`}>Staff: {hospital.staffPhone}</a>
                    </div>
                  )}
                  {hospital.emergency && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0071BC]" />
                      <span className="text-green-600 font-medium">
                        Available {hospital.emergency}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {hospital.location && hospital.location.trim() !== "" && (
                  <button
                    onClick={() => {
                      const url = hospital.location.startsWith("http")
                        ? hospital.location
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.location)}`;
                      window.open(url, "_blank");
                    }}
                    className="bg-[#0071BC] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#005a94]"
                  >
                    Get Directions
                  </button>
                )}
                <button className="border border-[#0071BC] text-[#0071BC] px-5 py-2 rounded-lg font-medium hover:bg-[#E9F2FA] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ MOBILE-OPTIMIZED Tabs */}
        <div className="flex gap-1 sm:gap-2 border-b mt-4 sm:mt-6 overflow-x-auto pb-1 px-1" style={{ scrollbarWidth: "none" }}>
          {["overview", "doctors", "facilities", "gallery", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-5 py-2 font-medium text-xs sm:text-sm rounded-t-lg whitespace-nowrap transition ${
                activeTab === tab
                  ? "text-[#0071BC] border-b-2 border-[#0071BC] bg-blue-50"
                  : "text-gray-500 hover:text-[#0071BC] hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mt-4">
          {/* Rest of your tab content remains the same... */}
          {/* I'll continue in the next message due to length */}

{/* OVERVIEW TAB */}
{activeTab === "overview" && (
  <div className="space-y-4 sm:space-y-6">
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-[#0071BC] mb-3">
        About {hospital.name}
      </h2>
      <p className="text-[#003057] leading-relaxed text-sm sm:text-base">
        {hospital.about || "No description available."}
      </p>
    </div>

    {hospital.specialties?.length > 0 && (
      <>
        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC]">
          Departments & Specialties
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {hospital.specialties.map((dept, i) => (
            <div
              key={i}
              className="flex items-center bg-[#F5F8FB] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#003057]"
            >
              <span className="w-2 h-2 bg-[#0071BC] rounded-full mr-2 flex-shrink-0"></span>
              <span className="line-clamp-1">{dept}</span>
            </div>
          ))}
        </div>
      </>
    )}

    {hospital.certifications?.length > 0 && (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-3">
          Accreditations & Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {hospital.certifications.map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-[#F5F8FB] px-3 py-2 rounded-lg text-xs sm:text-sm text-[#003057]"
            >
              <span className="text-base">🏅</span>
              <span className="line-clamp-1">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}

{/* DOCTORS TAB */}
{activeTab === "doctors" && (
  <div>
    {/* Search */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search doctors..."
        value={doctorSearch}
        onChange={(e) => setDoctorSearch(e.target.value)}
        className="w-full border border-[#A7C8E9] rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#A7C8E9]"
      />
    </div>

    <div className="space-y-3">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition"
          >
            {/* Mobile: Stacked */}
            <div className="flex flex-col sm:hidden space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E9F2FA] flex items-center justify-center font-bold text-[#0071BC] overflow-hidden flex-shrink-0">
                  {doc.photo ? (
                    <img src={doc.photo} alt={doc.fullName} className="w-full h-full object-cover" />
                  ) : (
                    doc.fullName?.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#003057] text-sm truncate">
                    {doc.fullName}
                  </h3>
                  <p className="text-[#0071BC] text-xs">{doc.specialization}</p>
                  <p className="text-xs text-gray-600">{doc.experience}+ yrs</p>
                </div>
                <div className="flex items-center text-yellow-500 text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {doc.rating || "4.5"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/booking/${doc.id}`)}
                  className="flex-1 bg-[#0071BC] text-white px-3 py-2 rounded-lg hover:bg-[#005a94] text-xs font-medium"
                >
                  Book
                </button>
                <button
                  onClick={() => navigate(`/doctor/${doc.id}`)}
                  className="flex-1 border border-[#0071BC] text-[#0071BC] px-3 py-2 rounded-lg hover:bg-[#E9F2FA] text-xs font-medium"
                >
                  Profile
                </button>
              </div>
            </div>

            {/* Desktop: Horizontal */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#E9F2FA] flex items-center justify-center font-bold text-[#0071BC] text-lg overflow-hidden">
                  {doc.photo ? (
                    <img src={doc.photo} alt={doc.fullName} className="w-full h-full object-cover" />
                  ) : (
                    doc.fullName?.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#003057]">{doc.fullName}</h3>
                  <p className="text-[#0071BC] text-sm">{doc.specialization}</p>
                  <p className="text-sm text-[#003057]">{doc.experience}+ yrs experience</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-yellow-500 text-sm justify-end mb-2">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {doc.rating || "4.5"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/booking/${doc.id}`)}
                    className="bg-[#0071BC] text-white px-4 py-2 rounded-lg hover:bg-[#005a94] text-sm"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => navigate(`/doctor/${doc.id}`)}
                    className="border border-[#0071BC] text-[#0071BC] px-4 py-2 rounded-lg hover:bg-[#E9F2FA] text-sm"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center py-8">
          No doctors found for this hospital.
        </p>
      )}
    </div>
  </div>
)}

{/* FACILITIES, GALLERY, REVIEWS tabs remain the same */}
{activeTab === "facilities" && (
  <>
    <h2 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-3 sm:mb-4">
      Hospital Facilities
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
      {hospital.facilities?.map((f, i) => (
        <div
          key={i}
          className="flex items-center bg-[#F5F8FB] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#003057]"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
          <span className="line-clamp-1">{f}</span>
        </div>
      ))}
    </div>
  </>
)}

{activeTab === "gallery" && images.length > 0 && (
  <div className="relative w-full">
    <div className="w-full h-64 sm:h-96 lg:h-[500px] bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden">
      <img
        src={images[currentImage]}
        alt={`Hospital ${currentImage + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
    <button
      onClick={prevImage}
      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
    >
      ◀
    </button>
    <button
      onClick={nextImage}
      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
    >
      ▶
    </button>
    <div className="flex justify-center mt-4 gap-2 flex-wrap">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => setCurrentImage(i)}
          className={`w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 ${
            i === currentImage ? "border-[#0071BC]" : "border-transparent"
          }`}
        >
          <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  </div>
)}

{activeTab === "reviews" && (
  <div>
    <h2 className="text-lg sm:text-xl font-bold text-[#0071BC] mb-4">
      Patient Reviews
    </h2>
    {visibleReviews.length > 0 ? (
      <div className="space-y-3 sm:space-y-4">
        {visibleReviews.map((r, index) => (
          <div
            key={r.id || index}
            className="border rounded-lg p-3 sm:p-4 bg-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{
                  backgroundColor: ["#0071BC", "#10B981", "#F59E0B", "#EF4444"][index % 4],
                }}
              >
                {r.user?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-semibold text-[#003057] text-sm">{r.user}</p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
            <p className="text-[#003057] text-sm leading-relaxed">
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm text-center py-8">No reviews yet.</p>
    )}

    {reviewsList.length > 5 && !showAllReviews && (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowAllReviews(true)}
          className="px-6 py-2 bg-[#0071BC] text-white rounded-full font-medium hover:bg-[#005a94] transition text-sm"
        >
          Show More Reviews
        </button>
      </div>
    )}
  </div>
)}
        </div>
      </div>
    </div>
  );
}

// src/pages/DoctorProfile.jsx - UNIFIED & MOBILE OPTIMIZED

import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Calendar, MapPin, ShieldCheck, Hospital, Video, Languages } from "lucide-react";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Check if this is an online doctor profile
  const isOnlineProfile = location.pathname.includes("/online-doctor/");

  // Load doctors from both sources
  const offlineDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
  const onlineDoctors = JSON.parse(localStorage.getItem("onlineDoctors") || "[]");
  const allDoctors = [...offlineDoctors, ...onlineDoctors];

  let doctor = allDoctors.find((d) => String(d.id) === String(id));
  if (!doctor && allDoctors.length > 0 && !id) {
    doctor = allDoctors[0];
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 text-center">
        <p className="text-gray-600 text-base sm:text-lg mb-4">❌ Doctor not found.</p>
        <button
          onClick={() => navigate(isOnlineProfile ? "/online-consultation" : "/offline-doctors")}
          className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#0071BC] text-white rounded-lg hover:bg-[#005A94] transition text-sm sm:text-base"
        >
          ← Back to {isOnlineProfile ? "Online Doctors" : "Doctors"}
        </button>
      </div>
    );
  }

  // Calculate availability for offline doctors
  let availabilityLabel = doctor.availability;
  if (!isOnlineProfile && Array.isArray(doctor.availability)) {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = today.getDay();

    const firstSlot = doctor.availability.find((slot) => slot.available);
    if (firstSlot) {
      const slotIndex = days.indexOf(firstSlot.day);
      let diff = slotIndex - todayIndex;
      if (diff < 0) diff += 7;

      if (diff === 0) availabilityLabel = "Available Today";
      else if (diff === 1) availabilityLabel = "Available Tomorrow";
      else availabilityLabel = `Available ${firstSlot.day}`;
    } else {
      availabilityLabel = "Not Available";
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sidebar - Mobile Optimized */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:col-span-1 border border-gray-200">
          {/* Doctor Photo */}
          <div className="w-28 h-28 sm:w-24 sm:h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-xl sm:text-2xl font-bold text-[#0071BC] overflow-hidden">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              doctor.fullName?.charAt(0)
            )}
          </div>

          {/* Doctor Name & Details */}
          <h2 className="text-lg sm:text-xl font-bold text-center mt-3 sm:mt-4 text-[#003057]">
            {isOnlineProfile ? "Dr. " : ""}{doctor.fullName}
          </h2>

          {/* Qualifications (Online only) */}
          {isOnlineProfile && doctor.qualifications && doctor.qualifications.length > 0 && (
            <p className="text-[#0071BC] text-center font-medium text-xs sm:text-sm mt-1">
              {doctor.qualifications.join(", ")}
            </p>
          )}

          <p className="text-[#00A1C9] text-center font-medium text-sm sm:text-base mt-1">
            {doctor.specialization}
          </p>

          {/* Location (Offline only) */}
          {!isOnlineProfile && (doctor.state || doctor.district) && (
            <p className="flex items-center justify-center text-gray-600 text-xs sm:text-sm mt-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#0071BC]" />
              {doctor.district}, {doctor.state}
            </p>
          )}

          {/* Hospital (Offline only) */}
          {!isOnlineProfile && (doctor.hospital || doctor.clinic) && (
            <p className="flex items-center justify-center text-gray-600 text-xs sm:text-sm mt-1">
              <Hospital className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#00A1C9]" />
              {doctor.hospital} {doctor.clinic && `(${doctor.clinic})`}
            </p>
          )}

          {/* Verified Badge */}
          <div className="flex justify-center gap-2 mt-3 text-green-600 text-xs sm:text-sm font-medium">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" /> Verified Doctor
          </div>

          {/* Info Cards */}
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-sm">
            {/* Experience */}
            {doctor.experience && (
              <div className="p-2.5 sm:p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                <p className="font-semibold text-[#003057] text-sm sm:text-base">
                  {doctor.experience}+ yrs
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">Experience</p>
              </div>
            )}

            {/* Fee */}
            {doctor.fee && (
              <div className="p-2.5 sm:p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                <p className="font-semibold text-base sm:text-lg text-[#003057]">
                  ₹{doctor.fee}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">Consultation Fee</p>
              </div>
            )}

            {/* Rating (Online) or Availability (Offline) */}
            {isOnlineProfile ? (
              doctor.rating && (
                <div className="p-2.5 sm:p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <p className="font-semibold text-[#003057] text-sm sm:text-base">{doctor.rating}</p>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {doctor.reviews || 0} Reviews
                  </p>
                </div>
              )
            ) : (
              availabilityLabel && (
                <div className="p-2.5 sm:p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
                  <p className="font-semibold text-[#003057] text-sm sm:text-base">
                    {availabilityLabel}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">Availability</p>
                </div>
              )
            )}

            {/* Online Availability (Online only) */}
            {isOnlineProfile && (
              <div className="p-2.5 sm:p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
                <p className="font-semibold text-[#003057] text-sm sm:text-base">Available Now</p>
                <p className="text-gray-600 text-xs sm:text-sm">Online Consultation</p>
              </div>
            )}
          </div>

          {/* Book Button */}
          <button
            onClick={() => navigate(`/booking/${doctor.id}`)}
            className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#00A1C9] to-[#0071BC] text-white py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition text-sm sm:text-base font-medium"
          >
            {isOnlineProfile ? "Book Video Consultation" : "Book Appointment"}
          </button>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* About */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-200">
            <h3 className="text-base sm:text-lg font-bold text-[#003057]">About</h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed">
              {doctor.bio ||
                `Dr. ${doctor.fullName} is a highly experienced ${doctor.specialization} specialist with ${doctor.experience} years of practice.`}
            </p>
          </div>

          {/* Languages (Online only) */}
          {/* Languages (Online only) */}
{isOnlineProfile && doctor.languages && Array.isArray(doctor.languages) && doctor.languages.length > 0 && (
  <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-200">
    <h3 className="text-base sm:text-lg font-bold text-[#003057] flex items-center gap-2">
      <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-[#0071BC]" />
      Languages Spoken
    </h3>
    <div className="flex flex-wrap gap-2 mt-3">
      {doctor.languages.map((lang, i) => (
        <span
          key={i}
          className="px-2.5 py-1 bg-blue-100 text-[#0071BC] rounded-full text-xs sm:text-sm font-medium"
        >
          {lang}
        </span>
      ))}
    </div>
  </div>
)}

{/* ✅ UPDATED: Education Section */}
{doctor.education && doctor.education.length > 0 && (
  <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-200">
    <h3 className="text-base sm:text-lg font-bold text-[#003057]">
      Education & Qualifications
    </h3>
    <ul className="list-disc pl-5 sm:pl-6 mt-2 text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
      {doctor.education.map((edu, i) => (
        <li key={i}>
          {/* ✅ New format: { degree, college, year } */}
          {edu.degree ? (
            <div>
              <span className="font-semibold text-[#003057]">{edu.degree}</span>
              {edu.college && <span className="text-gray-700"> - {edu.college}</span>}
              {edu.year && <span className="text-gray-500"> ({edu.year})</span>}
            </div>
          ) : (
            // Old format: string
            <span>{edu}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

{/* Services */}
{(doctor.services && doctor.services.length > 0) || isOnlineProfile ? (
  <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-200">
    <h3 className="text-base sm:text-lg font-bold text-[#003057]">Services Offered</h3>
    <ul className="list-disc pl-5 sm:pl-6 mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
      {doctor.services && doctor.services.length > 0 ? (
        doctor.services.map((service, i) => <li key={i}>{service}</li>)
      ) : (
        <>
          <li>Online Video Consultation</li>
          <li>Medical Diagnosis & Treatment</li>
          <li>Prescription & Follow-up Care</li>
          <li>Health Consultation & Advice</li>
        </>
      )}
    </ul>
  </div>
) : null}

          {/* Patient Reviews */}
          {doctor.patientReviews && doctor.patientReviews.length > 0 && (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-[#003057]">Patient Reviews</h3>
              <div className="space-y-3 sm:space-y-4 mt-3">
                {(showAllReviews
                  ? doctor.patientReviews
                  : doctor.patientReviews.slice(0, 3)
                ).map((review, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 p-3 sm:p-4 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-[#003057] text-sm sm:text-base">{review.name}</p>
                      <div className="flex items-center text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
              {doctor.patientReviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-3 sm:mt-4 text-[#0071BC] font-medium hover:underline text-sm sm:text-base"
                >
                  {showAllReviews ? "Show Less Reviews" : "View More Reviews"}
                </button>
              )}
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => navigate(isOnlineProfile ? "/online-consultation" : "/offline-doctors")}
            className="border border-[#0071BC] text-[#0071BC] px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-blue-50 transition text-sm sm:text-base font-medium"
          >
            ← Back to {isOnlineProfile ? "Online Doctors" : "Doctors"}
          </button>
        </div>
      </div>
    </div>
  );
}

// src/pages/OnlineDoctorProfile.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Video, Languages, Award, Calendar } from "lucide-react";

export default function OnlineDoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const offlineDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
  const onlineDoctors = JSON.parse(localStorage.getItem("onlineDoctors") || "[]");
  const allDoctors = [...offlineDoctors, ...onlineDoctors];
  
  let doctor = allDoctors.find((d) => String(d.id) === String(id));
  if (!doctor && allDoctors.length > 0 && !id) {
    doctor = allDoctors[0];
  }

  if (!doctor) {
    return (    
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-[#6B7280] text-lg">❌ Doctor not found.</p>
        <button
          onClick={() => navigate("/online-consultation")}
          className="mt-6 px-6 py-3 bg-[#0071BC] text-white rounded-lg hover:bg-[#005A94] transition"
        >
          ← Back to Online Doctors
        </button>
      </div>
    );
  }
  

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar card */}
      <div className="bg-white shadow rounded-lg p-6 lg:col-span-1 border border-[#E5E9EB]">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#E5F6FD] flex items-center justify-center text-2xl font-bold text-[#0071BC] overflow-hidden">
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

        <h2 className="text-xl font-bold text-center mt-4 text-[#003057]">
          Dr. {doctor.fullName}
        </h2>

        {/* Degrees */}
        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <p className="text-[#0071BC] text-center font-medium text-sm mt-1">
            {doctor.qualifications.join(", ")}
          </p>
        )}

        <p className="text-[#00A1C9] text-center font-medium mt-1">
          {doctor.specialization}
        </p>

        <div className="flex justify-center gap-2 mt-3 text-[#2E8B57] text-sm font-medium">
          <ShieldCheck className="w-4 h-4" /> Verified Doctor
        </div>

        <div className="mt-6 space-y-3 text-sm">
          {doctor.experience && (
            <div className="p-3 bg-[#F8FAFC] rounded-lg text-center border border-[#E5E9EB]">
              <p className="font-semibold text-[#003057]">
                {doctor.experience}+ yrs
              </p>
              <p className="text-[#6B7280]">Experience</p>
            </div>
          )}

          {doctor.fee && (
            <div className="p-3 bg-[#F8FAFC] rounded-lg text-center border border-[#E5E9EB]">
              <p className="font-semibold text-lg text-[#003057]">
                ₹{doctor.fee}
              </p>
              <p className="text-[#6B7280]">Consultation Fee</p>
            </div>
          )}

          {doctor.rating && (
            <div className="p-3 bg-[#F8FAFC] rounded-lg text-center border border-[#E5E9EB]">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                <p className="font-semibold text-[#003057]">{doctor.rating}</p>
              </div>
              <p className="text-[#6B7280]">
                {doctor.reviews || 0} Reviews
              </p>
            </div>
          )}

          <div className="p-3 bg-[#F8FAFC] rounded-lg text-center border border-[#E5E9EB]">
            <Video className="w-5 h-5 text-[#2E8B57] mx-auto mb-1" />
            <p className="font-semibold text-[#003057]">Available Now</p>
            <p className="text-[#6B7280]">Online Consultation</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/booking/${doctor.id}`)}
          className="mt-6 w-full bg-gradient-to-r from-[#00A1C9] to-[#0071BC] text-white py-3 rounded-lg hover:bg-[#005A94] transition"
        >
          Book Video Consultation
        </button>
      </div>

      {/* Main content */}
      <div className="lg:col-span-2 space-y-8">
        {/* About */}
        <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
          <h3 className="text-lg font-bold text-[#003057]">About</h3>
          <p className="text-[#4B5563] mt-2 leading-relaxed">
            {doctor.bio ||
              `Dr. ${doctor.fullName} is a highly experienced ${doctor.specialization} specialist with ${doctor.experience} years of practice. Available for online video consultations to provide expert medical advice and treatment.`}
          </p>
        </div>

        {/* Languages */}
        {doctor.languages && Array.isArray(doctor.languages) && doctor.languages.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
            <h3 className="text-lg font-bold text-[#003057] flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#0071BC]" />
              Languages Spoken
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {doctor.languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#E5F6FD] text-[#0071BC] rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education/Qualifications */}
        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
            <h3 className="text-lg font-bold text-[#003057]">Education & Qualifications</h3>
            <ul className="list-disc pl-6 mt-2 text-[#4B5563] space-y-1">
              {doctor.qualifications.map((qual, i) => (
                <li key={i}>{qual}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Services */}
        {doctor.services && doctor.services.length > 0 ? (
          <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
            <h3 className="text-lg font-bold text-[#003057]">Services Offered</h3>
            <ul className="list-disc pl-6 mt-2 text-[#4B5563] space-y-1">
              {doctor.services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
            <h3 className="text-lg font-bold text-[#003057]">Services Offered</h3>
            <ul className="list-disc pl-6 mt-2 text-[#4B5563] space-y-1">
              <li>Online Video Consultation</li>
              <li>Medical Diagnosis & Treatment</li>
              <li>Prescription & Follow-up Care</li>
              <li>Health Consultation & Advice</li>
            </ul>
          </div>
        )}

        {/* Patient Reviews */}
        {doctor.patientReviews && doctor.patientReviews.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 border border-[#E5E9EB]">
            <h3 className="text-lg font-bold text-[#003057]">Patient Reviews</h3>
            <div className="space-y-4 mt-3">
              {(showAllReviews
                ? doctor.patientReviews
                : doctor.patientReviews.slice(0, 3)
              ).map((review, i) => (
                <div
                  key={i}
                  className="border border-[#E5E9EB] p-4 rounded-lg bg-[#F8FAFC] shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-[#003057]">{review.name}</p>
                    <div className="flex items-center text-[#FFD700]">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#FFD700]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#4B5563] text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
            {doctor.patientReviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-[#0071BC] font-medium hover:underline"
              >
                {showAllReviews ? "Show Less Reviews" : "View More Reviews"}
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/online-consultation")}
          className="border border-[#0071BC] text-[#0071BC] px-6 py-2 rounded-lg hover:bg-[#E5F6FD] transition"
        >
          ← Back to Online Doctors
        </button>
      </div>
    </div>
  );
}

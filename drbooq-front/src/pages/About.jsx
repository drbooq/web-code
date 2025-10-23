// src/pages/About.jsx - MOBILE-OPTIMIZED VERSION
import React from "react";
import {
  Users,
  Award,
  ShieldCheck,
  Clock,
  HeartPulse,
  Building2,
  Lock,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-white font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#4A4A4A]">
      {/* Intro Hero */}
      <section className="relative overflow-hidden bg-[#E6F3FA] py-12 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Badge */}
          <span className="inline-block bg-[#0071BC] text-white text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 shadow">
            🌟 Premium Trusted Care
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-[#003057]">
            About <span className="text-[#0071BC]">DRBOOQ</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-lg text-[#4A4A4A] max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
            DRBOOQ is India's healthcare partner for{" "}
            <b>trust, transparency, and care</b>.  
            We simplify the way patients connect with doctors & hospitals —
            ensuring secure, reliable, and stress-free healthcare for everyone.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <a
              href="/patient-signup"
              className="px-6 py-2.5 sm:py-3 rounded-lg bg-[#0071BC] text-white font-semibold shadow hover:bg-[#005a94] transition text-sm sm:text-base"
            >
              Get Started
            </a>
            <a
              href="/doctors"
              className="px-6 py-2.5 sm:py-3 rounded-lg border border-[#0071BC] text-[#0071BC] font-medium hover:bg-[#E6F3FA] transition text-sm sm:text-base"
            >
              Find Doctors
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-14 text-[#003057]">
            Our <span className="text-[#0071BC]">Mission & Vision</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 text-left">
            {/* Mission */}
            <div className="p-5 sm:p-8 bg-[#FFFFFF] rounded-2xl shadow border border-[#E5E9EB] hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#E6F3FA] text-[#0071BC] text-lg sm:text-xl">
                  🎯
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#003057]">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                To make healthcare <b>accessible, transparent, and stress-free</b>.  
                DRBOOQ empowers patients to connect with the right doctors and  
                hospitals through technology they can trust.
              </p>
            </div>

            {/* Vision */}
            <div className="p-5 sm:p-8 bg-[#FFFFFF] rounded-2xl shadow border border-[#E5E9EB] hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#E6F3FA] text-[#0071BC] text-lg sm:text-xl">
                  🚀
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#003057]">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                To become <b>India's most trusted healthcare companion</b> — where  
                patients and doctors rely on DRBOOQ for every medical need,  
                with confidence and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="bg-[#E6F3FA] py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 text-[#003057]">
            Why Patients & Doctors <span className="text-[#0071BC]">Trust Us</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "Verified Doctors",
                text: "Every doctor is verified with licenses, qualifications, and hospital affiliations.",
              },
              {
                icon: <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "Secure & Private",
                text: "Your health data and personal details are encrypted and never shared without consent.",
              },
              {
                icon: <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "Trusted Hospitals",
                text: "Partnered with reputed hospitals and clinics to ensure reliable healthcare.",
              },
              {
                icon: <HeartPulse className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "Patient-First",
                text: "Designed to make booking simple, transparent, and stress-free for patients.",
              },
              {
                icon: <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "Doctor-Friendly",
                text: "Doctors get a fair, transparent platform to showcase expertise and manage bookings.",
              },
              {
                icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071BC] mx-auto" />,
                title: "24/7 Support",
                text: "We're here round the clock to assist patients and doctors with any issues.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 sm:p-8 bg-white rounded-2xl shadow border border-[#E5E9EB] hover:shadow-md transition"
              >
                {item.icon}
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-[#003057]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[#4A4A4A] text-xs sm:text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
          {[
            { num: "100%", label: "Verified Doctors" },
            { num: "100%", label: "Secure Data" },
            { num: "24/7", label: "Support" },
            { num: "Pan-India", label: "Network" },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0071BC]">
                {s.num}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 text-center bg-[#0071BC] text-white px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4">Healthcare You Can Trust</h2>
        <p className="opacity-90 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
          DRBOOQ is here to connect patients with trusted doctors and hospitals.
          Built on transparency, security, and care.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-[#0071BC] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow hover:bg-gray-100 transition text-sm sm:text-base"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}

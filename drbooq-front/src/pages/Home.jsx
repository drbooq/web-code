import React, { useState } from "react";
import Hero from "../components/Hero";
import Specializations from "../components/home/Specializations";
import NearHospitals from "../components/home/NearHospitals";
import PrivacySection from "../components/home/PrivacySection";
import AppShowcase from "../components/home/AppShowcase";
import { specializations } from "../utils/constants";
import LatestArticles from "../components/home/LatestArticles";
import OnlineConsultation from "../components/home/OnlineConsultation";

export default function Home() {
  const [appPreviewOpen, setAppPreviewOpen] = useState(false);

  const theme = {
    primary: "#0071BC",
    dark: "#003057",
    light: "#E6F3FA",
    text: "#4A4A4A",
    bg: "#FFFFFF",
  };

  return (
    <div
      className="overflow-x-hidden"
      style={{
        "--brand-500": theme.primary,
        "--dark": theme.dark,
        "--light": theme.light,
        "--text": theme.text,
        "--bg": theme.bg,
      }}
    >
      {/* Hero Section */}
      <Hero />

      {/* 🌟 Trusted Data Marquee Section */}
      <div className="bg-[#E6F3FA] border-y border-[#C8E0F2] py-2 sm:py-3 overflow-hidden">
        <div className="marquee-track flex items-center gap-[5rem] sm:gap-[10rem] whitespace-nowrap">
          {/* One full loop */}
          <p className="text-[#003057] font-semibold text-[0.8rem] sm:text-lg flex items-center gap-[5rem] sm:gap-[10rem] leading-snug sm:leading-normal">
            <span>
              🌟 Welcome to{" "}
              <span className="text-[#0071BC] font-bold">DRBOOQ</span> — Your Trusted Healthcare Platform | Book Doctors
              Instantly | Explore Hospitals 🌟
            </span>

            <span>
              👩‍⚕️ In India, an estimated{" "}
              <span className="text-[#0071BC] font-bold">4+ Lakh</span> online doctor consultations are booked daily
              across leading telemedicine platforms 🇮🇳
            </span>

            <span>
              🏥 Around{" "}
              <span className="text-[#0071BC] font-bold">12,000</span> hospitals & clinics now support digital
              appointment systems nationwide
            </span>

            <span>
              💊 Over{" "}
              <span className="text-[#0071BC] font-bold">340 Million</span> online consultations have been completed
              through various digital health networks in recent years 🩺
            </span>
          </p>

          {/* Duplicate for seamless scrolling */}
          <p className="text-[#003057] font-semibold text-[0.8rem] sm:text-lg flex items-center gap-[5rem] sm:gap-[10rem] leading-snug sm:leading-normal">
            <span>
              🌟 Welcome to{" "}
              <span className="text-[#0071BC] font-bold">DRBOOQ</span> — Your Trusted Healthcare Platform | Book Doctors
              Instantly | Explore Hospitals
            </span>

            <span>
              👩‍⚕️ In India, an estimated{" "}
              <span className="text-[#0071BC] font-bold">4+ Lakh</span> online doctor consultations are booked daily
              across leading telemedicine platforms 🇮🇳
            </span>

            <span>
              🏥 Around{" "}
              <span className="text-[#0071BC] font-bold">12,000</span> hospitals & clinics now support digital
              appointment systems nationwide
            </span>

            <span>
              🩺 Over{" "}
              <span className="text-[#0071BC] font-bold">340 Million</span> online consultations have been completed
              through various digital health networks in recent years
            </span>
          </p>
        </div>
      </div>

      {/* Rest of the home content */}
      <Specializations specializations={specializations} />
      <NearHospitals />
            <OnlineConsultation />

      <PrivacySection />
      <LatestArticles />
      <AppShowcase appPreviewOpen={appPreviewOpen} setAppPreviewOpen={setAppPreviewOpen} />
    </div>
  );
}

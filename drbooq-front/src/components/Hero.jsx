import React from "react";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
<section
  className="
    relative bg-white 
    pt-14 sm:pt-32 pb-24 sm:pb-28
    font-['Inter','Helvetica Neue',Arial,sans-serif]
  "
>


      <div
        className="
          max-w-6xl mx-auto 
          px-6 sm:px-7 
          text-center 
          space-y-8 sm:space-y-12
          mt-3 sm:mt-0   /* ✅ pushes content slightly down only on mobile */
        "
      >
        {/* Title */}
        <div>
          <h1
            className="
              text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] 
              font-extrabold text-[#003057] 
              leading-snug tracking-tight
              whitespace-nowrap
            "
          >
            Book Your <span className="text-[#0071BC]">Doctor</span> Now
          </h1>

          <p
            className="
              mt-2 sm:mt-4 
              text-[0.9rem] sm:text-[1.15rem] md:text-[1.25rem] 
              text-[#4A4A4A] 
              max-w-2xl mx-auto 
              leading-relaxed
            "
          >
            Find trusted doctors and hospitals near you in just a few clicks
          </p>
        </div>

        {/* Booking Form (SearchBar) */}
        <div className="mt-6 sm:mt-10">
          <SearchBar />
        </div>

        {/* Trust Badges */}
        <div
          className="
            flex flex-wrap items-center justify-center 
            gap-4 sm:gap-8 
            text-[0.8rem] sm:text-sm md:text-base 
            text-[#4A4A4A] font-medium
          "
        >
          <span>🔒 Secure & Private</span>
          <span>👩‍⚕️ Verified Doctors</span>
          <span>⚡ Fast Booking</span>
        </div>
      </div>
    </section>
  );
}

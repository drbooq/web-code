// src/components/home/PrivacySection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrivacySection() {
  return (
    <section
      className="
        hidden sm:block       
        relative bg-[#F7FBFD] overflow-hidden
        font-['Inter','Helvetica Neue',Arial,sans-serif]
        py-8 sm:py-28
        mt-1 sm:mt-0
      "
    >
      {/* Background Gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-20 w-[110%] h-[120%] rounded-3xl transform -rotate-6 
                   bg-gradient-to-br from-[var(--brand-500)]/30 via-sky-100 to-transparent opacity-30 blur-2xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-4 sm:pt-6"
          >
            {/* Title */}
            <h3 className="text-[1.6rem] sm:text-[2.5rem] font-extrabold text-[#003057] leading-snug tracking-tight max-w-lg">
              Safety of your data is our{" "}
              <span className="text-[#0071BC]">top priority</span>.
            </h3>

            {/* Description */}
            <p className="mt-2 sm:mt-6 text-[0.83rem] sm:text-[1.125rem] text-[#4A4A4A] leading-relaxed max-w-xl">
              Your data is encrypted and secure — only you can access it, always.
            </p>

            {/* Features List */}
            <ul className="mt-6 sm:mt-10 space-y-4 sm:space-y-5 max-w-md">
              {[
                {
                  title: "Continuous security monitoring",
                  desc: "Automatic alerts keep systems secure.",
                  icon: (
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  ),
                },
                {
                  title: "Encrypted backups",
                  desc: "Your records are safely encrypted.",
                  icon: (
                    <>
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c0 1.657-1.343 3-3 3S6 12.657 6 11s1.343-3 3-3 3 1.343 3 3z"
                      />
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21v-2a4 4 0 00-4-4H9"
                      />
                    </>
                  ),
                },
                {
                  title: "Access control",
                  desc: "Only authorized users access your data.",
                  icon: (
                    <>
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c-2.761 0-5 2.686-5 6v1h10v-1c0-3.314-2.239-6-5-6z"
                      />
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11V7m0 0l-3 3m3-3 3 3"
                      />
                    </>
                  ),
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow text-[#0071BC]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold text-[#003057] text-[1.1rem]">
                      {item.title}
                    </div>
                    <div className="text-sm text-[#4A4A4A] leading-snug mt-1">
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Button */}
            <div className="mt-10">
              <Link
                to="/privacy"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0071BC] text-white text-base font-semibold shadow-md hover:bg-[#005a94] transition"
              >
                <span>Learn more about privacy</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* IMAGE (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-br from-[var(--brand-500)] to-pink-400 rounded-3xl blur-3xl opacity-20 rotate-6 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-[420px] md:h-[480px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(10,25,47,0.12), rgba(10,25,47,0.12)), url('/images/secure/unsplash.jpg')",
                    borderRadius: "24px",
                    transform: "rotate(4deg)",
                  }}
                />
                <div className="absolute -bottom-6 left-6 right-6 h-6 rounded-b-3xl bg-white/60 blur-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

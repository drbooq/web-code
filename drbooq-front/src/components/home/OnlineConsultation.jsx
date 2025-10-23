import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, ShieldCheck, Clock, HeartHandshake, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function OnlineConsultation() {
  const navigate = useNavigate();

  const handleBookOnline = () => {
    navigate("/online-consultation");
  };

  return (
    <section className="relative bg-[#F7FBFD] py-16 sm:py-24 font-['Inter','Helvetica Neue',Arial,sans-serif] overflow-x-hidden">
      {/* ✅ Background Lights (prevent overflow) */}
      <div className="absolute -top-20 -left-16 w-[400px] sm:w-[480px] h-[400px] sm:h-[480px] bg-[#0071BC]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-[#0071BC]/5 rounded-full blur-3xl -z-10"></div>

      {/* ✅ MOBILE VIEW */}
      {/* ✅ MOBILE VIEW (Improved Layout) */}
<div className="sm:hidden text-center overflow-hidden px-10 mx-auto max-w-[95%]">
  {/* Heading */}
  <h2 className="text-[1.8rem] font-bold text-[#003057] leading-tight tracking-tight">
    Book 1-to-1{" "}
    <span className="text-[#0071BC]">Online Consultation</span>
  </h2>

  {/* Short description */}
  <p className="mt-3 text-[#4A4A4A] text-[0.9rem] leading-snug max-w-xs mx-auto">
    Talk to verified doctors anytime, anywhere — privately and securely.
  </p>

  {/* Image */}
  <div className="mt-6 flex justify-center">
    <img
      src="/images/online-consultation.png"
      alt="Online Consultation"
      className="w-[82%] rounded-2xl shadow-xl border border-[#D0E7F8]/50 object-contain"
    />
  </div>

  {/* ✅ Book Online Button — moved directly below image */}
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={handleBookOnline}
    className="mt-5 bg-[#0071BC] hover:bg-[#005A91] text-white px-6 py-2.5 rounded-full font-semibold text-[0.85rem] shadow-md transition-all"
  >
    Book Online Consultation
  </motion.button>

  {/* Connect with Doctors section (comes AFTER button now) */}
  <h3 className="mt-8 text-[1.3rem] font-bold text-[#003057] leading-snug">
    Connect with Doctors{" "}
    <span className="text-[#0071BC]">in Your Language</span>
  </h3>

  <p className="mt-3 text-[#4A4A4A] text-[0.85rem] leading-snug max-w-xs mx-auto">
    Choose doctors who speak English, Hindi, Tamil, Malayalam, and more —
    get care that understands you.
  </p>

  {/* ✅ Feature Badges (rebalanced spacing) */}
  <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-xs mx-auto">
    {[
      { icon: <Video size={16} />, label: "1-to-1 HD Video Call" },
      { icon: <ShieldCheck size={16} />, label: "Secure & Private" },
      { icon: <Clock size={16} />, label: "Instant Doctor Access" },
      { icon: <HeartHandshake size={16} />, label: "Trusted Professionals" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-start gap-2 bg-white rounded-lg border border-[#E3EDF7] shadow-sm px-3 py-2 text-[#003057] text-[0.75rem] font-medium"
      >
        <span className="text-[#0071BC]">{item.icon}</span>
        <span className="leading-tight text-left break-words">
          {item.label}
        </span>
      </div>
    ))}
  </div>
</div>

      {/* ✅ DESKTOP VIEW (unchanged) */}
      <div className="hidden sm:block overflow-hidden">
        {/* 🩺 Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#003057] leading-tight tracking-tight">
            Book 1-to-1{" "}
            <span className="text-[#0071BC]">Online Consultation</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[#4A4A4A] text-lg leading-relaxed">
            Speak to verified doctors anytime, anywhere — instantly, privately,
            and in the language you’re most comfortable with. Get real medical
            advice through secure, high-quality video consultations.
          </p>

          {/* Quick Feature Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { icon: <Video size={20} />, label: "1-to-1 HD Video Call" },
              { icon: <ShieldCheck size={20} />, label: "Secure & Private" },
              { icon: <Clock size={20} />, label: "Instant Doctor Access" },
              {
                icon: <HeartHandshake size={20} />,
                label: "Trusted Professionals",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="flex items-center gap-2 bg-gradient-to-br from-white to-[#F5FAFF] shadow-sm hover:shadow-md rounded-xl px-5 py-3 border border-[#E3EDF7] transition-all"
              >
                <span className="text-[#0071BC]">{item.icon}</span>
                <span className="text-[#003057] text-sm font-medium">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 💬 Middle Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto gap-0 lg:gap-3 xl:gap-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left px-2 sm:px-3"
          >
            <h3 className="text-3xl font-bold text-[#003057] mb-3 leading-snug">
              Connect with Doctors{" "}
              <span className="text-[#0071BC]">in Your Language</span>
            </h3>
            <p className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
              Choose from specialists who speak your preferred language —
              English, Hindi, Tamil, Malayalam, and more. Filter by language and
              get personalized care that truly understands you.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={handleBookOnline}
              className="bg-[#0071BC] hover:bg-[#005A91] text-white px-8 py-3 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:shadow-xl transition-all"
            >
              Book Online Consultation
            </motion.button>

            <p className="mt-3 text-[#4A4A4A] text-sm italic">
              💬 Speak freely. Get care that listens — in your language.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center lg:justify-start"
          >
            <div className="relative flex justify-center">
              <img
                src="/images/online-consultation.png"
                alt="Online Doctor Consultation"
                className="w-[75%] sm:w-[65%] md:w-[58%] lg:w-[52%] xl:w-[58%] rounded-2xl shadow-2xl border border-[#D0E7F8]/50 object-contain"
              />
              <div className="absolute bottom-3 right-5 bg-[#0071BC] text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Live • Secure Video Call
              </div>
            </div>
          </motion.div>
        </div>

        {/* 🌿 Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center max-w-6xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#003057] mb-3">
            Why Patients{" "}
            <span className="text-[#0071BC]">Love DRBOOQ Consultations</span>
          </h3>
          <p className="text-[#4A4A4A] text-base mb-10 max-w-3xl mx-auto">
            Join thousands of patients who prefer quick, secure, and
            language-friendly doctor consultations across India.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Star size={22} className="text-yellow-500 mx-auto mb-2" />,
                title: "Trusted by Millions",
                desc: "Verified doctors and genuine reviews you can rely on.",
              },
              {
                icon: <Clock size={22} className="text-[#0071BC] mx-auto mb-2" />,
                title: "Instant Access",
                desc: "Connect instantly — no waiting rooms or travel hassles.",
              },
              {
                icon: (
                  <ShieldCheck
                    size={22}
                    className="text-green-600 mx-auto mb-2"
                  />
                ),
                title: "Safe & Private",
                desc: "Your calls and data are fully encrypted and confidential.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="bg-white rounded-2xl border border-[#E1EAF2] shadow-sm hover:shadow-md p-5 transition-all text-center"
              >
                {item.icon}
                <h4 className="text-base font-semibold text-[#003057] mb-1">
                  {item.title}
                </h4>
                <p className="text-[#4A4A4A] text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

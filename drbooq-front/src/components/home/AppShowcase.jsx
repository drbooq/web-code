// AppShowcase.jsx - FAST ENTRANCE, INSTANT EXIT
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Users, Clock, FileText, Sparkles, Zap, CheckCircle2, X, Construction } from "lucide-react";


export default function AppShowcase({ appPreviewOpen, setAppPreviewOpen }) {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  // Mobile-optimized variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1]
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      },
    }),
  };

  // Modal animation variants - FASTER ENTRANCE, NO EXIT
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.15 } // Faster backdrop
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: -30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20, // Reduced for faster animation
        stiffness: 400, // Increased for faster animation
        duration: 0.3 // Shorter duration
      }
    }
    // NO EXIT ANIMATION - removed exit variant
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowMaintenanceModal(true);
  };

  const closeModal = () => {
    setShowMaintenanceModal(false);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-white via-blue-50/30 to-white font-['Inter','Helvetica Neue',Arial,sans-serif] pt-12 sm:pt-20 pb-10 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-6 sm:gap-24 items-center">
          
          {/* ✅ TOP: MOBILE Premium Heading - NO ANIMATION */}
          <div className="block sm:hidden text-center mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0071BC]" />
              <span className="text-[0.7rem] font-semibold text-[#005186]">Healthcare in Your Pocket</span>
            </div>
            
            <h3 className="text-[2rem] font-extrabold text-[#0c4675] leading-tight">
              Your Health,{" "}
              <span className="bg-gradient-to-r from-[#0071BC] to-[#407192] bg-clip-text text-transparent">
                In Your Hands
              </span>
            </h3>
          </div>

          {/* ✅ LEFT: IMAGE PREVIEW - ANIMATION KEPT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex justify-center sm:justify-start order-1 sm:order-none"
          >
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-10 left-5 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-10 right-5 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"
              />
            </div>

            <motion.button
              onClick={() => setAppPreviewOpen((v) => !v)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-[200px] sm:w-[380px] rounded-3xl focus:outline-none group"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <motion.div
                className="relative"
                animate={
                  appPreviewOpen
                    ? { scale: 1.05, rotate: 0, y: -8 }
                    : { scale: 1, rotate: -1, y: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img
                  src="/images/secure/myimage.jpg"
                  alt="Drbooq app preview"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = "1";
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1200&auto=format&fit=crop";
                    }
                  }}
                  className="w-full h-[330px] sm:h-[520px] object-cover rounded-[2rem] sm:rounded-3xl shadow-2xl ring-4 ring-white/50"
                />
                <div className="absolute inset-0 rounded-[2rem] sm:rounded-3xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Floating Mini Card */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={
                  appPreviewOpen
                    ? { 
                        opacity: 1, 
                        y: 0, 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0]
                      }
                    : { opacity: 0.95, y: 10, scale: 0.95 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  repeat: appPreviewOpen ? Infinity : 0,
                  repeatType: "mirror",
                }}
                className="absolute -top-3 right-2 w-[7.5rem] sm:w-44 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-white/90 shadow-xl border border-white/60"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[0.6rem] sm:text-xs font-medium text-gray-700">Online Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[0.6rem] sm:text-xs font-bold">
                    DM
                  </div>
                  <div>
                    <div className="text-[0.65rem] sm:text-sm font-semibold text-gray-900">Dr. Meera</div>
                    <div className="text-[0.55rem] sm:text-xs text-gray-600">Dermatologist</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="sm:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/95 shadow-lg border border-white/60 flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-[0.7rem] font-semibold text-gray-800">Instant Booking</span>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* ✅ RIGHT TEXT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center sm:text-left space-y-4 sm:space-y-8 order-2 sm:order-none mt-4 sm:mt-0"
          >
            {/* Desktop heading */}
            <motion.h3
              variants={textVariants}
              custom={0}
              className="hidden sm:block text-[2.7rem] md:text-[3rem] font-bold text-[#003057] leading-snug"
            >
              Your Health,{" "}
              <span className="text-[#0071BC]">In Your Hands</span>
            </motion.h3>

            {/* Desktop description */}
            <motion.p
              variants={textVariants}
              custom={1}
              className="hidden sm:block text-lg text-[#4A4A4A] max-w-md leading-relaxed"
            >
              Book doctors, manage records, and consult securely — all in one app.
            </motion.p>

            {/* ✅ MIDDLE SECTION - MOBILE ONLY (NO ANIMATIONS) */}
            <div className="sm:hidden space-y-4">
              {/* Description with accent line - NO ANIMATION */}
              <div className="relative">
                <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#0071BC] to-[#005186] rounded-full" />
                <p className="text-[0.95rem] text-[#4A4A4A] leading-relaxed pl-4 font-medium">
                  Book doctors, manage records, and consult securely — all in one app.
                </p>
              </div>

              {/* Feature List - NO ANIMATIONS */}
              <div className="space-y-2.5">
                {[
                  { text: "Instant booking — no waiting time" },
                  { text: "Smart health records at your fingertips" },
                  { text: "Bank-level security for your data" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#0071BC] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[0.85rem] text-gray-700 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop highlights */}
            <motion.ul
              variants={textVariants}
              custom={2}
              className="hidden sm:block space-y-4 text-left text-[#4A4A4A] max-w-md"
            >
              <li className="flex items-start gap-3 text-base">
                <Clock className="w-5 h-5 text-[#0071BC] mt-0.5" />
                <span><strong>Instant booking</strong> — no waiting time.</span>
              </li>
              <li className="flex items-start gap-3 text-base">
                <FileText className="w-5 h-5 text-[#0071BC] mt-0.5" />
                <span><strong>Smart health records</strong> at your fingertips.</span>
              </li>
              <li className="flex items-start gap-3 text-base">
                <ShieldCheck className="w-5 h-5 text-[#0071BC] mt-0.5" />
                <span><strong>Bank-level security</strong> for your data.</span>
              </li>
            </motion.ul>

            {/* ✅ BOTTOM: CTA Button - ANIMATION KEPT FOR MOBILE */}
            <motion.div
              variants={cardVariants}
              custom={2}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
            >
              <motion.a
                href="#"
                onClick={handleDownloadClick}
                whileTap={{ scale: 0.96 }}
                className="sm:hidden w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0071BC] to-[#005186] text-white rounded-2xl text-[0.9rem] font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Download App Now
              </motion.a>

              {/* Desktop buttons */}
              <a
                href="#"
                onClick={handleDownloadClick}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-black text-white rounded-full shadow-md text-[0.9rem] font-medium hover:opacity-90 transition"
              >
                App Store
              </a>
              <a
                href="#"
                onClick={handleDownloadClick}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-white border rounded-full shadow-md text-[0.9rem] font-medium hover:scale-105 transition"
              >
                Google Play
              </a>
            </motion.div>

            {/* ✅ BOTTOM: Trust Badges - NO ANIMATIONS ON MOBILE */}
            <div className="sm:hidden flex justify-center gap-2 mt-4">
              {[
                { icon: ShieldCheck, label: "Trusted" },
                { icon: Lock, label: "Secure" },
                { icon: Users, label: "Verified" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-200"
                >
                  <item.icon className="w-3.5 h-3.5 text-[#0071BC]" />
                  <span className="text-[0.7rem] font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Desktop trust row */}
            <motion.div
              variants={textVariants}
              custom={4}
              className="hidden sm:flex mt-8 flex-wrap justify-start gap-6 text-sm text-[#4A4A4A]"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0071BC]" />
                <span>Trusted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#0071BC]" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0071BC]" />
                <span>Verified doctors</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ✨ MAINTENANCE MODAL - FAST ENTRANCE, INSTANT EXIT */}
      <AnimatePresence mode="wait">
        {showMaintenanceModal && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              // NO EXIT - removes exit animation
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, duration: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                  <Construction className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  App Under Maintenance
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We're working hard to bring you the best healthcare experience. Our app will be launching soon!
                </p>
                
                {/* Additional Info */}
                <div className="pt-4 pb-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#0071BC]" />
                    <span className="text-sm font-medium text-[#0071BC]">Coming Soon</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#0071BC] to-[#005186] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

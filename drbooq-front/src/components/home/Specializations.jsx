import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import specializations from "../../data/specializations";

export default function Specializations() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentDot, setCurrentDot] = useState(0);
  const scrollRef = useRef(null);

  const handleCardClick = (specialization) => {
    navigate(`/offline-doctors?specialization=${encodeURIComponent(specialization)}`);
    setShowModal(false);
  };

  // ✅ IMPROVED: Better scroll detection with accurate card tracking
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      // Calculate which section we're in (0-3)
      // Each section shows ~2 cards, so we divide by roughly half the container width
      const scrollPercentage = scrollLeft / (container.scrollWidth - containerWidth);
      const dotIndex = Math.min(Math.round(scrollPercentage * 3), 3);
      
      setCurrentDot(dotIndex);
    }
  };

  // ✅ IMPROVED: Scroll to show approximately 2 cards per dot position
  const scrollToDot = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const targetScroll = (maxScroll / 3) * index;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setCurrentDot(index);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="bg-[#F7FBFD] py-16 sm:py-24 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 w-full">
        {/* Title */}
        <h2 className="text-[1.9rem] sm:text-[2.6rem] md:text-[3rem] font-bold text-[#003057] leading-tight">
          Book Doctors Through{" "}
          <span className="text-[#0071BC]">Specialization</span>
        </h2>

        <p className="hidden sm:block text-[#4A4A4A] mt-5 mb-16 max-w-2xl mx-auto text-[1.1rem] leading-relaxed">
          Choose from top specializations to connect with expert doctors across trusted medical fields.
        </p>

        {/* ✅ Desktop Grid - UNCHANGED */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {specializations.slice(0, 8).map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.title)}
              className="group bg-white rounded-xl border border-[#E5E9EB] shadow-sm 
                         p-6 flex flex-col items-center text-center cursor-pointer
                         transition-all duration-300 ease-in-out 
                         hover:shadow-lg hover:-translate-y-2 hover:border-[#0071BC]/50"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-20 object-contain rounded-full bg-[#F7FBFD] p-2 group-hover:scale-105 transition-transform duration-300 shadow-sm"
              />
              <h3 className="mt-4 font-semibold text-[1.25rem] text-[#003057] group-hover:text-[#0071BC] transition-colors">
                {item.title}
              </h3>
              <p className="text-[1rem] text-[#4A4A4A] mt-2 leading-snug">{item.desc}</p>
              <p className="text-[#0071BC] text-[0.85rem] font-medium mt-3">{item.doctors}</p>
            </div>
          ))}
        </div>

        {/* ✅ Desktop Button - UNCHANGED */}
        <button
          onClick={() => setShowModal(true)}
          className="hidden sm:inline-block px-8 py-3.5 border border-[#0071BC] text-[#0071BC] text-[1rem] font-semibold rounded-lg 
                     bg-white hover:bg-[#E6F3FA] transition-all duration-300 ease-in-out shadow-sm mb-8"
        >
          View All Specializations
        </button>

        {/* ✅ Mobile Scrollable Cards WITH IMPROVED SCROLL TRACKING */}
        <div 
          ref={scrollRef}
          className="sm:hidden overflow-x-auto flex gap-3 px-1 mt-4 pb-3 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {specializations.slice(0, 8).map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.title)}
              className="min-w-[150px] bg-white rounded-xl border border-[#E5E9EB] shadow-sm 
                         p-3 flex flex-col items-center text-center cursor-pointer
                         transition-all duration-300 ease-in-out hover:shadow-md hover:border-[#0071BC]/50 snap-start"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-14 object-contain rounded-full bg-[#F7FBFD] p-1 shadow-sm"
              />
              <h3 className="mt-2 font-semibold text-[0.85rem] text-[#003057] leading-snug">
                {item.title}
              </h3>
              <p className="text-[0.7rem] text-[#4A4A4A] mt-1 line-clamp-2 leading-tight">
                {item.desc.split(" ").slice(0, 8).join(" ")}...
              </p>
              <p className="text-[#0071BC] text-[0.65rem] font-medium mt-1">
                {item.doctors}
              </p>
            </div>
          ))}

          {/* ✅ View All Button for mobile */}
          <button
            onClick={() => setShowModal(true)}
            className="min-w-[140px] bg-[#0071BC] text-white text-[0.8rem] font-semibold rounded-lg px-4 py-3 shadow-sm hover:bg-[#005a94] transition snap-start"
          >
            View All
          </button>
        </div>

        {/* ✅ Accurate Swipe Dots - MOBILE ONLY */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => scrollToDot(dot)}
              className={`transition-all duration-300 ease-out rounded-full ${
                currentDot === dot
                  ? 'w-2 h-2 bg-[#0071BC] scale-110'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ✅ Compact Mobile Popup - UNCHANGED */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 animate-fadeIn">
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl 
                       p-5 sm:p-10 relative max-h-[85vh] sm:max-h-[80vh] overflow-y-auto animate-slideDown"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-5 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Title */}
            <h3 className="text-[1.4rem] sm:text-[1.9rem] font-bold mb-6 sm:mb-8 text-center text-[#003057]">
              All Specializations
            </h3>

            {/* ✅ Compact grid for mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 px-1 sm:px-0">
              {specializations.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(item.title)}
                  className="bg-white border border-[#E5E9EB] rounded-xl p-3 sm:p-6 text-center cursor-pointer 
                             transition-all duration-300 ease-in-out hover:shadow-md hover:border-[#0071BC]/40"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 sm:w-14 sm:h-14 mx-auto object-contain rounded-full bg-[#F7FBFD] p-1 sm:p-2"
                  />
                  <h4 className="mt-2 sm:mt-5 font-semibold text-[0.8rem] sm:text-[1.2rem] text-[#003057] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[0.7rem] sm:text-[0.95rem] text-[#4A4A4A] mt-1 sm:mt-2 line-clamp-2 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add scrollbar-hide utility */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

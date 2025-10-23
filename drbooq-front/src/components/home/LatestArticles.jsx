import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogs from "../../data/blogs";
import { X, ChevronRight } from "lucide-react";

export default function LatestArticles() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [currentDot, setCurrentDot] = useState(0);
  const scrollRef = useRef(null);

  const handleReadMore = (id) => {
    navigate(`/article/${id}`);
    setShowMore(false);
  };

  // ✅ Handle scroll to update active dot
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const scrollPercentage = scrollLeft / (container.scrollWidth - containerWidth);
      const dotIndex = Math.min(Math.round(scrollPercentage * 2), 2); // 3 dots (0-2)
      setCurrentDot(dotIndex);
    }
  };

  // ✅ Scroll to specific dot
  const scrollToDot = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const targetScroll = (maxScroll / 2) * index;
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
<section className="hidden sm:block bg-white py-16 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Title */}
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-[1.8rem] md:text-[3.4rem] font-bold text-[#003057] leading-snug max-w-2xl mx-auto">
            Read the latest{" "}
            <span className="text-[#0071BC]">health articles</span>
          </h2>
        </div>

        {/* ✅ Desktop View — UNCHANGED */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 6).map((article) => (
            <div
              key={article.id}
              onClick={() => handleReadMore(article.id)}
              className="cursor-pointer group transition"
            >
              <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-4 text-left transition-colors duration-300 group-hover:text-[#0071BC]">
                <h3 className="text-lg md:text-xl font-semibold text-[#003057] group-hover:text-[#0071BC] transition">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ IMPROVED: Mobile View — Desktop Card Style (No Border, Rounded Images) */}
        <div
          ref={scrollRef}
          className="sm:hidden flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-2 pb-3"
        >
          {blogs.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => handleReadMore(article.id)}
              className="cursor-pointer group transition min-w-[75%] snap-center flex-shrink-0 active:opacity-90"
            >
              {/* ✅ Image with rounded corners like desktop */}
              <div className="w-full h-48 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-active:scale-95 transition-transform duration-300"
                />
              </div>

              {/* ✅ Text Content - Desktop style */}
              <div className="mt-4 text-left">
                <h3 className="text-[1rem] font-semibold text-[#003057] leading-tight mb-2 line-clamp-2 group-active:text-[#0071BC] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[0.85rem] text-gray-600 leading-snug line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Swipe Dots - MOBILE ONLY */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => scrollToDot(dot)}
              className={`transition-all duration-300 ease-out rounded-full ${
                currentDot === dot
                  ? 'w-2 h-2 bg-[#0071BC] scale-110'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to article ${dot + 1}`}
            />
          ))}
        </div>

        {/* ✅ View All Button (Mobile Only) */}
        <div className="text-center mt-6 sm:hidden">
          <button
            onClick={() => setShowMore(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#0071BC] to-[#005a94] text-white rounded-xl font-semibold text-[0.9rem] shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            View All Articles
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ✅ IMPROVED: Better Popup Modal (Mobile Only) */}
      {showMore && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:hidden z-50 animate-fadeIn">
          <div className="w-full max-h-[85vh] bg-white shadow-2xl rounded-t-3xl p-5 relative overflow-y-auto animate-slideUp">
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition"
              onClick={() => setShowMore(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-[1.3rem] font-bold text-[#003057]">
                All Health Articles
              </h3>
              <p className="text-[0.85rem] text-gray-500 mt-1">
                Explore more insights and tips
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleReadMore(article.id)}
                  className="cursor-pointer group transition bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden active:scale-98 hover:shadow-lg"
                >
                  <div className="flex gap-3 p-3">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-active:scale-95 transition-transform duration-300"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[0.95rem] font-bold text-[#003057] leading-tight mb-1 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[0.75rem] text-gray-600 leading-snug line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      {/* Read More Link */}
                      <div className="mt-2 flex items-center gap-1 text-[#0071BC] text-[0.75rem] font-semibold">
                        <span>Read More</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0.8;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }

        /* Hide scrollbars */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}

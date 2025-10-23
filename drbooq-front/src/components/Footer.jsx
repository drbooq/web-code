import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { FaInstagram, FaXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";


export default function Footer() {
  const [openSection, setOpenSection] = useState(null);


  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };


  return (
    <footer className="bg-[#114272] text-white font-['Inter','Helvetica Neue',Arial,sans-serif]">
      {/* ===================== DESKTOP VIEW ===================== */}
      <div
        className="
          hidden sm:grid
          max-w-7xl mx-auto px-4 sm:px-6 
          py-10 sm:py-20 grid-cols-1 md:grid-cols-4 
          gap-8 sm:gap-14
        "
      >
        {/* Brand + About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-6 tracking-wide">
            DRBOOQ
          </h2>
          <p className="text-[0.8rem] sm:text-[0.95rem] opacity-90 leading-relaxed max-w-xs mx-auto md:mx-0">
            Your trusted healthcare partner, connecting you with the best
            doctors across India. Healthcare made simple, secure, and accessible.
          </p>
          {/* ✅ UPDATED: Social Media Links */}
          <div className="flex justify-center md:justify-start gap-4 mt-5 sm:mt-8 text-lg sm:text-2xl">
            <a 
              href="https://www.instagram.com/drbooq_official" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram" 
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://x.com/drbooq" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="X" 
              className="hover:text-gray-200 transition"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://www.linkedin.com/in/afsal01" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn" 
              className="hover:text-blue-300 transition"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://www.facebook.com/drbooq" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook" 
              className="hover:text-blue-400 transition"
            >
              <FaFacebook />
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/offline-doctors" className="hover:text-[#4DD0E1] transition">Offline Doctors</Link></li>
            <li><Link to="/online-consultation" className="hover:text-[#4DD0E1] transition">Online Doctors</Link></li>
            <li><Link to="/hospitals" className="hover:text-[#4DD0E1] transition">Find a Hospital</Link></li>
            <li><Link to="/staff/dashboard" className="hover:text-[#4DD0E1] transition">For Doctors</Link></li>
            <li><Link to="/staff/signup" className="hover:text-[#4DD0E1] transition">Doctor Register</Link></li>
            <li><Link to="/staff/signup" className="hover:text-[#4DD0E1] transition">Hospital Register</Link></li>
          </ul>
        </div>


        {/* Support */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wide">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/help" className="hover:text-[#4DD0E1] transition">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-[#4DD0E1] transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#4DD0E1] transition">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-[#4DD0E1] transition">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-[#4DD0E1] transition">About DRBOOQ</Link></li>
          </ul>
        </div>


        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold mb-3 sm:mb-5 text-sm uppercase tracking-wide">Contact Us</h3>
          <ul className="space-y-3 sm:space-y-4 text-sm">
            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#4DD0E1]" />
              <p className="text-[0.8rem] sm:text-sm">support@drbooq.com</p>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#4DD0E1]" />
              <p>
                DRBOOQ Health Technologies<br />Mumbai, Maharashtra, India
              </p>
            </li>
          </ul>
        </div>
      </div>


      {/* DESKTOP COPYRIGHT BAR */}
      <div className="hidden sm:block border-t border-white/20 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm opacity-80">
          <p className="mb-1">
            Made with <span className="text-red-400">❤️</span> for better healthcare
          </p>
          <p>
            © {new Date().getFullYear()} <span className="font-semibold">DRBOOQ</span>. All rights reserved.
          </p>
        </div>
      </div>


      {/* ===================== MOBILE VIEW ===================== */}
      <div className="sm:hidden px-4 py-6 space-y-3">
        {[
          {
            title: "Quick Links",
            content: (
              <ul className="space-y-2 text-[0.85rem] pl-3">
                <li><Link to="/offline-doctors">Offline Doctors</Link></li>
                <li><Link to="/online-consultation">Online Doctors</Link></li>
                <li><Link to="/hospitals">Find a Hospital</Link></li>
                <li><Link to="/staff-dashboard">For Doctors</Link></li>
                <li><Link to="/staff-signup">Doctor Register</Link></li>
                <li><Link to="/staff-signup">Hospital Register</Link></li>
              </ul>
            ),
          },
          {
            title: "Support",
            content: (
              <ul className="space-y-2 text-[0.85rem] pl-3">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About DRBOOQ</Link></li>
              </ul>
            ),
          },
          {
            title: "Contact Us",
            content: (
              <ul className="space-y-2 text-[0.85rem] pl-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#4DD0E1]" />
                  <span>support@drbooq.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#4DD0E1]" />
                  <span>Mumbai, Maharashtra, India</span>
                </li>
              </ul>
            ),
          },
          {
            title: "Social",
            content: (
              <div className="flex gap-4 text-3xl justify-center pt-2">
                <a href="https://www.instagram.com/drbooq_official" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://x.com/drbooq" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
                <a href="https://www.linkedin.com/in/afsal01" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/drbooq" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>
            ),
          },
        ].map(({ title, content }) => (
          <div key={title} className="border border-white/20 rounded-md">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold"
              onClick={() => toggleSection(title)}
            >
              <span>{title}</span>
              {openSection === title ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openSection === title && (
              <div className="bg-[#0f3b66]/40 px-4 py-3 border-t border-white/10">
                {content}
              </div>
            )}
          </div>
        ))}


        {/* Bottom Logo + Copyright */}
        <div className="pt-6 text-center opacity-80">
          <h2 className="text-2xl font-extrabold mb-2">DRBOOQ</h2>
          <p className="text-[0.8rem]">
            Made with <span className="text-red-400">❤️</span> for better healthcare
          </p>
          <p className="text-[0.7rem] mt-1">
            © {new Date().getFullYear()} DRBOOQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

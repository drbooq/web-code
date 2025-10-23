// src/pages/Contact.jsx
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#EAF3FA] py-16 px-6 font-['Inter','Helvetica Neue',Arial,sans-serif]">
      <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-md">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#003057] mb-3">
            Contact Us
          </h1>
          <p className="text-[#4A4A4A] text-base max-w-xl mx-auto">
            Have questions about <strong>privacy, security, or bookings</strong>?  
            We’re here to help — reach out to us anytime and we’ll respond as soon as possible.
          </p>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 text-center">
          <div className="flex flex-col items-center">
            <Mail className="h-6 w-6 text-[#0071BC] mb-2" />
            <p className="text-sm text-gray-600">Email Us</p>
            <a
              href="mailto:support@drbooq.com"
              className="text-[#003057] font-medium hover:text-[#0071BC] transition"
            >
              support@drbooq.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="h-6 w-6 text-[#0071BC] mb-2" />
            <p className="text-sm text-gray-600">Call Us</p>
            <a
              href="tel:+919847858283"
              className="text-[#003057] font-medium hover:text-[#0071BC] transition"
            >
              +91 9847 858283
            </a>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-6 w-6 text-[#0071BC] mb-2" />
            <p className="text-sm text-gray-600">Our Office</p>
            <p className="text-[#003057] font-medium">
              Thootha, Cherpulassery, Kerala
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 border-t border-gray-100 pt-8"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#003057] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0071BC] focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#003057] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0071BC] focus:outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-[#003057] mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0071BC] focus:outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 flex justify-center items-center gap-2 rounded-lg bg-[#0071BC] text-white font-semibold hover:bg-[#005f97] transition-all shadow-sm hover:shadow-md"
          >
            <Send className="h-5 w-5" />
            Send Message
          </button>
        </form>

        {/* WhatsApp Contact */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 mb-3">Prefer WhatsApp?</p>
          <a
            href="https://wa.me/919847858283?text=Hello%20DrBooq%20Team!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.5 2 2 6.4 2 11.9c0 2.1.6 4.1 1.8 5.8L2 22l4.5-1.6c1.7 1 3.7 1.5 5.6 1.5 5.5 0 10-4.4 10-9.9S17.5 2 12 2zm5.6 14.3c-.2.5-1 1-1.5 1.1-.4.1-.9.2-1.5.1-.4 0-.9 0-1.4-.1-.6-.1-1.3-.3-2.1-.7-1.1-.5-2.1-1.3-3-2.2-.4-.5-.8-1-1.1-1.6-.2-.3-.3-.6-.5-1s0-.8.2-1.1c.2-.3.5-.5.8-.8.2-.2.4-.2.7-.2.2 0 .5 0 .7.1.2.1.4.3.6.5.2.3.4.6.5.8.2.3.1.6 0 .9 0 .1-.1.2-.1.3s0 .2.1.3c.4.8 1 1.4 1.8 1.9.5.3 1 .5 1.5.6.1 0 .3 0 .4-.1s.2-.2.3-.4c.2-.3.3-.7.6-.9.2-.2.5-.3.8-.2.2 0 .4.1.6.2.2.1.4.3.6.5.2.2.4.3.5.6.1.3.1.6 0 .9z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-600">
        <p>
          © {new Date().getFullYear()} <strong>DRBOOQ</strong>. All rights reserved.
        </p>
        <p className="mt-1">Built with ❤️ in Kerala, India.</p>
      </footer>
    </div>
  );
}

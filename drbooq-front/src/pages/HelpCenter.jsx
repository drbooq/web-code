// src/pages/HelpCenter.jsx

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, Mail, Book, Users, Calendar, Hospital, CreditCard, Shield } from "lucide-react";

const THEME = {
  primary: "#0071BC",
  dark: "#003057",
  light: "#E6F3FA",
  text: "#4A4A4A",
};

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: Book },
    { id: "booking", name: "Booking", icon: Calendar },
    { id: "doctors", name: "Doctors", icon: Users },
    { id: "hospitals", name: "Hospitals", icon: Hospital },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "account", name: "Account", icon: Shield },
  ];

  const faqs = [
    {
      category: "booking",
      question: "How do I book an appointment with a doctor?",
      answer: "To book an appointment: 1) Search for doctors by specialization, location, or name. 2) Select a doctor and view their profile. 3) Click 'Book Appointment' and choose your preferred date and time. 4) Enter your mobile number and verify with OTP. 5) Complete the booking. You'll receive a confirmation via SMS and email."
    },
    {
      category: "booking",
      question: "Can I cancel or reschedule my appointment?",
      answer: "You can cancel or reschedule appointments from your Patient Dashboard under 'My Bookings'. However, refunds are only processed if the doctor rejects your booking or is unavailable. Once a doctor confirms your appointment, the booking fee is non-refundable."
    },
    {
      category: "booking",
      question: "What's the difference between online and offline appointments?",
      answer: "Online appointments are video consultations conducted through our platform. Offline appointments are in-person visits at the doctor's clinic or hospital. Both types can be booked through DRBOOQ."
    },
    {
      category: "booking",
      question: "What is the booking charge for offline consultations?",
      answer: "For offline appointments, there is a ₹9 booking charge. This fee is refundable only if the doctor rejects your booking or is unavailable. Once the doctor confirms your appointment, the ₹9 booking charge becomes non-refundable."
    },
    {
      category: "doctors",
      question: "How do I know if a doctor is verified?",
      answer: "All doctors on DRBOOQ undergo a verification process. Look for the 'Verified Doctor' badge with a shield icon on their profile. We verify their medical credentials, licenses, and hospital affiliations before approval."
    },
    {
      category: "doctors",
      question: "Can I see a doctor's availability before booking?",
      answer: "Yes, when you view a doctor's profile, you can see their available time slots. The calendar shows available dates, and you can select a convenient time slot for your appointment."
    },
    {
      category: "doctors",
      question: "How do I save my favorite doctors?",
      answer: "Click the heart icon on any doctor's card to save them to your favorites. You can access saved doctors from your Patient Dashboard under the 'Saved' tab."
    },
    {
      category: "doctors",
      question: "Can I see patient reviews before booking?",
      answer: "Yes, each doctor's profile displays patient reviews and ratings. You can read experiences from other patients to help you make an informed decision."
    },
    {
      category: "hospitals",
      question: "How do I find hospitals near me?",
      answer: "Go to the 'Find Hospitals' section and use the location filters to search by state and district. You can also filter by hospital type (multi-specialty, clinic, etc.) to find the most suitable facility."
    },
    {
      category: "hospitals",
      question: "Can I see which doctors work at a specific hospital?",
      answer: "Yes, on each hospital's profile page, there's a 'View Doctors' button that shows all doctors affiliated with that hospital. You can book appointments directly from there."
    },
    {
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted payment gateways."
    },
    {
      category: "payments",
      question: "When will I get a refund if my booking is rejected?",
      answer: "Refunds are processed only when the doctor rejects your booking or is unavailable. For offline appointments, the ₹9 booking charge will be refunded. Once a doctor confirms your appointment, no refunds are provided. Approved refunds are processed within 3-7 business days to your original payment method."
    },
    {
      category: "payments",
      question: "Is the consultation fee refundable?",
      answer: "The consultation fee is only refundable if the doctor rejects your booking or becomes unavailable. Once the doctor confirms your appointment, the fee becomes non-refundable, even if you cancel later."
    },
    {
      category: "payments",
      question: "Do I need to pay online or can I pay at the clinic?",
      answer: "For online consultations, full payment must be made online during booking. For offline appointments, you pay a ₹9 booking charge online, and the remaining consultation fee can be paid directly at the clinic."
    },
    {
      category: "account",
      question: "How do I create a patient account?",
      answer: "Click 'Sign Up' in the top navigation, choose 'Patient', and enter your mobile number. You'll receive an OTP via SMS to verify your number. Once verified, complete your profile with your name and other details. No password is required - we use OTP-based login for security."
    },
    {
      category: "account",
      question: "How do I log in to my account?",
      answer: "Click 'Login', enter your registered mobile number, and you'll receive an OTP via SMS. Enter the OTP to access your account. We don't use passwords - every login requires OTP verification for your security."
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer: "Log in to your Patient Dashboard using your mobile number and OTP, go to the 'Profile' tab, and click 'Edit Profile'. Update your information and click 'Save Changes'."
    },
    {
      category: "account",
      question: "Is my personal health information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. We comply with healthcare data privacy regulations and never share your information without consent. Our OTP-based login system adds an extra layer of security."
    },
    {
      category: "booking",
      question: "How do online video consultations work?",
      answer: "After booking an online consultation, you'll receive a link to join the video call at your appointment time. Make sure you have a stable internet connection, camera, and microphone. The doctor will join the call at the scheduled time. The full consultation fee must be paid online during booking."
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.light} 0%, #B3E0F7 100%)`,
        }}
        className="py-8 sm:py-12 lg:py-16"
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3" style={{ color: THEME.dark }}>
            How can we help you?
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6" style={{ color: THEME.text }}>
            Find answers to common questions or contact our support team
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - Categories (Desktop only sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 lg:sticky lg:top-4">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4" style={{ color: THEME.dark }}>
                Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-left ${
                        selectedCategory === cat.id
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-base">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Email Support Card */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 text-center border-2 border-blue-100">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" style={{ color: THEME.primary }} />
              <h4 className="font-semibold text-base sm:text-lg mb-2">Need Help?</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Email us and we'll get back to you within 24 hours
              </p>
              <a 
                href="mailto:support@drbooq.com" 
                className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-[#0071BC] text-white rounded-lg hover:bg-[#005A94] transition font-medium text-sm sm:text-base"
              >
                support@drbooq.com
              </a>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: THEME.dark }}>
                Frequently Asked Questions
              </h2>

              {filteredFAQs.length === 0 ? (
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-8 sm:p-12 text-center">
                  <p className="text-gray-500 text-sm sm:text-base">No articles found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full flex items-center justify-between p-3 sm:p-4 lg:p-5 text-left hover:bg-gray-50 transition"
                      >
                        <span className="font-medium text-gray-900 text-sm sm:text-base pr-3">
                          {faq.question}
                        </span>
                        {expandedFAQ === index ? (
                          <ChevronUp className="flex-shrink-0 text-gray-400" size={20} />
                        ) : (
                          <ChevronDown className="flex-shrink-0 text-gray-400" size={20} />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-center border border-blue-100"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: THEME.dark }}>
                Still need help?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Our support team is here to assist you
              </p>
              <a
                href="mailto:support@drbooq.com"
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0071BC] text-white rounded-lg hover:bg-[#005A94] transition font-medium text-sm sm:text-base"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

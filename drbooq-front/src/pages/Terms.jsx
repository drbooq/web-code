// src/pages/Terms.jsx
import React from "react";

/**
 * DRBOOQ - Terms and Conditions
 * Version: 2.0 | Date: 2025-10-18
 * Covers: Razorpay (Payments), Meta WhatsApp API (Notifications), Agora (Teleconsultation)
 * Includes both Offline (₹9 booking fee) and Online (Doctor’s fee) consultation terms
 * NOTE: Informational template — must be reviewed by legal professionals before production use.
 */

export default function Terms() {
  const lastUpdated = "2025-10-18";
  const effectiveDate = "2025-10-18";

  const Section = ({ id, title, children }) => (
    <section id={id} className="mb-8">
      <h3 className="text-lg font-semibold text-[#003057] mb-2">{title}</h3>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-6 font-sans text-[#0b2540]">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-sm text-gray-600">
            Last Updated: <strong>{lastUpdated}</strong> | Effective Date:{" "}
            <strong>{effectiveDate}</strong>
          </p>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            These Terms and Conditions (“Terms”, “Agreement”) constitute a
            binding legal agreement between the User (“you”) and DRBOOQ (“we”,
            “our”, “us”, “Platform”) governing the use of our website,
            applications, APIs, and services, including offline and online
            medical appointment bookings, payment processing through Razorpay,
            WhatsApp notifications via Meta, and online video consultations
            powered by Agora SDK.
          </p>
        </header>

        {/* MAIN CONTENT */}
        <main className="space-y-8">
          {/* SECTION 1 */}
          <Section id="1" title="1. Overview of Services">
            <p>
              DRBOOQ provides digital healthcare facilitation services enabling
              Users to book offline and online appointments with licensed
              doctors, hospitals, or clinics. DRBOOQ acts as a technology
              intermediary and does not provide healthcare advice or diagnosis.
            </p>
          </Section>

          {/* SECTION 2 */}
          <Section id="2" title="2. Account and Eligibility">
            <p>
              To use the DRBOOQ platform, you must be at least 18 years old and
              legally competent to enter into a contract. Users creating
              accounts for minors must be parents or legal guardians. All
              registration information must be accurate and up to date.
            </p>
          </Section>

          {/* SECTION 3 */}
          <Section id="3" title="3. Payment Terms (Razorpay Integration)">
            <p>
              DRBOOQ integrates <strong>Razorpay</strong> as a PCI-DSS-compliant
              payment gateway for secure financial transactions. By making a
              payment, you authorize DRBOOQ and Razorpay to process your payment
              information under applicable Indian financial laws and Razorpay’s
              Privacy Policy.
            </p>

            <h4 className="font-semibold mt-4">3.1 Offline Appointment Payments:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                The offline booking fee is fixed at <strong>₹9</strong> per
                booking request.
              </li>
              <li>
                This ₹9 fee is a <strong>platform facilitation charge</strong>{" "}
                covering appointment processing, communication, and customer
                support.
              </li>
              <li>
                The fee is <strong>non-refundable</strong> except in limited
                cases such as duplicate payments or technical errors.
              </li>
              <li>All transactions occur in Indian Rupees (INR).</li>
            </ul>

            <h4 className="font-semibold mt-4">
              3.2 Online Consultation Payments:
            </h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Online consultations involve direct video calls with doctors
                using the Agora SDK.
              </li>
              <li>
                Users are required to pay the <strong>doctor’s full consultation fee</strong> upfront via Razorpay before the session begins.
              </li>
              <li>
                The consultation fee amount varies per doctor and is displayed
                transparently before payment.
              </li>
              <li>
                If a doctor cancels the session or fails to attend, the payment
                will be refunded within <strong>2–5 business days</strong>{" "}
                through Razorpay to the original payment method.
              </li>
              <li>
                Refunds may take additional time depending on the User’s bank or
                card provider.
              </li>
            </ul>

            <h4 className="font-semibold mt-4">3.3 General Payment Conditions:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>DRBOOQ does not store your UPI or card credentials.</li>
              <li>
                All financial transactions are encrypted and handled by Razorpay.
              </li>
              <li>
                In the event of payment disputes or chargebacks, your account
                may be suspended until the issue is resolved.
              </li>
              <li>
                Users must not misuse the payment gateway for unauthorized or
                fraudulent transactions.
              </li>
            </ul>
          </Section>

          {/* SECTION 4 */}
          <Section id="4" title="4. Refund Policy">
            <h4 className="font-semibold mt-2">4.1 Offline Bookings (₹9 Fee):</h4>
            <p>
              The ₹9 booking fee is <strong>non-refundable</strong> except in
              cases of:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Duplicate transactions (double payment for the same slot).</li>
              <li>Platform-side technical error during booking.</li>
              <li>
                Doctor’s cancellation before appointment confirmation (rare).
              </li>
            </ul>

            <h4 className="font-semibold mt-4">
              4.2 Online Consultations (Doctor Fees):
            </h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Full refunds will be processed via Razorpay within 2–5 business
                days if:
                <ul className="list-disc pl-6 mt-2">
                  <li>The doctor cancels or misses the appointment.</li>
                  <li>A confirmed slot cannot be scheduled due to server error.</li>
                  <li>
                    The video session fails due to DRBOOQ-side technical failure.
                  </li>
                </ul>
              </li>
              <li>
                Refund requests must be made via email at{" "}
                <strong>support@drbooq.com</strong> within 48 hours.
              </li>
            </ul>

            <h4 className="font-semibold mt-4">4.3 Processing Timeline:</h4>
            <p>
              Once approved, refunds are initiated through Razorpay instantly
              and typically reflect within <strong>2–5 business days</strong>,
              depending on your bank’s processing speed.
            </p>
          </Section>

          {/* SECTION 5 */}
          <Section id="5" title="5. Communication and Notifications (Meta WhatsApp API)">
            <p>
              DRBOOQ uses the <strong>Meta WhatsApp Business API</strong> for
              all booking confirmations, reminders, cancellations, and payment
              updates.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                By signing up, you consent to receiving WhatsApp messages from
                verified DRBOOQ numbers.
              </li>
              <li>
                Messages include confirmation, reminders, and service
                notifications (non-promotional unless opted in).
              </li>
              <li>
                Message delivery may depend on Meta’s infrastructure and your
                internet connectivity.
              </li>
              <li>
                DRBOOQ will never send spam or third-party advertisements via
                WhatsApp.
              </li>
            </ul>
          </Section>

          {/* SECTION 6 */}
          <Section id="6" title="6. Video Consultations (Agora SDK)">
            <p>
              DRBOOQ uses the <strong>Agora.io SDK</strong> for real-time,
              encrypted audio and video consultations between patients and
              doctors.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Video and audio sessions are <strong>end-to-end encrypted</strong>.
              </li>
              <li>
                DRBOOQ does not record or store any consultation media unless
                required by law.
              </li>
              <li>
                Users must ensure good internet connection and working devices
                before the session.
              </li>
              <li>
                DRBOOQ is not responsible for connectivity failures, device
                issues, or interruptions caused by the User’s network.
              </li>
              <li>
                Unauthorized recording or screen capture of sessions is
                strictly prohibited.
              </li>
            </ul>
          </Section>

          {/* SECTION 7 */}
          <Section id="7" title="7. Data Privacy and Protection">
            <p>
              DRBOOQ complies with the Indian IT Act (2000), SPDI Rules, and
              healthcare privacy norms. We process only minimal data necessary
              for your appointments and transactions.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Personal data is encrypted both in transit and at rest.</li>
              <li>
                DRBOOQ does not share, sell, or rent your data to third parties.
              </li>
              <li>
                Razorpay, Meta, and Agora act as independent data processors.
              </li>
              <li>
                You can request deletion of your personal data anytime by
                emailing support@drbooq.com.
              </li>
            </ul>
          </Section>

          {/* SECTION 8 */}
          <Section id="8" title="8. User Responsibilities">
            <p>
              Users must ensure all personal, medical, and payment information
              provided on the platform is accurate and current. Misuse,
              fraudulent activity, or impersonation may result in permanent
              suspension.
            </p>
          </Section>

          {/* SECTION 9 */}
          <Section id="9" title="9. Doctor Responsibilities">
            <p>
              Doctors using DRBOOQ agree to honor scheduled appointments,
              maintain patient confidentiality, and comply with medical ethics
              and Indian Medical Council regulations. Failure to honor bookings
              may result in account suspension.
            </p>
          </Section>

          {/* SECTION 10 */}
          <Section id="10" title="10. Intellectual Property">
            <p>
              All DRBOOQ branding, source code, logos, and content are
              proprietary intellectual property. Users and doctors may not copy,
              distribute, or reproduce platform materials without authorization.
            </p>
          </Section>

          {/* SECTION 11 */}
          <Section id="11" title="11. Limitation of Liability">
            <p>
              DRBOOQ acts as a technology intermediary only. We are not liable
              for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Medical negligence or advice by doctors.</li>
              <li>Payment gateway delays beyond our control.</li>
              <li>WhatsApp or video message delivery failures.</li>
              <li>Technical errors, force majeure, or downtime.</li>
            </ul>
          </Section>

          {/* SECTION 12 */}
          <Section id="12" title="12. Dispute Resolution and Jurisdiction">
            <p>
              All disputes shall be governed by the laws of India. Users agree
              to resolve disputes through amicable negotiation before legal
              action. Exclusive jurisdiction lies with courts in Kerala, India.
            </p>
          </Section>

          {/* SECTION 13 */}
          <Section id="13" title="13. Modification and Updates">
            <p>
              DRBOOQ reserves the right to modify or update these Terms at any
              time. Changes are effective immediately upon posting. Continued
              use after changes implies acceptance.
            </p>
          </Section>

          {/* SECTION 14 */}
          <Section id="14" title="14. Contact and Support">
            <p>
              For any support, refunds, privacy, or legal queries, contact:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@drbooq.com<br />
              <strong>Legal:</strong> legal@drbooq.com<br />
              <strong>Phone:</strong> +91 9847 858283<br />
              <strong>Address:</strong> 2/229, Thootha, Cherpulassery, Kerala, India – 679506
            </p>
          </Section>

          {/* SECTION 15 */}
          <Section id="15" title="15. Acceptance">
            <p>
              By using DRBOOQ’s services, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions in full.
            </p>
          </Section>
        </main>

        {/* FOOTER DISCLAIMER */}
        <footer className="mt-10 pt-6 border-t text-xs text-gray-600">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This document is provided for
            informational purposes only and must be reviewed by a qualified
            legal advisor before implementation.
          </p>
          <p>© {new Date().getFullYear()} DRBOOQ. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

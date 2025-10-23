// src/pages/Privacy.jsx
import React from "react";

/**
 * DRBOOQ Privacy Policy
 * Compact & modern (~400 lines)
 * Covers: Razorpay, WhatsApp (Meta), Agora SDK
 * Designed for hosting, Meta Business, and Razorpay compliance
 * Minimal UI + fully responsive
 */

export default function Privacy() {
  const lastUpdated = "2025-10-18";
  const effectiveDate = "2025-10-18";

  const Section = ({ title, children }) => (
    <section className="bg-white shadow-sm rounded-xl p-5 md:p-6 border border-gray-100">
      <h3 className="text-lg md:text-xl font-semibold text-[#003057] mb-3">
        {title}
      </h3>
      <div className="text-sm md:text-base text-gray-700 leading-relaxed">{children}</div>
    </section>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 font-inter text-[#0b2540]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#003057] mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm">
            <strong>Last Updated:</strong> {lastUpdated} &nbsp;|&nbsp;
            <strong>Effective Date:</strong> {effectiveDate}
          </p>
          <p className="mt-4 text-gray-700 text-base max-w-3xl mx-auto">
            This Privacy Policy explains how <strong>DRBOOQ</strong> (“we”, “us”, “our”)
            collects, uses, and protects your data when using our healthcare booking platform,
            including online consultations, Razorpay payments, and WhatsApp notifications.
          </p>
        </header>

        {/* SECTIONS */}

        <Section title="1. Overview">
          <p>
            DRBOOQ is a healthcare booking platform that enables users to book offline and
            online consultations with doctors. We value your privacy and ensure that your
            personal and medical data are handled securely, lawfully, and transparently.
          </p>
          <p className="mt-2">
            This policy applies to all users — patients, doctors, and staff — across our
            website and mobile app.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc pl-6 space-y-1">
            <li>Personal data: name, contact number, email, gender, and date of birth.</li>
            <li>Health data: symptoms, prescriptions, and consultation records.</li>
            <li>Payment data: limited Razorpay transaction metadata (no card/UPI storage).</li>
            <li>Device info: IP, browser, and location (to suggest nearby clinics).</li>
            <li>Communication data: WhatsApp or in-app chat history for appointment updates.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Information">
          <ul className="list-disc pl-6 space-y-1">
            <li>To create and manage user accounts.</li>
            <li>To process appointments, consultations, and payments.</li>
            <li>To send confirmations and reminders via WhatsApp or email.</li>
            <li>To provide video consultations securely using Agora SDK.</li>
            <li>To comply with legal, medical, and financial regulations.</li>
          </ul>
        </Section>

        <Section title="4. Payment and Refunds (Razorpay)">
          <p>
            DRBOOQ uses <strong>Razorpay</strong> as a secure payment gateway for all
            transactions. Razorpay is PCI DSS certified and complies with Indian financial
            laws. We never store your card, UPI, or wallet credentials.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>All transactions are processed in Indian Rupees (INR).</li>
            <li>Refunds (for cancelled consultations) are issued within 2–5 business days.</li>
            <li>Razorpay may temporarily retain transaction metadata for audits.</li>
            <li>
              You may contact <strong>support@drbooq.com</strong> with your order ID for any
              payment dispute.
            </li>
          </ul>
        </Section>

        <Section title="5. WhatsApp Communication (Meta API)">
          <p>
            DRBOOQ sends appointment confirmations, payment receipts, and updates through the{" "}
            <strong>Meta WhatsApp Business API</strong>. By using our platform, you consent to
            receive these service messages.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Messages are strictly transactional — no spam or ads.</li>
            <li>You can opt-out anytime by replying “STOP”.</li>
            <li>
              Message delivery depends on Meta’s infrastructure and your internet connection.
            </li>
            <li>All messages comply with Meta’s Business Policy and data encryption rules.</li>
          </ul>
        </Section>

        <Section title="6. Video Consultations (Agora SDK)">
          <p>
            DRBOOQ uses <strong>Agora.io</strong> for real-time encrypted video consultations
            between patients and doctors. We do not record or store any session media unless
            required for quality assurance with consent.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Audio and video streams are encrypted end-to-end.</li>
            <li>Only the patient and doctor have access to the live session.</li>
            <li>
              DRBOOQ is not responsible for poor connectivity or interruptions from your ISP.
            </li>
          </ul>
        </Section>

        <Section title="7. Data Protection">
          <p>
            We use strong encryption (TLS/SSL, AES-256) and access control systems to protect
            your data. Sensitive information is stored on secure servers with restricted
            access.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Data in transit and at rest is encrypted.</li>
            <li>Access to health records is limited to authorized medical staff.</li>
            <li>
              We never sell, rent, or share your personal information with advertisers or
              external marketers.
            </li>
          </ul>
        </Section>

        <Section title="8. Data Retention">
          <p>
            We retain your data only for as long as necessary to fulfill the purpose it was
            collected for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Health records: retained up to 7 years (as per medical record law).</li>
            <li>Payment logs: retained for 7 years (tax and audit compliance).</li>
            <li>
              User account data: deleted within 90 days of account closure unless legally
              required.
            </li>
          </ul>
        </Section>

        <Section title="9. Your Rights">
          <ul className="list-disc pl-6 space-y-1">
            <li>Access and download your data on request.</li>
            <li>Update or correct inaccurate personal information.</li>
            <li>Request deletion of your account and data.</li>
            <li>Withdraw consent for marketing or messaging anytime.</li>
            <li>
              Lodge a complaint with the relevant Data Protection Authority if your privacy is
              violated.
            </li>
          </ul>
        </Section>

        <Section title="10. Mobile App Permissions">
          <p>
            When using the DRBOOQ mobile app, certain permissions may be required for full
            functionality:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Camera & Microphone – for online video consultations.</li>
            <li>Storage – for uploading prescriptions and documents.</li>
            <li>Location – to find nearby hospitals and clinics.</li>
            <li>Notifications – to alert you about appointments and updates.</li>
          </ul>
          <p className="mt-2">
            You can manage or revoke these permissions anytime from your device settings.
          </p>
        </Section>

        <Section title="11. Third-Party Integrations">
          <p>
            We use reputable third-party services to enhance performance and security. These
            providers act as independent processors and follow strict data protection
            obligations:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Razorpay – Payment gateway and refund management.</li>
            <li>Meta (WhatsApp) – Messaging and service notifications.</li>
            <li>Agora.io – Video consultation framework.</li>
            <li>AWS – Cloud hosting and data storage.</li>
          </ul>
          <p className="mt-2">
            Each third-party partner has its own privacy policy, which you are encouraged to
            review.
          </p>
        </Section>

        <Section title="12. Cookies and Analytics">
          <p>
            DRBOOQ uses cookies to improve performance and personalize your experience. You
            may disable cookies in your browser settings, though some features may stop
            working correctly.
          </p>
        </Section>

        <Section title="13. Children’s Data">
          <p>
            DRBOOQ does not knowingly collect data from minors under 13 years old. If you are
            a parent or guardian and believe your child has provided personal data, contact
            us immediately for deletion.
          </p>
        </Section>

        <Section title="14. International Data Transfers">
          <p>
            Your data may be transferred or processed outside India. We use contractual and
            encryption safeguards to ensure equivalent protection levels across regions.
          </p>
        </Section>

        <Section title="15. Security Breach Response">
          <p>
            In case of a data breach, we will notify affected users and regulatory
            authorities within 72 hours, in accordance with Indian and international data
            protection laws.
          </p>
        </Section>

        <Section title="16. Updates to This Policy">
          <p>
            DRBOOQ may revise this Privacy Policy from time to time. Updated versions will be
            posted on this page with a new “Last Updated” date. Continued use of our services
            implies acceptance of the revised policy.
          </p>
        </Section>

        <Section title="17. Contact Us">
          <p>
            For privacy concerns, contact our Data Protection Officer (DPO):
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li><strong>Email:</strong> privacy@drbooq.com</li>
            <li><strong>Support:</strong> support@drbooq.com</li>
            <li><strong>Phone:</strong> +91 9847 858283</li>
            <li><strong>Address:</strong> 2/229 Thootha, Cherpulassery, Kerala, India</li>
          </ul>
        </Section>

        <Section title="18. Acceptance">
          <p>
            By using DRBOOQ, you confirm that you have read, understood, and agreed to this
            Privacy Policy, including the use of Razorpay for payments, Meta WhatsApp API for
            notifications, and Agora SDK for secure teleconsultations.
          </p>
        </Section>

        {/* FOOTER */}
        <footer className="mt-10 text-xs text-center text-gray-600 border-t pt-5">
          <p>
            ⚖️ <strong>Disclaimer:</strong> This Privacy Policy is for informational purposes
            only and must be reviewed by a legal professional for compliance with applicable
            laws.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} DRBOOQ. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

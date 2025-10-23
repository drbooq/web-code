// src/data/blogs/contraception.jsx - MOBILE OPTIMIZED
import React from "react";
import blogs from "./index";
import { Link } from "react-router-dom";

export default function ContraceptionContent() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Breadcrumb */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6" aria-label="Breadcrumb">
        <Link to="/articles" className="hover:underline text-[#0071BC]">
          Health Guides
        </Link>{" "}
        ›{" "}
        <span className="text-[#003057] hover:underline">Reproductive Health</span>{" "}
        › <span className="text-gray-700">Contraception — Myths & Practical Guide</span>
      </nav>

      {/* ✅ MOBILE OPTIMIZED: Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003057] mb-4 sm:mb-6 leading-tight">
        Contraception Myths Busted — Choose Safely, Live Confidently 🛡️
      </h1>

      {/* ✅ MOBILE OPTIMIZED: Meta */}
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
        Written by <span className="font-semibold text-[#0071BC]">DRBOOQ Editorial Team</span> • Evidence-based guidance
      </p>

      {/* ✅ MOBILE OPTIMIZED: Intro */}
      <section className="mb-8 sm:mb-10">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Contraception is central to family planning, health and quality of life. Yet misinformation creates fear,
          prevents access and leads to poor choices. This article explains the main methods, clarifies common myths,
          outlines safety and side effects, and provides practical tips for choosing what suits you best.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Overview */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          How Contraceptives Work — A Quick Overview
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-5">
          Contraceptives work by one or more mechanisms: creating a physical barrier, preventing ovulation, changing
          the uterine lining, or reducing sperm mobility. Methods vary by duration, effectiveness, side effects,
          and whether they protect against sexually transmitted infections (STIs).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Barrier & Behavioral Methods</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              Condoms, diaphragms, cervical caps and fertility-awareness are included here. Correct, consistent use
              determines effectiveness.
            </p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1 text-gray-700">
              <li>Condoms provide pregnancy prevention and STI protection.</li>
              <li>Behavioral methods require discipline and education to be effective.</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Hormonal Methods</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              Pills, patches, vaginal rings, injections and implants alter hormones to prevent ovulation or thicken cervical mucus.
            </p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1 text-gray-700">
              <li>Many hormonal methods are reversible and highly effective when used correctly.</li>
              <li>Choice depends on convenience, side effects and personal risk factors.</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Intrauterine Devices (IUDs)</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              Copper and hormonal IUDs are clinician-inserted, long-acting and reversible. They offer excellent protection.
            </p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1 text-gray-700">
              <li>Typically &gt;99% effective at preventing pregnancy.</li>
              <li>Some IUDs reduce heavy bleeding and cramps for many users.</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Permanent Options</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              Vasectomy and tubal ligation are surgical options for permanent sterilization. Only for those certain they
              do not want future fertility.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Myths vs Facts */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Common Myths — Clear Facts
        </h2>

        <article className="space-y-5 sm:space-y-6 text-base sm:text-lg text-gray-700">
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">
              Myth: "Contraceptives cause long-term infertility"
            </h3>
            <p>
              <strong>Fact:</strong> Most reversible methods do not cause long-term infertility. Fertility usually returns
              after stopping the method. Permanent methods (sterilization) are intentionally irreversible and require
              careful decision-making and counseling.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">
              Myth: "The pill makes you gain lots of weight"
            </h3>
            <p>
              <strong>Fact:</strong> Modern formulations rarely cause major weight changes. Some individuals notice fluid
              retention or appetite changes initially; these usually settle or can be managed by switching methods.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">
              Myth: "IUDs are only for people who have given birth"
            </h3>
            <p>
              <strong>Fact:</strong> IUDs are widely used by people who have not had children. Advances in design and
              insertion make them suitable for many adults. A trained clinician will discuss suitability and comfort options.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">
              Myth: "Condoms always break"
            </h3>
            <p>
              <strong>Fact:</strong> Breakage is uncommon when condoms are stored and used correctly. Key factors causing
              breakage include expired condoms, incorrect use, and oil-based lubricants with latex condoms.
            </p>
          </div>
        </article>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Safety & Side Effects */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Safety, Side Effects & When to Seek Care
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-5">
          Side effects vary by method and by person. Many side effects are mild and transient. Serious risks exist for
          a small number of people—especially those with particular medical histories (smoking, clotting disorders,
          certain migraines, uncontrolled high blood pressure).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Short-term & common effects</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1 text-gray-700">
              <li>Nausea or spotting when starting hormonal pills (often resolves)</li>
              <li>Temporary cramping or discomfort with IUD insertion</li>
              <li>Changes in menstrual bleeding patterns with some hormonal methods</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Rare but important risks</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1 text-gray-700">
              <li>Blood clots — small increased risk with some estrogen-containing methods, amplified by smoking</li>
              <li>IUD perforation — extremely rare with trained clinicians</li>
              <li>Allergic reactions (e.g., latex) — alternatives available (non-latex condoms)</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#FFF9E6] rounded-lg shadow-sm text-sm sm:text-base" role="note">
          <strong>Practical advice:</strong> Share your full medical history (smoking, migraines, clotting issues, high
          blood pressure, medication list) before starting any hormonal method. A clinician can personalize choices and
          screen for rare contraindications.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: How to Choose */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Choosing the Right Method — Practical Steps
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Choice depends on how effective you need contraception to be, whether you want STI protection, your desire
          for future fertility, side effect tolerance, and preferred maintenance (daily vs long-acting).
        </p>

        <ul className="list-decimal pl-5 sm:pl-6 space-y-3 text-base sm:text-lg text-gray-700">
          <li><strong>Need STI protection?</strong> Use condoms (alone or together with another method).</li>
          <li><strong>Want low maintenance & high effectiveness?</strong> Consider IUD or implant.</li>
          <li><strong>Prefer short-term control or immediate stop/start?</strong> Pills, patch, or ring may fit.</li>
          <li><strong>Certain you want no future pregnancies?</strong> Permanent options after counseling.</li>
        </ul>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#E6F3FA] rounded-lg text-sm sm:text-base text-gray-700">
          <strong>Tip:</strong> Discuss goals (short-term vs long-term), tolerance for bleeding changes, and convenience with a clinician.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Condom How-To */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Condoms — Step-by-Step How to Use
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Condoms are widely accessible and protect against both pregnancy and many STIs. Correct usage is vital.
        </p>
        <ol className="list-decimal pl-5 sm:pl-6 space-y-3 text-base sm:text-lg text-gray-700">
          <li>Check the expiration date and package integrity.</li>
          <li>Open the package carefully — avoid scissors or teeth that can tear the condom.</li>
          <li>Pinch the tip to remove air, place condom on erect penis, roll down to base.</li>
          <li>Use water-based or silicone lubricant (oil-based breaks latex).</li>
          <li>After ejaculation, withdraw while still erect, hold the base, and dispose in the trash (not toilet).</li>
        </ol>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Emergency Contraception */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Emergency Contraception — What to Know
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Emergency contraception (EC) reduces pregnancy risk after unprotected sex or contraceptive failure. Time matters.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-700">
          <li>Levonorgestrel pills (often available OTC): best within 72 hours.</li>
          <li>Ulipristal (prescription) can be effective up to 120 hours (5 days) and may be more effective in some contexts.</li>
          <li>Copper IUD: most effective EC option and provides ongoing contraception if left in place (must be placed by clinician).</li>
          <li>EC does not terminate an existing pregnancy; it prevents or delays ovulation.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: FAQs */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-4 sm:mb-6 leading-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700">
          <div>
            <strong>Q:</strong> "Can I use contraception if I have a chronic illness?"<br/>
            <strong>A:</strong> Often yes. Some conditions influence recommended methods — discuss with your clinician for tailored advice.
          </div>

          <div>
            <strong>Q:</strong> "Does the pill protect against STIs?"<br/>
            <strong>A:</strong> No. Only condoms reduce STI risk. Pairing condoms with another method protects both pregnancy and STIs.
          </div>

          <div>
            <strong>Q:</strong> "How quickly does fertility return after stopping contraception?"<br/>
            <strong>A:</strong> For most reversible methods fertility returns within weeks to months. Permanent methods are not reversible.
          </div>

          <div>
            <strong>Q:</strong> "Is switching methods safe?"<br/>
            <strong>A:</strong> Yes — clinicians can guide safe transitions to maintain continuous protection.
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Quick Checklist */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-3">Quick Decision Checklist</h2>
        <ul className="list-decimal pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-700">
          <li>Do you want future pregnancy? (Yes → avoid permanent methods)</li>
          <li>Do you need STI protection? (Yes → condoms)</li>
          <li>Prefer low-maintenance? (Yes → IUD/implant)</li>
          <li>Have medical conditions? (Discuss with clinician)</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: References */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-semibold text-[#003057] mb-2 sm:mb-3">
          References & Further Reading
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-xs sm:text-sm">
          <li>World Health Organization — Family planning/Contraception guidance</li>
          <li>Centers for Disease Control and Prevention — Contraception: Effectiveness & options</li>
          <li>Royal College of Obstetricians & Gynaecologists — Contraception information</li>
          <li>Recent peer-reviewed reviews in <em>Contraception</em> and <em>BMJ</em></li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom Line */}
      <section className="bg-[#F7FBFD] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12" style={{ border: "1px solid rgba(0,113,188,0.12)" }}>
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">🛡 Bottom Line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Contraception is safe, effective, and deeply personal. Myths and misinformation create barriers to care.
          Talk with a trusted healthcare provider, evaluate effectiveness vs side effects, and choose a method that matches
          your health and life goals. Good counseling turns confusion into confident, safe choices.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Related Articles */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4 sm:mb-6">📖 Related Articles from DRBOOQ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {Array.isArray(blogs) &&
            blogs
              .filter((b) => b && b.id !== 5)
              .slice(0, 3)
              .map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="group block bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden no-underline active:scale-98"
                >
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-36 sm:h-44 object-cover"
                    />
                  )}
                  <div className="p-3 sm:p-4">
                    <h4 className="text-base sm:text-lg font-semibold text-[#0071BC] group-hover:text-[#005a94] line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{article.date}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}

// src/data/blogs/sexualWellness.jsx - MOBILE OPTIMIZED
import React from "react";
import blogs from "../blogs";
import { useNavigate, Link } from "react-router-dom";

export default function SexualWellnessContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Breadcrumb */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/articles" className="hover:underline text-[#0071BC]">
          Health Guides
        </Link>{" "}
        › <span className="text-[#003057] hover:underline">Sexual Wellness</span> ›{" "}
        <span className="text-gray-700">The Secret Link Between Sexual Wellness & Happiness</span>
      </nav>

      {/* ✅ MOBILE OPTIMIZED: Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003057] mb-4 sm:mb-6 leading-tight">
        💑 The Secret Link Between Sexual Wellness & Happiness
      </h1>

      {/* ✅ MOBILE OPTIMIZED: Author / meta */}
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
        Written by <span className="font-semibold text-[#0071BC]">DRBOOQ Editorial Team</span> • Reviewed by relationship & sexual health professionals
      </p>

      {/* ✅ MOBILE OPTIMIZED: Intro */}
      <section className="mb-8 sm:mb-10">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Sexual wellness affects mental health, physical health, and relationships.
          It supports emotional closeness and personal confidence.
          This article explains the why, the how, and the simple steps you can take today.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Why it matters */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          ❤️ Why Sexual Wellness Matters
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Healthy sexuality is linked to better mood, lower stress, and stronger relationships.
          It also supports sleep, immunity, and sense of self-worth.
        </p>

        <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2 sm:mb-3">Quick benefits (short):</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Improved mood — releases oxytocin & dopamine.</li>
          <li>Lower stress — calm nervous system and lower cortisol.</li>
          <li>Better sleep — intimacy helps sleep quality for many people.</li>
          <li>Stronger connection — shared vulnerability builds trust.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Communication */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🗣️ Communication — the foundation
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Most intimacy issues start with a lack of communication. Talk openly.
          Practice gentle honesty and active listening.
        </p>

        <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2 sm:mb-3">Simple conversation starters</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>"I love when we... Can we try this more often?"</li>
          <li>"I sometimes feel nervous about... Can we talk about it?"</li>
          <li>"What helps you feel close? I want to know."</li>
        </ul>

        <p className="mt-4 text-sm sm:text-base text-gray-600 italic">
          Short scripts help you begin. Use "I" statements. Avoid blame.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Life stages */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🌸 Sexual Wellness Across Life Stages
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-5">
          Needs change over time. That is normal. The goal is connection, not performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] text-base sm:text-lg">20s–30s</h4>
            <p className="text-sm sm:text-base mt-2">Explore identity, practice safety, and communicate boundaries.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] text-base sm:text-lg">40s–50s</h4>
            <p className="text-sm sm:text-base mt-2">Manage stress and hormones. Prioritize time and intimacy.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] text-base sm:text-lg">60+</h4>
            <p className="text-sm sm:text-base mt-2">Focus on emotional closeness and gentle, pleasurable touch.</p>
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Science */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🧬 The Science of Desire
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Desire is biological and psychological. Sleep, nutrition, and stress affect hormones and brain chemistry.
          Small lifestyle changes make a measurable difference.
        </p>

        <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2 sm:mb-3">Short science notes</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Oxytocin supports bonding after close contact and touch.</li>
          <li>Dopamine fuels motivation and excitement — healthy habits raise it naturally.</li>
          <li>Cortisol from chronic stress lowers libido — reduce it with rest and mindfulness.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Practical lifestyle tips */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🌿 Daily Habits That Help
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-5">
          These are simple, practical changes you can adopt without drama.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] mb-2 text-base sm:text-lg">Move your body</h4>
            <p className="text-sm sm:text-base mb-2">Even 20 minutes of walking boosts circulation and mood.</p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1">
              <li>Do cardio 3× a week for stamina.</li>
              <li>Strength training twice weekly improves confidence.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] mb-2 text-base sm:text-lg">Eat for hormones</h4>
            <p className="text-sm sm:text-base mb-2">Focus on whole foods. Add zinc and omega-3 rich items.</p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1">
              <li>Nuts, seeds, fish, leafy greens.</li>
              <li>Limit processed sugar and heavy alcohol binges.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] mb-2 text-base sm:text-lg">Sleep & stress</h4>
            <p className="text-sm sm:text-base mb-2">Better sleep = better hormones, better mood.</p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1">
              <li>7–8 hours nightly when possible.</li>
              <li>Short breathing breaks during the day reduce cortisol.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border">
            <h4 className="font-semibold text-[#0071BC] mb-2 text-base sm:text-lg">Limit harmful habits</h4>
            <p className="text-sm sm:text-base mb-2">Small limits create big benefits.</p>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base space-y-1">
              <li>Quit smoking — it harms blood flow.</li>
              <li>Reduce heavy drinking — it lowers libido and energy.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Common problems */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          ⚠️ Common Problems & When to Get Help
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Some issues are common and treatable. Don't be ashamed to seek help.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Low desire that lasts months — consider medical review.</li>
          <li>Pain during sex — see a clinician to rule out medical causes.</li>
          <li>Difficulty maintaining arousal — sometimes linked to health or medications.</li>
        </ul>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#FFF6E6] border-l-4 border-[#FFB020] rounded-lg">
          <strong className="text-sm sm:text-base">When to see a professional:</strong>
          <span className="text-sm sm:text-base"> If problems persist for weeks to months, or cause distress, reach out to a family doctor, sexual health clinic, or licensed therapist.</span>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Therapy & medical options */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          💬 Therapy & Medical Options
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Many people benefit from therapy or medical treatments. Combination approaches usually work best.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Sex therapy & couples counseling — helps communication and technique.</li>
          <li>Psychological therapy — addresses anxiety, trauma, or depression.</li>
          <li>Medical review — checks hormones, blood sugar, and medication side effects.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Practical exercises */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🧪 Try These Simple Exercises (Today)
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Small exercises help rebuild closeness. Try them with a partner or alone.
        </p>

        <ul className="list-decimal pl-5 sm:pl-6 space-y-3 text-base sm:text-lg">
          <li>
            <b>5-minute breathing:</b> Sit together. Breathe in for 4, hold 4, exhale 6. Repeat 6 times.
          </li>
          <li>
            <b>Sensate focus (15 minutes):</b> One partner gives non-sexual touch. No goals. Just notice sensations.
          </li>
          <li>
            <b>Gratitude sharing:</b> Each person names 3 things they appreciated today.
          </li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Myths */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🚫 Myths & Facts
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-3 text-base sm:text-lg">
          <li><b>Myth:</b> Good sex just happens. <b>Fact:</b> It often needs care, time, and communication.</li>
          <li><b>Myth:</b> Desire must be equal. <b>Fact:</b> Desire fluctuates — partners can match rhythms with honesty.</li>
          <li><b>Myth:</b> Older people stop being intimate. <b>Fact:</b> Intimacy often matures and deepens with age.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: FAQs */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          ❓ Frequently Asked Questions
        </h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700">
          <div>
            <b>Q:</b> Is low desire normal?<br />
            <b>A:</b> Yes. Stress, sleep, medication, and life events cause fluctuations.
          </div>

          <div>
            <b>Q:</b> Can food really affect sexual health?<br />
            <b>A:</b> Yes. Foods that support circulation and hormones help overall wellness.
          </div>

          <div>
            <b>Q:</b> How to start a difficult conversation?<br />
            <b>A:</b> Use "I feel" language. Choose calm time. Be curious, not critical.
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom Line */}
      <section className="bg-[#F7FBFD] border border-[#0071BC]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">❤️ Bottom Line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Sexual wellness supports happiness and health. It requires small daily habits:
          good sleep, movement, clear communication, and kindness toward yourself.
          If concerns persist, professional help is effective and normal to seek.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Related Articles */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4 sm:mb-6">📖 Related Articles from DRBOOQ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs
            .filter((b) => b.id !== 3)
            .slice(0, 3)
            .map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/article/${article.id}`)}
                className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden active:scale-98"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(`/article/${article.id}`); }}
              >
                <img src={article.image} alt={article.title} className="w-full h-36 sm:h-44 object-cover" />
                <div className="p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-[#0071BC] line-clamp-2">{article.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{article.date}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

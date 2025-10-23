// src/data/blogs/heartHealth.jsx - MOBILE OPTIMIZED
import React from "react";

export default function HeartHealthContent() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Top meta */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="text-xs sm:text-sm text-gray-500">DRBOOQ Editorial • Heart Health</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#003057] mt-2 leading-tight">
            ❤️ 5 Daily Habits Doctors Swear By for a Stronger Heart
          </h1>
          <p className="mt-2 sm:mt-3 text-gray-600 text-base sm:text-lg leading-snug">
            A 2-minute routine that could add years to your life. Practical,
            evidence-backed advice you can actually use today.
          </p>
        </div>
      </div>

      <hr className="mb-6 sm:mb-8 border-gray-200" />

      {/* ✅ MOBILE OPTIMIZED: Key takeaways */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-[#003057] mb-3">Key takeaways</h2>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-700">
          <li>Small, consistent daily habits matter more than occasional extremes.</li>
          <li>30 minutes of moderate activity most days + better sleep + smart eating = major risk reduction.</li>
          <li>A focused 2-minute routine (below) improves circulation and mindset instantly.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Deep dive sections */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          1. Move more — your heart likes motion
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Humans are built to move. Sedentary time weakens the heart, increases insulin resistance,
          and stiffens arteries. Evidence shows even brisk walking reduces cardiovascular events.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Why it works</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Movement raises heart rate safely, improves endothelial function (the inner lining of blood vessels),
          improves insulin sensitivity, and reduces blood pressure over time.
        </p>

        <div className="bg-[#F1F9F9] border-l-4 border-[#0694a2] p-3 sm:p-4 rounded-lg mb-4">
          <strong className="block mb-1 text-sm sm:text-base">Research snapshot</strong>
          <p className="text-xs sm:text-sm text-gray-700">
            Large cohort studies show 150 minutes/week of moderate activity cuts heart disease risk by ~25–30%.
          </p>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Practical ideas (realistic)</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>20–30 minute brisk walk after meals (helps both weight and blood sugar).</li>
          <li>Stand and move for 2–3 minutes every 45–60 minutes if you have a desk job.</li>
          <li>Add two short strength sessions/week (bodyweight squats, wall push-ups) — muscle helps metabolic health.</li>
        </ul>
      </section>

      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          2. Eat smart — food as medicine
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Diet influences blood pressure, cholesterol, inflammation, and body weight — the core drivers of heart disease.
          Aim for patterns proven to protect: whole foods, plants, healthy fats, and moderate protein.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Daily plate guide</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Half your plate vegetables and fruit (variety & color).</li>
          <li>One quarter whole grains or starchy veg (oats, quinoa, sweet potato).</li>
          <li>One quarter lean protein or legumes (fish, beans, poultry).</li>
          <li>Use olive oil, nuts, seeds for healthy fats; limit butter & deep-fried foods.</li>
        </ul>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mt-4 mb-2">Sample day (simple)</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Breakfast: Oat porridge + berries + handful of nuts.<br/>
          Lunch: Salad with chickpeas, olive oil, whole grain bread.<br/>
          Dinner: Baked salmon, steamed greens, quinoa.
        </p>

        <div className="bg-[#FFF5F5] p-3 sm:p-4 rounded-lg border-l-4 border-red-500 mb-4">
          <strong className="text-sm sm:text-base">Warning:</strong>
          <span className="text-sm sm:text-base"> ultra-processed foods, sugary drinks, and regular fast-food meals strongly raise risk even in otherwise active people.</span>
        </div>
      </section>

      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          3. Sleep — repair & reset
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Sleep is not idle time. During sleep your body lowers blood pressure, clears inflammatory signals,
          and restores vascular function. Chronic short sleep increases heart attack risk and worsens recovery.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Simple sleep hygiene</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Keep a consistent bedtime and wake time.</li>
          <li>Avoid screens 60 minutes before bed; dim lights.</li>
          <li>Create a cool, dark, quiet sleep space.</li>
        </ul>

        <p className="mt-3 text-base sm:text-lg text-gray-700">
          Even small improvements (shifting from 6 to 7–8 hours) show measurable benefits in blood pressure and mood.
        </p>
      </section>

      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          4. Stress management — protect your arteries
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Stress raises cortisol and adrenaline. Over time these hormones cause high blood pressure, insulin resistance,
          and inflammation — all harmful to blood vessels.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Quick practices that help</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>2–5 minutes of box breathing (inhale 4s — hold 4s — exhale 4s — hold 4s).</li>
          <li>Short walks in green spaces to lower stress markers.</li>
          <li>Daily journaling: write 2 things you're grateful for.</li>
        </ul>

        <blockquote className="border-l-4 border-[#0071BC] pl-4 sm:pl-5 italic text-gray-700 mt-4 text-sm sm:text-base">
          "Reducing chronic stress is as important as eating well and exercising." — behavioral cardiology research
        </blockquote>
      </section>

      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          5. Hydration & monitoring — the practical checks
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Hydrate, know your numbers, and track them. Early detection of high blood pressure or high cholesterol saves lives.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">What to track</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Blood pressure — target &lt; 130/80 for many people (ask your doctor what's right for you).</li>
          <li>Fasting lipid panel — total, LDL, HDL, triglycerides — yearly or per medical advice.</li>
          <li>Blood sugar (HbA1c) if diabetic or pre-diabetic.</li>
        </ul>

        <div className="bg-[#F1F9F9] p-3 sm:p-4 rounded-lg border-l-4 border-[#0694a2] mt-4">
          <span className="text-sm sm:text-base">Tip: Many pharmacies and cheap home BP monitors are accurate enough for routine checks. Log values and show them to your clinician.</span>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 2-minute routine */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          A 2-Minute Routine — do this now
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          A short, focused routine that improves circulation, calms the nervous system, and primes your body to choose healthier behaviors that day.
        </p>

        <div className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm">
          <ol className="list-decimal pl-5 sm:pl-6 space-y-3 text-base sm:text-lg text-gray-800">
            <li>
              <strong>30 seconds:</strong> Stand tall, roll shoulders, deep belly breaths (inhale 4s / exhale 6s).
            </li>
            <li>
              <strong>60 seconds:</strong> Brisk marching on the spot or stepping up and down a single step — keep intensity slightly above comfortable.
            </li>
            <li>
              <strong>30 seconds:</strong> Cool-down stretch: calf stretch, chest opener, slow breath — smile.
            </li>
          </ol>
          <p className="mt-4 text-xs sm:text-sm text-gray-600">
            Why it helps: brief movement increases blood flow; breathing lowers stress hormones; a small success nudges healthier choices all day.
          </p>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 7-day sample plan */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          7-Day Starter Plan (practical)
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Follow this week to embed habits. Keep it simple and repeatable.
        </p>
        <ul className="list-decimal pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Day 1: 30 min walk + oats + fruit + 8 hrs sleep.</li>
          <li>Day 2: 20 min strength (bodyweight) + fish/legume lunch + 5 min breathing.</li>
          <li>Day 3: Active breaks at work + salad + early bedtime.</li>
          <li>Day 4: 30 min bike or swim + reduce sugar today.</li>
          <li>Day 5: Family walk + mindful dinner (no devices).</li>
          <li>Day 6: Longer nature activity + protein-rich meals.</li>
          <li>Day 7: Rest, plan next week, review BP log.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: FAQs */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Frequently asked questions
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-gray-800">
          <div>
            <strong>Q:</strong> How soon will I see benefits?{" "}
            <strong>A:</strong> Energy and mood often improve within days-weeks; measurable improvements
            in BP & blood sugar may appear within weeks; cholesterol changes take 3–6 months.
          </div>

          <div>
            <strong>Q:</strong> Is it too late to start?{" "}
            <strong>A:</strong> No. Benefits accrue at every age — even small changes help.
          </div>

          <div>
            <strong>Q:</strong> Should I stop medications?{" "}
            <strong>A:</strong> Never stop prescribed meds without medical guidance.
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Evidence & references */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Evidence & references
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-gray-700">
          <li>Harvard Health — physical activity and heart disease (summary reviews).</li>
          <li>American Heart Association — diet & lifestyle guidelines.</li>
          <li>Journal of the American College of Cardiology — sleep and cardiovascular risk.</li>
          <li>Behavioral cardiology literature — stress reduction lowers cardiovascular events.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom line */}
      <section className="bg-[#F7FBFD] border border-[#0071BC]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">Bottom line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Small daily habits compound. Start with the 2-minute routine, add a 20–30 minute walk, choose whole foods,
          sleep better, and check your numbers. These steps are simple — but powerful. Your heart will thank you.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Suggested next reads */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4">Suggested next reads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <a href="/article/2" className="block bg-white border rounded-xl shadow hover:shadow-lg overflow-hidden transition">
            <div className="p-4">
              <h4 className="text-base sm:text-lg font-semibold text-[#0071BC]">3 Secrets to Beat Stress & Stay Calm</h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Simple, science-backed tools to lower daily stress.</p>
            </div>
          </a>

          <a href="/article/3" className="block bg-white border rounded-xl shadow hover:shadow-lg overflow-hidden transition">
            <div className="p-4">
              <h4 className="text-base sm:text-lg font-semibold text-[#0071BC]">Morning Habits That Boost Energy</h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Routines doctors recommend to start the day right.</p>
            </div>
          </a>

          <a href="/articles" className="block bg-white border rounded-xl shadow hover:shadow-lg overflow-hidden transition">
            <div className="p-4">
              <h4 className="text-base sm:text-lg font-semibold text-[#0071BC]">All Health Guides</h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Explore more expert-written guides and practical plans.</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

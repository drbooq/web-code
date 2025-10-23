// src/data/blogs/mentalHealth.jsx - MOBILE OPTIMIZED
import React from "react";
import blogs from "../blogs";
import { useNavigate, Link } from "react-router-dom";

export default function MentalHealthContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Breadcrumb */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/articles" className="hover:underline text-[#0071BC]">
          Health Guides
        </Link>{" "}
        › <span className="text-[#0071BC] hover:underline">Mental Health</span> ›{" "}
        <span className="text-gray-700">7 Proven Secrets to Beat Stress & Strengthen Your Mind</span>
      </nav>

      {/* ✅ MOBILE OPTIMIZED: Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003057] mb-4 sm:mb-6 leading-tight">
        🧘 7 Proven Secrets to Beat Stress & Strengthen Your Mind
      </h1>

      {/* ✅ MOBILE OPTIMIZED: Author Meta */}
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
        Written by <span className="font-semibold text-[#0071BC]">DRBOOQ Editorial Team</span> • Reviewed by clinical psychologists
      </p>

      {/* ✅ MOBILE OPTIMIZED: Intro */}
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed">
        Stress today is more than a feeling — it has measurable effects on the body and brain.
        The good news: the brain is adaptable. With simple daily practices you can reduce anxiety,
        increase focus, and build long-term resilience. This article explains why these habits work,
        how to do them, and how to fit them into a busy life.
      </p>

      {/* ✅ MOBILE OPTIMIZED: Quick takeaways */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-[#003057] mb-3">Quick takeaways</h2>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg text-gray-700 space-y-2">
          <li>Short, daily practices beat occasional long sessions — consistency matters.</li>
          <li>Breathing, movement, sleep, social connection and nutrition all interact to shape stress.</li>
          <li>Start with one micro-habit (2–5 minutes) and build gradually.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 1: Breathing */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          1️⃣ Breathing: immediate control of your nervous system
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Breath is the fastest way to influence the autonomic nervous system. Slow, deep breathing signals safety to the brain,
          lowers heart rate, and reduces cortisol. This is not placebo — physiological markers change after minutes of practice.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">How it works (brief)</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Slow diaphragmatic breathing increases vagal tone (parasympathetic activity), slows the heart, and down-regulates the fight-or-flight response.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Practical exercises</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li><strong>Box breath:</strong> inhale 4s — hold 4s — exhale 4s — hold 4s. Repeat 4 rounds.</li>
          <li><strong>4-6-8 breathing:</strong> inhale 4s — hold 1s — exhale 6–8s. Do 2–3 minutes to calm the mind.</li>
          <li><strong>Diaphragmatic breath:</strong> place a hand on belly; inhale so hand rises, exhale fully. 3–5 minutes daily.</li>
        </ul>

        <div className="mt-4 bg-[#F1F9F9] border-l-4 border-[#0694a2] p-3 sm:p-4 rounded-lg text-sm sm:text-base text-gray-700">
          <strong>Tip:</strong> Do breathing before important meetings or when you wake up — it shifts your physiology immediately.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 2: Journaling */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          2️⃣ Journaling: clarify and diffuse worry
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Writing is a way to move thoughts out of the mind and into a space you can review. It reduces rumination and helps you spot patterns.
          Clinical studies of expressive writing show improved mood, better sleep, and lower stress biomarkers over time.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Simple journaling routine</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>5-minute morning check: what worries me, what I can control today.</li>
          <li>Evening gratitude: write 2 small things that went well.</li>
          <li>Weekly review: notice recurring stressors and plan one concrete change.</li>
        </ul>

        <p className="mt-4 text-base sm:text-lg text-gray-700">
          Small prompts are enough — the goal is regular practice, not perfect prose.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 3: Mindfulness */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          3️⃣ Mindfulness: train attention, reduce rumination
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Mindfulness is the practice of paying attention to the present intentionally and without judgment.
          Over weeks, it reduces activity in brain networks linked to worry and increases regions responsible for focus.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Everyday mindfulness practices</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>5-minute breath awareness: notice the sensation of breathing, return when distracted.</li>
          <li>Mindful eating: put away devices, chew slowly, notice flavors and textures.</li>
          <li>Body scan: 10-minute guided scan to relax areas of tension.</li>
        </ul>

        <div className="mt-4 bg-[#FFF9E6] border-l-4 border-[#F59E0B] p-3 sm:p-4 rounded-lg text-sm sm:text-base text-gray-700">
          <strong>Note:</strong> apps can help start a practice; however, consistency is more important than daily duration.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 4: Sleep */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          4️⃣ Sleep: the foundation of mental resilience
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Sleep restores the brain and resets emotional reactivity. When sleep is poor, the amygdala (threat center) becomes hyperactive,
          making everyday stress feel overwhelming.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Sleep hygiene checklist</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>Maintain a fixed sleep schedule (including weekends).</li>
          <li>Dark, cool bedroom; remove bright devices.</li>
          <li>Limit stimulants after mid-afternoon; avoid heavy meals before bedtime.</li>
        </ul>

        <p className="mt-4 text-base sm:text-lg text-gray-700">
          If insomnia persists, a short course of cognitive behavioral therapy for insomnia (CBT-I) is often the most effective treatment.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 5: Exercise */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          5️⃣ Exercise: mood is built in motion
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Physical activity releases endorphins, increases brain-derived neurotrophic factor (BDNF), and supports neuroplasticity.
          Regular movement improves mood, reduces anxiety, and enhances cognitive clarity.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">What to do</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>150 minutes/week of moderate activity (walking, cycling) or 75 minutes of intense activity.</li>
          <li>Two strength sessions weekly to boost energy and metabolism.</li>
          <li>Short 10–20 minute bursts of activity during work to break stress cycles.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 6: Social connection */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          6️⃣ Social connection: the protective factor
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Humans need connection. Strong social bonds lower stress hormones and reduce the risk of depression and anxiety.
          Loneliness is a major risk factor for poor mental and physical health.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Practical steps</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>Spend focused time (without phone) with friends or family several times a week.</li>
          <li>Join small groups or community activities that match your interests.</li>
          <li>Volunteer — helping others boosts meaning and mood.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 7: Digital detox */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          7️⃣ Digital detox: reduce noise, regain focus
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Constant notifications and social media create a stream of stress and comparison. Reducing screen time improves focus,
          sleep, and emotional balance.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Easy rules to try</h3>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>No phone during the first hour after waking.</li>
          <li>Set app limits (30–60 minutes for social media) and use Do Not Disturb at night.</li>
          <li>Schedule clear "phone-free" times for deep work or family meals.</li>
        </ul>

        <div className="mt-4 bg-[#F1F9F9] border-l-4 border-[#0694a2] p-3 sm:p-4 rounded-lg text-sm sm:text-base text-gray-700">
          <strong>Tip:</strong> Replacing small scroll sessions with a short walk or a 2-minute breathing break provides more emotional benefit than you expect.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Nutrition & gut-brain */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Nutrition & the gut-brain connection
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          What you eat influences mood. A diet high in whole foods and fiber supports a healthy microbiome, which in turn produces
          metabolites that affect neurotransmitter balance. Omega-3s, fiber, fermented foods and low added sugar are all friendly to mental health.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 text-base sm:text-lg space-y-2 text-gray-800">
          <li>Include oily fish, nuts, seeds, and legumes regularly.</li>
          <li>Choose fermented foods (yogurt, kefir, kimchi) to support gut diversity.</li>
          <li>Limit refined sugar and ultra-processed snacks that spike mood and energy then crash.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Micro-habits & 2-minute practice */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Micro-habits: 2–5 minute practices to use right now
        </h2>
        <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
          <ul className="list-decimal pl-5 sm:pl-6 space-y-3 text-base sm:text-lg text-gray-800">
            <li><strong>60-second reset:</strong> 6 slow belly breaths, roll your shoulders, drink a small glass of water.</li>
            <li><strong>2-minute gratitude:</strong> write one sentence about something that went right today.</li>
            <li><strong>1-minute focus:</strong> stare at a neutral object and count 10 breaths — bring attention back if wandering.</li>
          </ul>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: 7-day starter plan */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          7-Day starter plan
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          A simple week to build momentum — keep each session short and repeatable.
        </p>
        <ul className="list-decimal pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Day 1: 5-minute breathing + 15-minute walk.</li>
          <li>Day 2: Journaling (5 min) + no-screens 1 hour before bed.</li>
          <li>Day 3: Mindfulness (10 min) + healthy protein-rich meals.</li>
          <li>Day 4: Social check-in with a friend + 20-minute activity.</li>
          <li>Day 5: Digital detox evening + gratitude journaling.</li>
          <li>Day 6: Active outdoor time + breathing practice.</li>
          <li>Day 7: Reflect, plan next week, celebrate small wins.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: FAQs */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          ❓ Frequently asked questions
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-gray-800">
          <div>
            <strong>Q:</strong> How quickly will I feel better?<br />
            <strong>A:</strong> Breathing and short exercise help immediately. Noticeable, lasting changes typically take weeks with daily practice.
          </div>
          <div>
            <strong>Q:</strong> Do I need therapy?<br />
            <strong>A:</strong> Self-help habits help many people. If stress affects sleep, work, relationships or daily functioning, professional therapy is highly recommended.
          </div>
          <div>
            <strong>Q:</strong> Can supplements help?<br />
            <strong>A:</strong> Some (omega-3, vitamin D) may support mood, but they are not a substitute for lifestyle changes or clinical care when needed.
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Evidence & references */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Evidence & references
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-gray-700 space-y-2">
          <li>American Psychological Association — stress and health overview.</li>
          <li>Meta-analyses of mindfulness & meditation show reductions in anxiety and depression symptoms.</li>
          <li>Randomized trials: exercise and depression — clear mood benefits.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom line */}
      <section className="bg-[#F7FBFD] border border-[#0071BC]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">Bottom line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Mental fitness is like physical fitness — small, consistent practices build strength. Start with one micro-habit,
          be kind to yourself, and gradually stack practices. If stress is severe or persistent, please seek professional support.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Related Articles */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4 sm:mb-6">More from DRBOOQ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs.filter((b) => b.id !== 2).slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/article/${article.id}`)}
              className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden active:scale-98"
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

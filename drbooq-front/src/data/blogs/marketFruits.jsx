// src/data/blogs/marketFruits.jsx - MOBILE OPTIMIZED
import React from "react";
import blogs from "../blogs";
import { useNavigate, Link } from "react-router-dom";

export default function MarketFruitsContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Breadcrumb */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/articles" className="hover:underline text-[#0071BC]">
          Health Guides
        </Link>{" "}
        › <span className="text-[#003057] hover:underline">Food Safety</span> ›{" "}
        <span className="text-gray-700">The Hidden Truth About Shiny Market Fruits</span>
      </nav>

      {/* ✅ MOBILE OPTIMIZED: Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003057] mb-4 sm:mb-6 leading-tight">
        The Hidden Truth About Shiny Market Fruits 🍎
      </h1>

      {/* ✅ MOBILE OPTIMIZED: Meta */}
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
        Written by <span className="font-semibold text-[#0071BC]">DRBOOQ Editorial Team</span> • Practical, research-backed consumer guidance
      </p>

      {/* ✅ MOBILE OPTIMIZED: Intro */}
      <section className="mb-8 sm:mb-10">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Have you ever wondered why some market fruits look unnaturally glossy and stay firm on the shelf for weeks?
          Often the answer is post-harvest treatments — coatings, preservatives, and storage techniques that extend
          appearance and shelf life. This article explains what those treatments are, why they are used, potential
          health considerations, and — most importantly — practical, evidence-based steps you can take to reduce
          exposure and choose safer produce.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Why fruits look shiny */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Why Do Market Fruits Look Shiny & Last So Long?
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Farmers and distributors use a range of post-harvest techniques to keep fruit visually appealing and to
          reduce spoilage during transport. These include food-grade waxes to restore shine after washing, mild
          preservatives or fungicides to slow mold, and temperature or atmosphere control in storage to delay ripening.
        </p>

        <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">Common treatments you might see</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li><strong>Wax coatings</strong> (carnauba, shellac, paraffin blends) — make fruit glossy and reduce moisture loss.</li>
          <li><strong>Fungicide treatments</strong> on some fruits to prevent mold during shipping.</li>
          <li><strong>Cold storage & controlled atmosphere</strong> — not chemicals, but very effective at slowing ripening.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Health concerns */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Health Concerns — Should You Worry?
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Most modern post-harvest practices are designed to be safe when used correctly, but there are a few practical
          concerns consumers should know:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
          <li>Small residues of pesticides or surface treatments may remain if produce is not cleaned well.</li>
          <li>Waxes themselves are generally food-grade but may trap surface residues or make cleaning harder.</li>
          <li>Peeling removes many surface residues but also removes fiber, vitamins, and phytonutrients concentrated near the skin.</li>
        </ul>

        <p className="text-base sm:text-lg text-gray-700">
          Overall: the nutritional benefits of eating fruit far outweigh small risks from residues — but smart handling reduces any exposure further.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: How to clean */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          How to Clean Fruits — Practical, Effective Methods
        </h2>
        <p className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-700">
          The easiest and most reliable step is good old running water plus a gentle scrub. Below are additional, evidence-based techniques you can use at home.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Quick & effective</h3>
            <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base text-gray-800">
              <li>Rinse under cool running water for 20–30 seconds and rub the surface with your hands or a brush for firm fruits.</li>
              <li>Dry with a clean towel to remove loosened residue and microbes.</li>
              <li>Wash just before eating (not before storing) to prolong shelf life.</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-[#0071BC] mb-2">Soaks that help more</h3>
            <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base text-gray-800">
              <li>Short soak (5–10 min) in a baking soda solution (1 teaspoon baking soda per 2 cups water) can loosen some surface residues.</li>
              <li>Vinegar soak (diluted) helps remove microbes — rinse thoroughly afterward to remove taste.</li>
              <li>Commercial produce washes can help but are not required — simple household methods are usually sufficient.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-[#FFF9E6] border-l-4 border-[#FFB020] rounded-lg text-sm sm:text-base text-gray-700">
          <strong>Note:</strong> Avoid harsh chemicals or detergents. These are not food-safe and can be absorbed into produce.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Peel or not */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Peel or Not? Weighing Pros & Cons
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Peeling removes surface residues but also strips valuable fiber, vitamins and phytonutrients concentrated near the skin.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li><strong>Peel:</strong> when residue risk is high (e.g., conventionally grown produce with thin skin).</li>
          <li><strong>Keep skin:</strong> when produce is organic, locally grown, or properly washed — you retain maximum nutrients.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Shopping tips */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Smart Shopping — Choose Safer Produce
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          You can reduce exposure at the point of purchase with a few habits.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Buy seasonal & local when possible — shorter supply chains often mean fewer treatments.</li>
          <li>Ask vendors about their practices — small growers often welcome questions.</li>
          <li>Consider organic for produce that tends to have higher surface residues (if budget allows).</li>
          <li>"Ugly" fruit is not necessarily bad — cosmetic standards often drive extra treatments.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Storage */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          Store Smart — Keep Fruit Fresh & Safe
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Refrigerate berries & cut fruit promptly.</li>
          <li>Store apples and bananas separately—bananas emit ethylene which speeds ripening.</li>
          <li>Do not wash fruit before storing — wash just before eating.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: FAQs */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-4 sm:mb-6 leading-tight">
          ❓ Frequently Asked Questions
        </h2>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700">
          <div>
            <strong>Q:</strong> Will washing remove all pesticide residues?<br />
            <strong>A:</strong> Washing significantly reduces surface residues and microbes, but some systemic pesticides can be present inside the tissue. Choosing organic or low-residue produce and using proper washing reduces overall exposure.
          </div>

          <div>
            <strong>Q:</strong> Are wax coatings dangerous?<br />
            <strong>A:</strong> Food-grade waxes used on fruit are generally regarded as safe and are widely used to prevent moisture loss. They can trap residues, so proper washing helps.
          </div>

          <div>
            <strong>Q:</strong> Should I stop buying fruit if I'm worried?<br />
            <strong>A:</strong> No — the health benefits of fruit (fiber, vitamins, antioxidants) far outweigh the small risks from residues. Use cleaning and buying strategies to minimize exposure.
          </div>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Checklist */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-3">✔ Quick Safe-Fruit Checklist</h2>
        <ul className="list-decimal pl-5 sm:pl-6 space-y-2 text-base sm:text-lg text-gray-800">
          <li>Rinse fruits under running water and rub or brush firm-skinned items.</li>
          <li>Soak stubborn fruits for a few minutes in a baking-soda solution if needed.</li>
          <li>Peel selectively (trade-off: fewer residues vs. less nutrition).</li>
          <li>Buy seasonal, local, and ask vendors about their practices.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: References */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-semibold text-[#003057] mb-2 sm:mb-3">🔎 Where to Read More</h2>
        <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-xs sm:text-sm">
          <li>World Health Organization — Food safety guidance</li>
          <li>United States Department of Agriculture — Pesticide & produce safety</li>
          <li>Local agricultural extension services — seasonal, local advice</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom line */}
      <section className="bg-[#F7FBFD] border border-[#0071BC]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">🍏 Bottom Line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Shiny fruit often looks appealing because of simple, food-safe treatments and smart storage — not because it's unhealthy.
          The healthiest choice is still to eat more fruit. Use the cleaning, buying and storage tips above to reduce exposure while keeping
          the nutritional benefits high. Small habits — like rinsing and choosing local seasonal produce — make a big difference.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Related articles */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4 sm:mb-6">📖 Related Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs
            .filter((b) => b.id !== 6)
            .slice(0, 3)
            .map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/article/${article.id}`)}
                className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden active:scale-98"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/article/${article.id}`);
                }}
              >
                {article.image && (
                  <img src={article.image} alt={article.title} className="w-full h-36 sm:h-44 object-cover" />
                )}
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

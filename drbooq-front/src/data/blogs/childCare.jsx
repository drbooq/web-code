// src/data/blogs/childCare.jsx - MOBILE OPTIMIZED
import React from "react";
import blogs from "../blogs";
import { useNavigate, Link } from "react-router-dom";

export default function ChildCareContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-6 sm:py-12 px-4 sm:px-6 md:px-12 font-['Inter','Helvetica Neue',Arial,sans-serif] text-[#222] leading-relaxed">
      
      {/* ✅ MOBILE OPTIMIZED: Breadcrumb */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/articles" className="hover:underline text-[#0071BC]">
          Health Guides
        </Link>{" "}
        › <span className="text-[#003057] hover:underline">Child Care</span> ›{" "}
        <span className="text-gray-700">Child Nutrition & Early Care Tips</span>
      </nav>

      {/* ✅ MOBILE OPTIMIZED: Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003057] mb-4 sm:mb-6 leading-tight">
        👶 Child Nutrition & Early Care: A Practical Guide for Parents
      </h1>

      {/* ✅ MOBILE OPTIMIZED: Meta */}
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
        Written by <span className="font-semibold text-[#0071BC]">DRBOOQ Editorial Team</span> • Evidence-based guidance for parents and caregivers
      </p>

      {/* ✅ MOBILE OPTIMIZED: Intro */}
      <section className="mb-8 sm:mb-10">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Early childhood nutrition shapes growth, brain development, immunity, and lifelong health.
          Small daily choices — what you pack, how you serve it, and how you model eating — matter more
          than occasional perfect meals. This guide explains the why and the how, with practical menus,
          picky-eater strategies, safety tips, and advice on when to seek professional help.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Why early nutrition matters */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🌱 Why Early Nutrition Matters
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          The first 1,000 days (conception through two years) are critical for brain wiring and metabolic
          programming. Nutrition in infancy and early childhood influences cognitive development, immune
          function, and the risk of obesity and chronic disease later in life.
        </p>

        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          This means: focus on nutrient-dense foods, consistent feeding routines, and a positive food environment.
          You don't need perfect meals — prioritize variety, whole foods, and regular family mealtimes.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Breastfeeding & formula basics */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🤱 Breastfeeding & Formula — Practical Notes
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Breastfeeding provides ideal nutrition and immune support. Exclusive breastfeeding is recommended for
          about six months when possible. When breastfeeding isn't possible or chosen, modern infant formulas
          provide balanced nutrition.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>
            If breastfeeding, seek help early for latch and supply issues — lactation consultants are very helpful.
          </li>
          <li>
            When using formula, follow preparation instructions and use safe water and clean bottles.
          </li>
          <li>
            Vitamin D supplement is often recommended for breastfed infants — check with your pediatrician.
          </li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Introducing solids */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🍽️ Introducing Solids: What & When
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Start introducing solids around 6 months, when the baby shows readiness (sits with support, good head control,
          shows interest in food). Begin with iron-rich foods and soft purees or mashed textures.
        </p>

        <h3 className="text-base sm:text-xl font-semibold text-[#0071BC] mb-2">First foods to prioritize</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Iron-fortified cereals, pureed meats, lentils — iron is crucial at 6+ months.</li>
          <li>Mashed avocado, banana, cooked carrots, and sweet potato for vitamins and texture.</li>
          <li>Introduce allergenic foods (peanut, egg) early and gently as per pediatric guidance — early introduction can reduce allergy risk.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Processed food harms */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🚫 Why Processed & Sugary Foods Hurt
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Packaged snacks, sugary drinks, and fast food often contain excess sugar, salt, unhealthy fats, and additives.
          Habitual consumption trains the palate toward sweet and salty flavors and displaces nutrient-dense foods.
        </p>

        <p className="text-base sm:text-lg text-gray-700 mb-3">
          Long-term effects include poor dental health, weight gain, reduced attention in school, and increased risk of
          metabolic disease. The earlier we reduce exposure, the better the future outcomes.
        </p>

        <div className="bg-[#FFF5F5] border-l-4 border-red-500 p-3 sm:p-5 rounded-lg shadow-sm text-sm sm:text-base">
          <strong>⚠️ Tip:</strong> check labels — if sugar (sucrose, corn syrup, fructose) is one of the first ingredients, it's a frequent sugar source.
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Practical meal ideas */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🍎 Practical Meal Ideas & Swaps
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Replace processed options gradually. Small swaps create big health wins.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-3 text-base sm:text-lg">
          <li><b>Instead of:</b> Sugary cereal → <b>Try:</b> Oat porridge with mashed banana and nut butter.</li>
          <li><b>Instead of:</b> Potato chips → <b>Try:</b> Baked veggie crisps or roasted chickpeas.</li>
          <li><b>Instead of:</b> Store-bought juice → <b>Try:</b> Water flavored with sliced fruit or whole fruit with yogurt.</li>
          <li><b>Snack idea:</b> Apple slices with cheese, carrot sticks with hummus, or plain yogurt with berries.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Weekly sample menu */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          📋 Sample 7-Day Child Menu (Simple)
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Portions depend on age — adjust as advised by your pediatrician. Focus on variety and color.
        </p>

        <ul className="list-decimal pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li><b>Day 1:</b> Oat porridge + fruit; lentil soup + brown rice; yogurt + fruit.</li>
          <li><b>Day 2:</b> Wholegrain toast + egg; fish cakes + steamed veggies; mashed banana.</li>
          <li><b>Day 3:</b> Smoothie with spinach + nut butter; chicken & veg pasta; sliced pears.</li>
          <li><b>Day 4:</b> Millet porridge; vegetable dhal + roti; carrot sticks + hummus.</li>
          <li><b>Day 5:</b> Fruit & cottage cheese; baked sweet potato + beans; fruit salad.</li>
          <li><b>Day 6:</b> Pancake (wholegrain) + berries; rice & veggie stir-fry; steamed apple.</li>
          <li><b>Day 7:</b> Family breakfast (eggs + veg); soup + sandwich; rest day, light nourishing snacks.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Dealing with picky eaters */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🤏 Handling Picky Eaters (What Works)
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Picky eating is normal. Patience, consistent exposure, and modeled behavior help more than bribing or forcing.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Offer a new food 10–15 times across days — acceptance grows with exposure.</li>
          <li>Serve small portions. Small wins encourage future tries.</li>
          <li>Eat together — children copy caregivers more than instructions.</li>
          <li>Include at least one liked item on the plate to reduce mealtime stress.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Food safety & allergies */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🛡️ Food Safety & Allergies
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Safe preparation and early, supervised introduction of common allergens (as recommended by your pediatrician)
          can reduce allergy risks. Always follow local health guidance for age-appropriate textures and choking prevention.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Cut foods into small, soft pieces for toddlers.</li>
          <li>Never leave young children unattended while eating.</li>
          <li>Introduce allergenic foods (peanut, egg, dairy) according to pediatric advice — early introduction often helps tolerance.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Growth monitoring */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          📈 Growth Monitoring & When to Seek Help
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Growth charts track long-term trends. One-off low appetite or weight dips are usually temporary, but seek help when:
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Weight/height fall across percentiles over months.</li>
          <li>Persistent vomiting, diarrhea, or feeding refusal.</li>
          <li>Developmental delays, frequent infections, or signs of malnutrition.</li>
        </ul>

        <div className="mt-4 p-3 sm:p-4 bg-[#FFF6E6] border-l-4 border-[#FFB020] rounded-lg">
          <strong className="text-sm sm:text-base">Quick guidance:</strong>
          <span className="text-sm sm:text-base"> Regular well-child visits are the best time to raise concerns. Pediatricians can order tests, suggest feeding strategies, and refer to nutritionists when needed.</span>
        </div>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Shopping & kitchen tips */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003057] mb-3 sm:mb-4 leading-tight">
          🛒 Shop & Cook Smart
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          Small planning reduces reliance on packaged food. A little prep goes a long way.
        </p>

        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-base sm:text-lg">
          <li>Buy whole fruits instead of juices — fiber matters.</li>
          <li>Batch-cook beans, lentils, and grains to use throughout the week.</li>
          <li>Freeze single-serve portions of purees or cooked veg for quick meals.</li>
          <li>Involve older children in simple tasks — they eat more when they help prepare food.</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Bottom line */}
      <section className="bg-[#F7FBFD] border border-[#0071BC]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#003057] mb-2 sm:mb-3">❤️ Bottom Line</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Early nutrition and a positive food environment set the stage for lifelong health.
          Prioritize varied, whole foods, consistent routines, and patient modeling. If you worry
          about growth, feeding, or allergies, consult your pediatrician — early action helps most.
        </p>
      </section>

      {/* ✅ MOBILE OPTIMIZED: References */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-semibold text-[#003057] mb-2 sm:mb-3">🔎 Sources & Further Reading</h2>
        <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-xs sm:text-sm">
          <li>WHO: Infant and young child feeding guidelines</li>
          <li>American Academy of Pediatrics: Nutrition and healthy growth</li>
          <li>Journal of Pediatrics: Early feeding and long-term health</li>
        </ul>
      </section>

      {/* ✅ MOBILE OPTIMIZED: Related Articles */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003057] mb-4 sm:mb-6">📖 Related Articles from DRBOOQ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs
            .filter((b) => b.id !== 4)
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

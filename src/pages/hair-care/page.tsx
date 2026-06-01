import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/feature/PageLayout";

const careSteps = [
  {
    icon: "ri-drop-line",
    title: "Washing",
    desc: "Use lukewarm water and sulphate-free shampoo. Gently swish — never rub or scrub the hair.",
    tip: "Wash every 8–10 wears, or when product buildup is visible.",
  },
  {
    icon: "ri-windy-line",
    title: "Conditioning",
    desc: "Apply a moisturising conditioner from mid-length to ends. Leave for 3–5 minutes before rinsing.",
    tip: "Deep condition once a month to keep the hair silky and soft.",
  },
  {
    icon: "ri-showers-line",
    title: "Drying",
    desc: "Pat gently with a microfibre towel. Air dry on a wig stand — never wring or twist the hair.",
    tip: "Avoid direct sunlight or heat while drying to prevent colour fading.",
  },
  {
    icon: "ri-scissors-cut-line",
    title: "Styling",
    desc: "Use a heat protectant before any hot tools. Keep flat irons and curling wands below 180°C.",
    tip: "Always style on a mannequin head or stand for even tension.",
  },
  {
    icon: "ri-haze-line",
    title: "Lace Care",
    desc: "Clean the lace gently with rubbing alcohol or wig adhesive remover. Let it dry completely before reapplying.",
    tip: "Use a soft toothbrush to gently clean lace edges without tearing.",
  },
  {
    icon: "ri-suitcase-line",
    title: "Storage",
    desc: "Store on a wig stand or in a silk/satin bag. Never fold or crush the hair when storing.",
    tip: "Keep away from dust, moisture, and direct heat sources.",
  },
];

const commonMistakes = [
  {
    title: "Using Regular Shampoo",
    desc: "Sulphates strip the natural oils from human hair wigs. Always use sulphate-free, gentle products.",
  },
  {
    title: "Sleeping in Your Wig",
    desc: "Friction from pillowcases causes tangling and breakage. Remove your wig before bed or use a silk bonnet.",
  },
  {
    title: "High Heat Without Protection",
    desc: "Human hair wigs can burn just like your natural hair. Always use a heat protectant spray.",
  },
  {
    title: "Ignoring the Lace",
    desc: "Buildup on the lace makes the hairline look unnatural. Clean the lace after every 2–3 wears.",
  },
  {
    title: "Over-Washing",
    desc: "Washing too frequently dries out the hair. Stick to every 8–10 wears unless heavily styled.",
  },
  {
    title: "Storing Wet or Damp",
    desc: "Storing a damp wig leads to mildew and odour. Always ensure it is completely dry before storage.",
  },
];

const faqs = [
  {
    q: "How often should I wash my human hair wig?",
    a: "Every 8–10 wears is ideal. If you use a lot of styling product, you may need to wash more frequently. If you wear it lightly, you can stretch it to 12–15 wears.",
  },
  {
    q: "Can I dye or bleach my wig?",
    a: "Yes, our 100% human hair wigs can be dyed and bleached just like natural hair. We recommend visiting a professional stylist for major colour changes.",
  },
  {
    q: "How long will my wig last with proper care?",
    a: "With proper care, our premium wigs last 1–2 years or more. Lace front wigs may need lace replacement after heavy long-term use.",
  },
  {
    q: "What is the best way to detangle my wig?",
    a: "Start from the ends and work your way up with a wide-tooth comb or a wig brush. Always detangle when the hair is damp with conditioner.",
  },
  {
    q: "Can I swim or exercise in my wig?",
    a: "We do not recommend swimming in your wig — chlorine and salt water damage the hair. For exercise, wear a sweat-wicking cap underneath or choose a cheaper synthetic option.",
  },
  {
    q: "Do I need to use wig glue or tape?",
    a: "Not necessarily. Many of our wigs come with adjustable straps, combs, and an elastic band for a secure glueless fit. Glue is optional for extra security.",
  },
];

export default function HairCarePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=elegant%20hair%20care%20flat%20lay%2C%20silk%20bonnet%2C%20wide%20tooth%20comb%2C%20serum%20bottle%2C%20wig%20stand%2C%20on%20soft%20cream%20linen%20fabric%2C%20warm%20natural%20lighting%2C%20beauty%20editorial%20photography%2C%20luxury%20hair%20care%20products%2C%20minimalist%20and%20warm%20aesthetic%2C%20soft%20rose%20gold%20accents%2C%20premium%20feel%2C%20no%20text%20or%20logos%2C%20inviting%20composition"
          alt="Hair care essentials"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">The Guide</span>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How to Keep Your<br />
            <span className="italic font-light">Wig Looking Fresh</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
            Your wig is an investment. With the right care routine, it will stay gorgeous, natural, and long-lasting for years.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line"></i>
              Shop Wigs
            </Link>
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              Ask Our Stylist
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-rose-700 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1–2 Years", label: "Lifespan with Care" },
              { value: "8–10 Wears", label: "Wash Interval" },
              { value: "180°C", label: "Max Heat Safe" },
              { value: "100%", label: "Human Hair" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-rose-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Care Guide */}
      <section className="py-16 md:py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Step by Step</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Perfect Care Routine
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              Follow these six steps to keep your wig looking salon-fresh every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careSteps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-rose-100 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-50 text-rose-700 group-hover:bg-rose-700 group-hover:text-white transition-colors flex-shrink-0">
                    <i className={`${step.icon} text-xl`}></i>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Step {i + 1}</span>
                    <h3 className="font-semibold text-stone-900 text-base">{step.title}</h3>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                <div className="bg-stone-50 rounded-xl px-4 py-3">
                  <p className="text-stone-500 text-xs leading-relaxed">
                    <i className="ri-lightbulb-line text-amber-500 mr-1"></i>
                    <strong>Pro tip:</strong> {step.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Wash Guide */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Deep Dive</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Washing Your Wig <span className="italic font-light">The Right Way</span>
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Detangle First", desc: "Brush the wig gently from ends to roots before getting it wet. Wet tangled hair knots even more." },
                  { step: "2", title: "Lukewarm Water Only", desc: "Hot water opens the cuticle and causes frizz. Lukewarm water is gentle and effective." },
                  { step: "3", title: "Sulphate-Free Shampoo", desc: "Use a small amount of gentle, sulphate-free shampoo. Swish the hair in the water — never rub." },
                  { step: "4", title: "Condition Mid to Ends", desc: "Apply conditioner from the mid-lengths down. Avoid the lace base — it can loosen the knots." },
                  { step: "5", title: "Rinse Thoroughly", desc: "Rinse until the water runs clear. Any residue left behind will attract dirt and dull the shine." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-700 text-white text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden h-[480px]">
                <img
                  src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20washing%20luxury%20long%20wig%20in%20bathroom%20sink%2C%20gentle%20water%20stream%2C%20soft%20warm%20lighting%2C%20serene%20and%20peaceful%20mood%2C%20white%20and%20cream%20bathroom%20aesthetic%2C%20natural%20hair%20care%20routine%2C%20editorial%20beauty%20photography%2C%20premium%20hair%20product%20bottles%20nearby%2C%20calm%20and%20elegant%20composition%2C%20warm%20neutral%20tones"
                  alt="Washing a wig"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drying & Styling */}
      <section className="py-16 md:py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="rounded-2xl overflow-hidden h-[480px]">
                <img
                  src="https://readdy.ai/api/search-image?query=elegant%20Black%20woman%20styling%20long%20silky%20wig%20with%20flat%20iron%2C%20warm%20studio%20lighting%2C%20professional%20hair%20styling%20setup%2C%20serum%20and%20heat%20protectant%20bottles%20visible%2C%20soft%20cream%20and%20rose%20gold%20aesthetic%2C%20beauty%20editorial%20photography%2C%20calm%20focused%20expression%2C%20luxury%20hair%20care%20scene%2C%20warm%20neutral%20background%2C%20no%20text%20or%20logos"
                  alt="Styling a wig"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">After the Wash</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Drying & Styling <span className="italic font-light">Like a Pro</span>
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Pat, Do Not Rub", desc: "Gently press the hair with a microfibre towel to remove excess water. Rubbing creates friction and frizz." },
                  { title: "Air Dry on a Stand", desc: "Place the wig on a mannequin head or wig stand. Let gravity do the work for a smooth, natural fall." },
                  { title: "Heat Protectant is Non-Negotiable", desc: "Spray a heat protectant before using flat irons, curling wands, or blow dryers. It is a shield for your investment." },
                  { title: "Keep Tools Below 180°C", desc: "Human hair wigs can handle heat, but excessive temperatures cause irreversible damage. Low and slow wins." },
                  { title: "Style on a Stand", desc: "Always style your wig while it is mounted. This gives you even tension and a natural finished look." },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0">
                      <i className={`ri-check-line text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Avoid These</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Common Mistakes to Avoid
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              These are the top mistakes we see. Avoid them and your wig will thank you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonMistakes.map((m, i) => (
              <div
                key={m.title}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-rose-100 transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
                  <i className="ri-close-circle-line text-lg"></i>
                </div>
                <h3 className="font-semibold text-stone-900 text-base mb-2">{m.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#FDF9F7]">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Got Questions?</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hair Care FAQs
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              Quick answers to the most common questions we get about wig care.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.q;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-stone-900 text-sm pr-4">{faq.q}</span>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0 transition-colors">
                      <i className={`ri-${isOpen ? "subtract" : "add"}-line text-sm`}></i>
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=luxurious%20human%20hair%20wigs%20on%20display%2C%20multiple%20styles%20arranged%20elegantly%2C%20long%20straight%20and%20curly%20wigs%2C%20warm%20golden%20lighting%2C%20cream%20and%20rose%20gold%20studio%20background%2C%20premium%20hair%20boutique%20aesthetic%2C%20beauty%20editorial%20photography%2C%20soft%20focus%20background%2C%20inviting%20and%20glamorous%20composition%2C%20no%20text%20or%20logos%2C%20high%20fashion%20quality"
          alt="Shop Gold Coast Hair wigs"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">Ready to Transform?</span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Perfect<br />
            <span className="italic font-light">Wig Today</span>
          </h2>
          <p className="text-white/80 text-base mb-10 leading-relaxed">
            Now that you know how to care for it, it is time to find the wig that makes you feel unstoppable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line"></i>
              Shop Wigs
            </Link>
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
            >
              <i className="ri-whatsapp-line text-emerald-400"></i>
              Chat with Us
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
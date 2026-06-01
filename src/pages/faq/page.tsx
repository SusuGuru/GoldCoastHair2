import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/feature/PageLayout";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  icon: string;
  label: string;
  color: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "shipping",
    icon: "ri-truck-line",
    label: "Shipping & Delivery",
    color: "bg-rose-50 text-rose-700",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within Ghana takes 1–3 business days. International orders (UK, US, Canada, Nigeria, etc.) typically arrive within 7–14 business days depending on your location. Express shipping options are available — contact us on WhatsApp for details.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to 20+ countries including the UK, USA, Canada, Nigeria, South Africa, and more. International shipping rates and times vary by destination. Message us on WhatsApp at +233 547 149 360 for a shipping quote to your country.",
      },
      {
        q: "How much does shipping cost?",
        a: "Shipping within Ghana starts from GHS 30. International shipping varies by destination and order weight. Orders over $150 qualify for free standard shipping within Ghana. Contact us for an exact international shipping quote.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order is dispatched, we'll send you a tracking number via WhatsApp or email. You can use this to track your package in real time. If you haven't received a tracking number within 48 hours of ordering, please reach out to us.",
      },
      {
        q: "What happens if my package is delayed?",
        a: "Delays can occasionally happen due to customs or courier issues. If your order hasn't arrived within the expected timeframe, contact us immediately on WhatsApp (+233 547 149 360) and we'll investigate and resolve it for you.",
      },
    ],
  },
  {
    id: "returns",
    icon: "ri-refresh-line",
    label: "Returns & Exchanges",
    color: "bg-amber-50 text-amber-700",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for items that are unused, unworn, and in their original packaging with all tags attached. Due to hygiene reasons, we cannot accept returns on wigs or extensions that have been worn, washed, or altered in any way.",
      },
      {
        q: "How do I start a return or exchange?",
        a: "Contact us on WhatsApp (+233 547 149 360) or email hello@goldcoasthair.com.au within 7 days of receiving your order. Include your order details and reason for return. We'll guide you through the process and provide a return address.",
      },
      {
        q: "Can I exchange for a different length or colour?",
        a: "Yes! If your item is unused and in original condition, we're happy to exchange it for a different length or colour (subject to availability). You'll only need to cover the return shipping cost. Contact us to arrange this.",
      },
      {
        q: "What if my item arrives damaged or incorrect?",
        a: "We're so sorry if this happens! Please take photos of the item and packaging immediately and send them to us on WhatsApp within 48 hours of delivery. We'll send a replacement or issue a full refund at no cost to you — no questions asked.",
      },
      {
        q: "How long does a refund take?",
        a: "Once we receive and inspect your returned item, refunds are processed within 3–5 business days. The time it takes to appear in your account depends on your bank or payment method, but typically takes 5–10 business days.",
      },
    ],
  },
  {
    id: "hair-care",
    icon: "ri-scissors-line",
    label: "Hair Care Tips",
    color: "bg-emerald-50 text-emerald-700",
    items: [
      {
        q: "How do I wash my wig or extensions?",
        a: "Use a sulphate-free shampoo and lukewarm water. Gently detangle with a wide-tooth comb before washing. Apply shampoo from root to tip in a downward motion — never scrub in circles. Rinse thoroughly, apply a deep conditioner for 5–10 minutes, then rinse again. Pat dry with a microfibre towel and air dry on a wig stand.",
      },
      {
        q: "How often should I wash my wig?",
        a: "For daily wear, wash your wig every 10–14 days. If you wear it less frequently, washing every 3–4 weeks is fine. Over-washing can dry out the hair and reduce its lifespan. Always use products specifically designed for human hair wigs.",
      },
      {
        q: "Can I use heat on my wig or extensions?",
        a: "Yes! All our products are made from 100% human hair, so they can be heat-styled just like your natural hair. Always use a heat protectant spray before using any heat tools. Keep flat irons and curling wands below 180°C (350°F) to maintain the hair's health and longevity.",
      },
      {
        q: "How do I store my wig when I'm not wearing it?",
        a: "Store your wig on a wig stand or mannequin head to maintain its shape. Keep it in a cool, dry place away from direct sunlight. If you need to store it long-term, place it in a silk or satin bag to prevent tangling and frizz. Never store a wet wig.",
      },
      {
        q: "How long will my wig or extensions last?",
        a: "With proper care, our 100% human hair wigs can last 1–3 years, and extensions 6–12 months. The key factors are how often you wear them, how well you care for them, and whether you use heat regularly. Following our care tips will significantly extend the lifespan.",
      },
      {
        q: "My wig is tangling — what should I do?",
        a: "Start by applying a detangling spray or leave-in conditioner. Use a wide-tooth comb and start detangling from the ends, working your way up to the roots. Never brush a dry wig aggressively. For severe tangles, soak the hair in a mixture of water and conditioner for 30 minutes before detangling.",
      },
    ],
  },
  {
    id: "sizing",
    icon: "ri-ruler-line",
    label: "Sizing & Fitting",
    color: "bg-stone-100 text-stone-700",
    items: [
      {
        q: "How do I measure my head for a wig?",
        a: "Use a soft measuring tape. Measure: (1) Circumference — around your entire head at the hairline. (2) Front to back — from your front hairline over the top of your head to the nape of your neck. (3) Ear to ear — across the top of your head from one ear to the other. Most of our wigs fit average head sizes (54–58cm). Contact us if you need a custom fit.",
      },
      {
        q: "What do the length measurements mean?",
        a: "Hair length is measured from the root to the tip when the hair is stretched straight. A 16\" wig will fall around collarbone length on most women. A 20\" wig reaches mid-chest. A 24\" wig approaches the waist. Note: curly and wavy styles appear shorter than straight styles at the same length due to shrinkage. Check our Size Guide on any product page for a full visual chart.",
      },
      {
        q: "What length should I choose?",
        a: "It depends on your height and the look you want. For a natural everyday look, 16\"–18\" is most popular. For a glamorous, dramatic look, go for 20\"–24\". Shorter women tend to look great in 14\"–18\", while taller women can carry off longer lengths beautifully. When in doubt, go longer — you can always trim!",
      },
      {
        q: "Do your wigs fit all head sizes?",
        a: "Our wigs come with adjustable straps inside that fit most head sizes (54–58cm circumference). If you have a smaller or larger head, contact us on WhatsApp and we can advise on the best fit or arrange a custom unit for you.",
      },
      {
        q: "What is the difference between lace front and full lace wigs?",
        a: "A lace front wig has lace only along the front hairline (typically 13x4 or 13x6 inches), giving a natural-looking hairline. A full lace wig has lace covering the entire cap, allowing you to part the hair anywhere and style it in updos. Full lace wigs offer more versatility but are typically more expensive.",
      },
      {
        q: "What does HD lace mean?",
        a: "HD (High Definition) lace is an ultra-thin, transparent lace that melts seamlessly into any skin tone — making it virtually undetectable. It's thinner and more delicate than regular lace, giving the most natural-looking hairline possible. All our HD lace wigs are suitable for all skin tones.",
      },
    ],
  },
  {
    id: "ordering",
    icon: "ri-shopping-bag-line",
    label: "Ordering & Payment",
    color: "bg-rose-50 text-rose-700",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our collection, add items to your cart, and proceed to checkout. Fill in your shipping details and select your preferred payment method. Once your payment is confirmed, you'll receive an order confirmation via WhatsApp or email. If you need help, message us on WhatsApp and we'll place the order for you.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers, mobile money (MTN, Vodafone, AirtelTigo), and cash on delivery within select areas of Ghana. For international orders, we accept PayPal and bank transfers. Contact us on WhatsApp for payment details.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "Yes, if your order hasn't been dispatched yet. Contact us on WhatsApp immediately after placing the order and we'll make the changes for you. Once dispatched, orders cannot be modified but can be returned according to our return policy.",
      },
      {
        q: "Do you offer wholesale or bulk pricing?",
        a: "Yes! We offer wholesale pricing for orders of 10 units or more. This is ideal for salon owners, resellers, and stylists. Contact us on WhatsApp for a wholesale catalogue and pricing.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We never store your payment details. All transactions are processed through secure, encrypted channels. Your privacy and security are our top priority.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openQ, setOpenQ] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openQ === item.q;
        return (
          <div
            key={item.q}
            className="bg-white rounded-2xl border border-stone-100 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenQ(isOpen ? null : item.q)}
              className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
            >
              <span className="font-semibold text-stone-900 text-sm pr-4">{item.q}</span>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-colors ${isOpen ? 'bg-rose-700 text-white' : 'bg-stone-50 text-stone-400'}`}>
                <i className={`ri-${isOpen ? "subtract" : "add"}-line text-sm`}></i>
              </div>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <p className="text-stone-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("shipping");

  const current = faqCategories.find((c) => c.id === activeCategory)!;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-[#FDF9F7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-4 block">Help Centre</span>
          <h1
            className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked<br />
            <span className="italic font-light">Questions</span>
          </h1>
          <p className="text-stone-500 text-base leading-relaxed max-w-xl mx-auto mb-10">
            Everything you need to know about our products, shipping, returns, and hair care. Can&apos;t find your answer? We&apos;re always here to help.
          </p>
          {/* Quick contact strip */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl border border-stone-100 px-6 py-4">
            <span className="text-stone-500 text-sm">Still have questions?</span>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/233547149360"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-whatsapp-line"></i>
                WhatsApp Us
              </a>
              <a
                href="mailto:hello@goldcoasthair.com.au"
                className="inline-flex items-center gap-2 border border-stone-200 hover:border-rose-300 text-stone-700 font-semibold px-5 py-2 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-line text-rose-600"></i>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar — category nav */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 lg:flex-shrink text-left w-full ${
                      activeCategory === cat.id
                        ? "bg-rose-700 text-white"
                        : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${
                      activeCategory === cat.id ? "bg-white/20 text-white" : cat.color
                    }`}>
                      <i className={`${cat.icon} text-sm`}></i>
                    </div>
                    <span>{cat.label}</span>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      activeCategory === cat.id ? "bg-white/20 text-white" : "bg-stone-200 text-stone-500"
                    }`}>
                      {cat.items.length}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* FAQ content */}
            <div className="flex-1 min-w-0">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${current.color}`}>
                  <i className={`${current.icon} text-xl`}></i>
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold text-stone-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {current.label}
                  </h2>
                  <p className="text-stone-400 text-sm">{current.items.length} questions answered</p>
                </div>
              </div>

              <FaqAccordion items={current.items} />

              {/* Bottom nav between categories */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-stone-100">
                {(() => {
                  const idx = faqCategories.findIndex((c) => c.id === activeCategory);
                  const prev = faqCategories[idx - 1];
                  const next = faqCategories[idx + 1];
                  return (
                    <>
                      <div>
                        {prev && (
                          <button
                            onClick={() => setActiveCategory(prev.id)}
                            className="flex items-center gap-2 text-stone-500 hover:text-rose-700 text-sm font-medium cursor-pointer transition-colors"
                          >
                            <i className="ri-arrow-left-line"></i>
                            {prev.label}
                          </button>
                        )}
                      </div>
                      <div>
                        {next && (
                          <button
                            onClick={() => setActiveCategory(next.id)}
                            className="flex items-center gap-2 text-stone-500 hover:text-rose-700 text-sm font-medium cursor-pointer transition-colors"
                          >
                            {next.label}
                            <i className="ri-arrow-right-line"></i>
                          </button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="py-16 bg-[#FDF9F7]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 mx-auto mb-6">
            <i className="ri-customer-service-2-line text-2xl"></i>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Still Need Help?
          </h2>
          <p className="text-stone-500 text-base leading-relaxed mb-8">
            Our team is available Monday to Saturday and replies within 24 hours. We&apos;re always happy to help you find your perfect hair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-700 font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-send-line text-rose-600"></i>
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
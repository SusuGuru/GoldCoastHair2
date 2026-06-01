import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/feature/PageLayout";

const values = [
  { icon: "ri-leaf-line", title: "100% Human Hair", desc: "Every strand is ethically sourced, unprocessed human hair — soft, natural, and long-lasting." },
  { icon: "ri-price-tag-3-line", title: "Luxury for Less", desc: "We cut out the middleman so you get premium quality at prices that actually make sense." },
  { icon: "ri-palette-line", title: "Endless Styles", desc: "From sleek straight to bouncy curls — our range covers every texture, length, and vibe." },
  { icon: "ri-heart-3-line", title: "Made for You", desc: "Whether you are a first-timer or a hair connoisseur, we have got the perfect match for you." },
  { icon: "ri-shield-check-line", title: "Quality Guaranteed", desc: "Every piece passes strict quality checks before it reaches your door. No compromises." },
  { icon: "ri-truck-line", title: "Fast Shipping", desc: "We ship fast and reliably so your new look arrives right when you need it." },
];

const timeline = [
  { year: "2019", title: "The Beginning", desc: "Gold Coast Hair was born in a small apartment on the Gold Coast. Founder Soraya started with a passion for beautiful hair and a mission to make luxury accessible to every woman." },
  { year: "2020", title: "First 500 Customers", desc: "Word spread fast. Within a year, over 500 women had transformed their look with Gold Coast Hair. The DMs were flooding in — and we loved every single one." },
  { year: "2021", title: "Expanding the Range", desc: "We launched our full wig collection — HD lace fronts, full lace, and custom units — alongside our signature bundle deals. The community kept growing." },
  { year: "2022", title: "Going International", desc: "Orders started coming in from the UK, US, Canada, and across Africa. Gold Coast Hair officially became a global brand, shipping to 20+ countries." },
  { year: "2023", title: "5,000+ Happy Customers", desc: "We hit a milestone we are incredibly proud of — over 5,000 women served. Every review, every photo tag, every DM means the world to us." },
  { year: "2024", title: "New Collections & Growth", desc: "We launched our bob wig range, fringe styles, and expanded our colour options. The brand keeps evolving — always with you in mind." },
];

const team = [
  {
    name: "Soraya Mensah",
    role: "Founder & Creative Director",
    bio: "Soraya started Gold Coast Hair after struggling to find affordable, high-quality wigs that actually looked natural. Her vision: luxury hair for every woman, at every budget.",
    image: "https://readdy.ai/api/search-image?query=confident%20professional%20Black%20woman%20entrepreneur%2C%20warm%20studio%20portrait%2C%20natural%20makeup%2C%20elegant%20blouse%2C%20soft%20warm%20lighting%2C%20genuine%20smile%2C%20modern%20office%20background%2C%20hair%20styled%20beautifully%2C%20cream%20and%20gold%20tones%2C%20professional%20headshot%2C%20clean%20background&width=400&height=480&seq=team_soraya01&orientation=portrait",
    social: "@goldcoasthair",
  },
  {
    name: "Efua Darko",
    role: "Head of Customer Experience",
    bio: "Efua is the heart of our customer team. She personally handles every query, complaint, and compliment — making sure every Gold Coast Hair customer feels like a VIP.",
    image: "https://readdy.ai/api/search-image?query=friendly%20professional%20Black%20woman%20customer%20service%20manager%2C%20warm%20genuine%20smile%2C%20professional%20attire%2C%20soft%20studio%20lighting%2C%20approachable%20and%20confident%2C%20natural%20hair%2C%20warm%20neutral%20background%2C%20cream%20and%20beige%20tones%2C%20professional%20headshot%2C%20clean%20background&width=400&height=480&seq=team_efua01&orientation=portrait",
    social: "@goldcoasthair",
  },
  {
    name: "Nana Ama Boateng",
    role: "Wig Specialist & Stylist",
    bio: "With 8 years in the hair industry, Nana Ama curates every product in our collection. If it is in our store, she is personally tested and approved it.",
    image: "https://readdy.ai/api/search-image?query=Black%20woman%20hair%20stylist%20professional%2C%20wearing%20stylish%20outfit%2C%20beautiful%20long%20wig%2C%20confident%20pose%2C%20warm%20studio%20lighting%2C%20elegant%20and%20modern%20aesthetic%2C%20natural%20makeup%2C%20soft%20cream%20background%2C%20professional%20headshot%2C%20clean%20background%2C%20warm%20tones&width=400&height=480&seq=team_nana01&orientation=portrait",
    social: "@goldcoasthair",
  },
];

const stats = [
  { value: "5,000+", label: "Happy Customers" },
  { value: "20+", label: "Countries Shipped" },
  { value: "100%", label: "Human Hair" },
  { value: "4.9\u2605", label: "Average Rating" },
];

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=beautiful%20Black%20women%20with%20luxurious%20long%20flowing%20hair%2C%20elegant%20fashion%20editorial%2C%20warm%20golden%20tones%2C%20empowering%20and%20glamorous%2C%20multiple%20women%20together%2C%20rich%20warm%20background%20with%20soft%20bokeh%2C%20high%20fashion%20photography&width=1400&height=700&seq=about_hero01&orientation=landscape"
          alt="Gold Coast Hair brand story"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">Our Story</span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Born to Make<br />
            <span className="italic font-light">Every Woman Feel</span><br />
            Unstoppable
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
            From a small Gold Coast apartment to a global hair brand — this is our story.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-bag-line"></i>
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-rose-700 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-rose-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-80">
                  <img
                    src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20wearing%20a%20long%20straight%20luxury%20wig%2C%20confident%20and%20glamorous%2C%20warm%20studio%20lighting%2C%20elegant%20fashion%20portrait%2C%20rich%20skin%20tone%2C%20hair%20looking%20silky%20and%20natural%2C%20cream%20neutral%20background&width=400&height=580&seq=about_story01&orientation=portrait"
                    alt="Luxury wig"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-80 mt-10">
                  <img
                    src="https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20gorgeous%20curly%20hair%20extensions%2C%20natural%20looking%20voluminous%20curls%2C%20warm%20golden%20lighting%2C%20fashion%20editorial%20style%2C%20confident%20smile%2C%20elegant%20and%20modern%20aesthetic%2C%20soft%20warm%20background&width=400&height=580&seq=about_story02&orientation=portrait"
                    alt="Curly hair extensions"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-stone-100 w-64">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0">
                  <i className="ri-user-smile-line text-xl"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>5,000+</p>
                  <p className="text-stone-500 text-xs">Happy Customers Worldwide</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Who We Are</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hair That Makes You <span className="italic font-light">Feel Like You</span>
              </h2>
              <p className="text-stone-600 text-base leading-relaxed mb-5">
                Gold Coast Hair was founded on one simple belief: every woman deserves to feel beautiful, confident, and completely herself. We started small — hand-selecting each bundle, testing every lace front, and personally packaging every order from a tiny apartment in Accra.
              </p>
              <p className="text-stone-600 text-base leading-relaxed mb-6">
                Today, we ship to over 20 countries and have served more than 5,000 happy customers. But our mission has never changed — premium, 100% human hair at prices that do not break the bank. No shortcuts. No compromises. Just gorgeous hair that feels like yours.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://readdy.ai/api/search-image?query=confident%20Black%20woman%20founder%20signature%20style%20portrait%2C%20warm%20lighting%2C%20natural%20hair%20styled%20elegantly%2C%20minimal%20background%2C%20professional%20headshot%20with%20warm%20cream%20tones%2C%20subtle%20smile%2C%20fashion%20editorial%20quality&width=100&height=100&seq=about_signature01&orientation=squarish"
                  alt="Soraya Mensah"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Soraya Mensah</p>
                  <p className="text-stone-500 text-xs">Founder, Gold Coast Hair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">What We Stand For</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Values
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              Everything we do is guided by these six principles. They are not just words — they are our promise to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-rose-100 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-50 text-rose-700 mb-4 group-hover:bg-rose-700 group-hover:text-white transition-colors">
                  <i className={`${v.icon} text-xl`}></i>
                </div>
                <h3 className="font-semibold text-stone-900 text-base mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">The Journey</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Story
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              From humble beginnings to a global brand — here is how Gold Coast Hair came to be.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 md:-translate-x-1/2"></div>

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeYear === item.year;
              return (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 md:gap-10 mb-10 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  onMouseEnter={() => setActiveYear(item.year)}
                  onMouseLeave={() => setActiveYear(null)}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-rose-700 border-2 border-white z-10 md:-translate-x-1/2 mt-2 shadow-sm"></div>

                  {/* Content */}
                  <div
                    className={`ml-10 md:ml-0 w-full md:w-[calc(50%-40px)] ${
                      isLeft ? "md:text-right md:pr-0" : "md:text-left md:pl-0"
                    }`}
                  >
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1 block">
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-stone-900 text-base mb-2">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm text-stone-500 leading-relaxed transition-all duration-300 ${
                        isActive ? "max-h-40 opacity-100" : "max-h-20 opacity-80 line-clamp-3 md:line-clamp-none"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">The People</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the Team
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              The passionate women behind Gold Coast Hair, working every day to bring you the best hair experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 group"
              >
                <div className="relative overflow-hidden" style={{ height: 320 }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-stone-900 text-base mb-0.5">{member.name}</h3>
                  <p className="text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <p className="text-xs text-stone-400 font-medium">{member.social}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=luxurious%20hair%20products%20flat%20lay%2C%20wigs%20and%20extensions%20on%20elegant%20surface%2C%20rose%20gold%20and%20cream%20tones%2C%20beauty%20editorial%20photography%2C%20soft%20warm%20lighting%2C%20premium%20aesthetic%2C%20minimalist%20composition&width=1400&height=500&seq=about_cta01&orientation=landscape"
          alt="Shop Gold Coast Hair"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">Ready to Transform?</span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Best Hair Day<br />
            <span className="italic font-light">Starts Here</span>
          </h2>
          <p className="text-white/80 text-base mb-10 leading-relaxed">
            Join over 5,000 women who&apos;ve found their perfect hair with Gold Coast Hair. Shop our full collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line"></i>
              Shop Now
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
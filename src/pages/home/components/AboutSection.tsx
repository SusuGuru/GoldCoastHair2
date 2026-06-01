import { useNavigate } from "react-router-dom";

const values = [
  {
    icon: "ri-leaf-line",
    title: "100% Human Hair",
    desc: "Every strand is ethically sourced, unprocessed human hair — soft, natural, and long-lasting.",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "Luxury for Less",
    desc: "We cut out the middleman so you get premium quality at prices that actually make sense.",
  },
  {
    icon: "ri-palette-line",
    title: "Endless Styles",
    desc: "From sleek straight to bouncy curls — our range covers every texture, length, and vibe.",
  },
  {
    icon: "ri-heart-3-line",
    title: "Made for You",
    desc: "Whether you're a first-timer or a hair connoisseur, we've got the perfect match for you.",
  },
];

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-24 bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-72">
                <img
                  src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20wearing%20a%20long%20straight%20luxury%20wig%2C%20confident%20and%20glamorous%2C%20warm%20studio%20lighting%2C%20elegant%20fashion%20portrait%2C%20rich%20skin%20tone%2C%20hair%20looking%20silky%20and%20natural%2C%20cream%20neutral%20background&width=400&height=580&seq=about_img01&orientation=portrait"
                  alt="Luxury wig"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-72 mt-10">
                <img
                  src="https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20gorgeous%20curly%20hair%20extensions%2C%20natural%20looking%20voluminous%20curls%2C%20warm%20golden%20lighting%2C%20fashion%20editorial%20style%2C%20confident%20smile%2C%20elegant%20and%20modern%20aesthetic%2C%20soft%20warm%20background&width=400&height=580&seq=about_img02&orientation=portrait"
                  alt="Curly hair extensions"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-stone-100 w-64">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0">
                <i className="ri-user-smile-line text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">5,000+</p>
                <p className="text-stone-500 text-xs">Happy Customers Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-6">
              Born to Make
              <br />
              <span className="italic font-light">Every Woman Feel</span>
              <br />
              Unstoppable
            </h2>
            <p className="text-stone-600 text-base leading-relaxed mb-5">
              Gold Coast Hair was founded on one simple belief: luxury hair
              shouldn&apos;t cost a fortune. We&apos;re a Gold Coast-based hair brand
              obsessed with delivering premium wigs, extensions, and bundles that
              look and feel like your own hair — at prices that are actually fair.
            </p>
            <p className="text-stone-600 text-base leading-relaxed mb-10">
              Every product in our collection is made from 100% human hair, carefully
              sourced and crafted to give you the most natural, beautiful result
              possible. Whether you want length, volume, or a full transformation —
              we&apos;ve got you.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0 mt-0.5">
                    <i className={`${v.icon} text-base`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-0.5">
                      {v.title}
                    </p>
                    <p className="text-stone-500 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate("/products")}
                className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Explore Our Products
                <i className="ri-arrow-right-line text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
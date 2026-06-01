export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20long%20luxurious%20wavy%20hair%20extensions%2C%20glamorous%20and%20confident%2C%20wearing%20elegant%20outfit%2C%20warm%20studio%20lighting%20with%20golden%20tones%2C%20rich%20deep%20skin%20tone%2C%20hair%20flowing%20beautifully%2C%20high%20fashion%20editorial%20photography%2C%20cream%20and%20warm%20neutral%20background&width=1920&height=1080&seq=hero_brand01&orientation=landscape"
          alt="Gold Coast Hair luxury hair extensions"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent"></div>
      </div>

      {/* Floating badge top right */}
      <div className="absolute top-40 right-8 md:right-16 hidden md:flex flex-col items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-white text-center">
        <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>100%</span>
        <span className="text-xs tracking-wide text-white/80">Human Hair</span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 border border-white/40 text-white/90 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"></span>
            Luxury Hair · Affordable Prices
          </span>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Dream<br />
            <span className="italic font-light text-rose-200">Hair,</span><br />
            Delivered.
          </h1>

          <p className="text-white/75 text-base md:text-lg font-light mb-10 leading-relaxed max-w-md">
            Premium wigs, extensions &amp; bundles crafted from 100% human hair. Luxury quality that won&apos;t break the bank — because every woman deserves to slay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleScroll('#services')}
              className="inline-flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-base"
            >
              Shop the Collection
              <i className="ri-shopping-bag-line"></i>
            </button>
            <button
              onClick={() => handleScroll('#portfolio')}
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white hover:bg-white/10 font-medium px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-base"
            >
              See Customer Looks
              <i className="ri-image-line"></i>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { icon: 'ri-shield-check-line', text: '100% Human Hair' },
              { icon: 'ri-truck-line', text: 'Fast Shipping' },
              { icon: 'ri-heart-line', text: '5,000+ Happy Customers' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
                <i className={`${b.icon} text-rose-300 text-base`}></i>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <i className="ri-arrow-down-line text-lg"></i>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { useCustomerLooks } from '@/hooks/useCustomerLooks';

export default function PortfolioSection() {
  const [active, setActive] = useState<string | null>(null);
  const { looks, loading } = useCustomerLooks();

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-stone-500">
              <i className="ri-loader-4-line animate-spin text-lg"></i>
              <span className="text-sm">Loading customer looks...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Real Customers</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Customer Looks
            </h2>
          </div>
          <p className="text-stone-500 text-base max-w-sm leading-relaxed">
            Real women, real results. See how our customers are wearing Gold Coast Hair.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {looks.map((look) => (
            <div
              key={look.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: '400px' }}
              onMouseEnter={() => setActive(look.id)}
              onMouseLeave={() => setActive(null)}
            >
              <img
                src={look.image}
                alt={look.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${active === look.id ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Info card */}
              <div className={`absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 ${active === look.id ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm font-bold text-stone-900">{look.name}</p>
                  <p className="text-xs text-rose-700 font-semibold mt-0.5">{look.product}</p>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">{look.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
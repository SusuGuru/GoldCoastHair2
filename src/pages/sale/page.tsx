import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { useProducts } from '@/hooks/useProducts';
import { useCurrencyContext } from '@/hooks/CurrencyContext';

type SortOption = 'savings_desc' | 'price_asc' | 'price_desc' | 'pct_desc';

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[^0-9.]/g, '').replace(',', '')) || 0;
}

function SaleCountdown() {
  const [endTime] = useState(() => {
    const stored = localStorage.getItem('sale_end_time');
    if (stored) {
      const end = parseInt(stored, 10);
      if (end > Date.now()) return end;
    }
    const end = Date.now() + 47 * 3600 * 1000 + 59 * 60 * 1000;
    localStorage.setItem('sale_end_time', String(end));
    return end;
  });

  const [remaining, setRemaining] = useState(() => Math.max(0, endTime - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, endTime - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(remaining / 3600000);
  const mins = Math.floor((remaining % 3600000) / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3">
      {[
        { val: hours, label: 'HRS' },
        { val: mins, label: 'MIN' },
        { val: secs, label: 'SEC' },
      ].map(({ val, label }, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 min-w-[56px] text-center">
              <span className="text-2xl font-bold text-white tabular-nums">{pad(val)}</span>
            </div>
            <span className="text-white/60 text-xs font-semibold mt-1 tracking-widest">{label}</span>
          </div>
          {i < 2 && <span className="text-white/60 text-2xl font-bold mx-2 mb-4">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function SalePage() {
  const { products } = useProducts();
  const { formatPrice } = useCurrencyContext();
  const [sortBy, setSortBy] = useState<SortOption>('savings_desc');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const saleProducts = useMemo(() => {
    return products
      .filter((p) => p.originalPrice && parsePrice(p.originalPrice) > parsePrice(p.price))
      .map((p) => {
        const original = parsePrice(p.originalPrice);
        const current = parsePrice(p.price);
        const savedAmount = original - current;
        const savedPct = Math.round((savedAmount / original) * 100);
        return { ...p, savedAmount, savedPct, originalNum: original, currentNum: current };
      });
  }, [products]);

  const categories = ['All', ...Array.from(new Set(saleProducts.map((p) => p.category)))];

  const filtered = useMemo(() => {
    let list = categoryFilter === 'All' ? saleProducts : saleProducts.filter((p) => p.category === categoryFilter);
    switch (sortBy) {
      case 'savings_desc': return [...list].sort((a, b) => b.savedAmount - a.savedAmount);
      case 'pct_desc': return [...list].sort((a, b) => b.savedPct - a.savedPct);
      case 'price_asc': return [...list].sort((a, b) => a.currentNum - b.currentNum);
      case 'price_desc': return [...list].sort((a, b) => b.currentNum - a.currentNum);
      default: return list;
    }
  }, [saleProducts, sortBy, categoryFilter]);

  const totalSavings = saleProducts.reduce((acc, p) => acc + p.savedAmount, 0);
  const maxSaved = saleProducts.length > 0 ? Math.max(...saleProducts.map((p) => p.savedAmount)) : 0;

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-rose-700 py-16 md:py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rose-600/50"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-rose-800/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
          {/* Flash sale badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-6">
            <i className="ri-fire-line text-yellow-300 text-sm"></i>
            <span className="text-white text-xs font-bold tracking-widest uppercase">Flash Sale — Limited Time</span>
            <i className="ri-fire-line text-yellow-300 text-sm"></i>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Up to <span className="text-yellow-300">30% OFF</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Premium human hair wigs, extensions &amp; bundles — luxury quality at prices you&apos;ll love. Don&apos;t miss out!
          </p>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Sale ends in</p>
            <SaleCountdown />
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { icon: 'ri-price-tag-3-line', label: `${saleProducts.length} items on sale` },
              { icon: 'ri-money-dollar-circle-line', label: `Save up to ${formatPrice(maxSaved)}` },
              { icon: 'ri-truck-line', label: 'Free shipping over GHS 800' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-white/80 text-sm">
                <i className={`${s.icon} text-yellow-300 text-base`}></i>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="py-14 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Filter + sort bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-rose-700 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm text-stone-400 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border border-stone-200 rounded-full px-4 py-1.5 text-stone-700 bg-white cursor-pointer focus:outline-none focus:border-rose-300"
              >
                <option value="savings_desc">Biggest Savings First</option>
                <option value="pct_desc">Highest % Off First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-stone-400 mb-6">
            <strong className="text-stone-700">{filtered.length}</strong> sale items
            {categoryFilter !== 'All' && <span> in <strong className="text-stone-700">{categoryFilter}</strong></span>}
          </p>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <i className="ri-price-tag-3-line text-5xl mb-4 block"></i>
              <p className="text-base">No sale items in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-2xl overflow-hidden border border-stone-100 bg-[#FAFAFA] hover:-translate-y-1 transition-all duration-300 cursor-pointer block relative"
                >
                  {/* Savings badge — top right */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                    <span className="bg-rose-700 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                      -{product.savedPct}% OFF
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative w-full overflow-hidden bg-stone-50" style={{ height: 240 }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Savings ribbon */}
                    <div className="absolute bottom-0 left-0 right-0 bg-rose-700/90 backdrop-blur-sm py-2 px-3 flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">You save</span>
                      <span className="text-yellow-300 text-sm font-extrabold">{formatPrice(product.savedAmount)}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <span className="text-xs text-rose-600 font-semibold uppercase tracking-wide">{product.category}</span>
                    <h3 className="font-semibold text-stone-900 text-sm mt-1 mb-2 leading-snug">{product.name}</h3>

                    {/* Price comparison */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {formatPrice(product.currentNum)}
                      </span>
                      <span className="text-sm text-stone-400 line-through">{formatPrice(product.originalNum)}</span>
                    </div>

                    {/* Savings highlight bar */}
                    <div className="bg-rose-50 border border-rose-100 rounded-xl px-3 py-2 flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <i className="ri-coupon-3-line text-rose-600 text-sm"></i>
                        <span className="text-rose-700 text-xs font-semibold">Flash Sale Price</span>
                      </div>
                      <span className="text-rose-700 text-xs font-bold">Save {product.savedPct}%</span>
                    </div>

                    {/* Lengths */}
                    {product.lengths.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.lengths.slice(0, 4).map((l) => (
                          <span key={l} className="text-xs border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full">{l}</span>
                        ))}
                        {product.lengths.length > 4 && (
                          <span className="text-xs border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full">+{product.lengths.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Rating + reviews */}
                    {product.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`text-xs ${i < Math.floor(product.rating) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-stone-300'}`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-xs text-stone-500">{product.rating}</span>
                        <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
                      </div>
                    )}

                    {/* Stock status */}
                    {product.stock !== undefined && product.stock <= 5 && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <i className="ri-fire-line text-rose-500 text-xs"></i>
                        <span className="text-rose-600 text-xs font-semibold">
                          {product.stock <= 3 ? 'Almost Gone!' : 'Low Stock'}
                        </span>
                        <span className="text-stone-400 text-xs">— {product.stock} left</span>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="bg-stone-900 text-white font-semibold text-sm py-2.5 rounded-xl text-center hover:bg-rose-700 transition-colors">
                      Grab This Deal
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="py-16 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden bg-stone-200 h-[320px] sm:h-[400px]">
              <img
                src="https://readdy.ai/api/search-image?query=luxury%20hair%20bundle%20set%20flat%20lay%20on%20marble%20surface%2C%20multiple%20bundles%20of%20human%20hair%20with%20lace%20closure%2C%20warm%20golden%20lighting%2C%20soft%20cream%20and%20rose%20gold%20accents%2C%20premium%20product%20photography%20for%20beauty%20brand%2C%20elegant%20and%20aspirational%20mood%2C%20high-end%20packaging%20elements%20visible&width=800&height=500&seq=sale_bundle_02&orientation=landscape"
                alt="Bundle deals"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Bigger Savings</span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Bundle Deals<br />
                <span className="italic font-light">Save Even More</span>
              </h2>
              <p className="text-stone-500 text-base leading-relaxed mb-6 max-w-md">
                Buy a full set and save extra. Our bundle deals include 3 bundles + a closure at unbeatable prices.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: 'ri-check-line', text: '3 bundles + closure = extra 10% off' },
                  { icon: 'ri-check-line', text: 'Free express delivery on bundles' },
                  { icon: 'ri-check-line', text: 'Mix textures within same bundle deal' },
                  { icon: 'ri-check-line', text: 'All 100% virgin human hair' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0">
                      <i className={`${item.icon} text-xs`}></i>
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCategoryFilter('Bundles')}
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-shopping-bag-line"></i>
                  View Bundle Deals
                </button>
                <a
                  href="https://wa.me/233547149360?text=Hi! I'm interested in your bundle deals. Can you help me choose?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-stone-200 hover:border-emerald-300 text-stone-700 hover:text-emerald-600 font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-whatsapp-line text-emerald-600"></i>
                  Ask About Bundles
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop Now */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Shop the Sale?
            </h2>
            <p className="text-stone-500 text-base max-w-md mx-auto">
              These deals will not last. Here is why you should grab yours today.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-fire-line', title: 'Limited Stock', desc: 'Once they are gone, they are gone. Many items have only 3-5 left.' },
              { icon: 'ri-truck-line', title: 'Free Shipping', desc: 'Orders over GHS 800 ship free anywhere in Ghana.' },
              { icon: 'ri-shield-check-line', title: 'Authentic Quality', desc: 'Every item is 100% human hair, ethically sourced and verified.' },
              { icon: 'ri-whatsapp-line', title: 'WhatsApp Support', desc: 'Need help? Message us and get a real reply in minutes.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#FDF9F7] rounded-2xl p-6 border border-stone-100 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 mx-auto mb-4">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-2">{item.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#FDF9F7]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-stone-100">
            <i className="ri-whatsapp-line text-4xl text-emerald-600 mb-4 block"></i>
            <h3 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Want a custom bundle deal?
            </h3>
            <p className="text-stone-500 text-base mb-6 max-w-md mx-auto">
              Chat with us on WhatsApp and we will put together the best deal for your budget. Custom orders always welcome!
            </p>
            <a
              href="https://wa.me/233547149360?text=Hi! I saw the sale and I would love to get a custom bundle deal."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              Chat for a Custom Deal
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
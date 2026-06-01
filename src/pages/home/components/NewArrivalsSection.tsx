import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCurrencyContext } from '@/hooks/CurrencyContext';
import { defaultProducts } from '@/mocks/products';

// Seeded stock levels per product id — feels real, stays consistent
const STOCK_LEVELS: Record<string, { left: number; total: number }> = {
  '2':  { left: 4, total: 20 },
  '9':  { left: 6, total: 25 },
  '11': { left: 3, total: 15 },
  '13': { left: 7, total: 20 },
};

function StockBar({ productId }: { productId: string }) {
  const stock = STOCK_LEVELS[productId];
  if (!stock) return null;
  const pct = Math.round((stock.left / stock.total) * 100);
  const isLow = stock.left <= 5;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-semibold ${isLow ? 'text-rose-600' : 'text-stone-500'}`}>
          {isLow ? (
            <><i className="ri-fire-line mr-1"></i>Only {stock.left} left!</>
          ) : (
            `${stock.left} in stock`
          )}
        </span>
        <span className="text-xs text-stone-400">{pct}% remaining</span>
      </div>
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function NewArrivalsSection() {
  const { formatPrice } = useCurrencyContext();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const newArrivals = defaultProducts.filter((p) => p.badge === 'New In');

  const scrollTo = (idx: number) => {
    setActiveIdx(idx);
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll('[data-card]');
      cards[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700">Just Dropped</span>
              <span className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse inline-block"></span>
                New Arrivals
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fresh Styles,<br />
              <span className="italic font-light">Just for You</span>
            </h2>
            <p className="text-stone-500 text-base mt-4 max-w-md">
              Our latest additions — handpicked styles that are flying off the shelves. Get yours before they sell out.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border border-stone-200 hover:border-rose-400 text-stone-700 hover:text-rose-700 font-semibold px-7 py-3 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            View All Products
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Scrollable card grid */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product, idx) => {
            const isLowStock = STOCK_LEVELS[product.id]?.left ?? 99;
            const isActive = activeIdx === idx;
            return (
              <div
                key={product.id}
                data-card
                className={`flex-shrink-0 snap-center w-[280px] sm:w-[320px] bg-white border border-stone-100 rounded-2xl overflow-hidden transition-all cursor-pointer ${isActive ? 'ring-2 ring-rose-300' : ''}`}
                onClick={() => scrollTo(idx)}
              >
                {/* Image */}
                <div className="relative h-[340px] sm:h-[380px] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors cursor-pointer">
                      <i className="ri-heart-line text-sm"></i>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors cursor-pointer">
                      <i className="ri-eye-line text-sm"></i>
                    </button>
                  </div>
                  {/* Sale badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="absolute bottom-4 left-4 bg-stone-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-semibold text-stone-900 text-sm mt-1 mb-2 leading-snug line-clamp-2">{product.name}</h3>

                  {/* Stock bar */}
                  <StockBar productId={product.id} />

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-stone-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-stone-400 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`text-xs ${i < Math.floor(product.rating ?? 0) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-stone-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xs text-stone-500">{product.rating}</span>
                    <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full text-center bg-stone-900 hover:bg-rose-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Quick Shop
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {newArrivals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeIdx === idx ? 'bg-rose-600' : 'bg-stone-200'}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useNavigate } from 'react-router-dom';
import { useCurrencyContext } from '@/hooks/CurrencyContext';

interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  originalPrice?: string;
  category: string;
  badge?: string;
  lengths: string[];
  image?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
}

const STOCK_LEVELS: Record<string, { left: number; total: number }> = {
  '2': { left: 4, total: 20 },
  '9': { left: 6, total: 25 },
  '11': { left: 3, total: 15 },
  '13': { left: 7, total: 20 },
};

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '').replace(',', '')) || 0;
}

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { formatPrice } = useCurrencyContext();
  const priceNum = parsePrice(product.price);
  const originalPriceNum = product.originalPrice ? parsePrice(product.originalPrice) : undefined;
  const stock = STOCK_LEVELS[product.id];
  const isLow = stock ? stock.left <= 5 : false;

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-rose-200 transition-colors group cursor-pointer">
      {/* Image */}
      <div className="relative h-[280px] sm:h-[300px] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors cursor-pointer">
            <i className="ri-heart-line text-sm"></i>
          </button>
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <i className="ri-eye-line text-sm"></i>
          </button>
        </div>
        {/* Sale badge */}
        {originalPriceNum && originalPriceNum > priceNum && (
          <span className="absolute bottom-4 left-4 bg-stone-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{Math.round((1 - priceNum / originalPriceNum) * 100)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">{product.category}</span>
        <h3 className="font-semibold text-stone-900 text-sm mt-1 mb-2 leading-snug line-clamp-2">{product.name}</h3>

        {/* Stock bar */}
        {stock && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold ${isLow ? 'text-rose-600' : 'text-stone-500'}`}>
                {isLow ? (
                  <><i className="ri-fire-line mr-1"></i>Only {stock.left} left!</>
                ) : (
                  `${stock.left} in stock`
                )}
              </span>
              <span className="text-xs text-stone-400">{Math.round((stock.left / stock.total) * 100)}% remaining</span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.round((stock.left / stock.total) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-stone-900">{formatPrice(priceNum)}</span>
          {originalPriceNum && originalPriceNum > priceNum && (
            <span className="text-sm text-stone-400 line-through">{formatPrice(originalPriceNum)}</span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
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
        )}

        {/* CTA */}
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="block w-full text-center bg-stone-900 hover:bg-rose-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
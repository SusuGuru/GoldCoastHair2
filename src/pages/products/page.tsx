import { useState, useMemo } from 'react';
import PageLayout from '@/components/feature/PageLayout';
import ProductCard from './components/ProductCard';
import BundleSection from './components/BundleSection';
import FilterBar, { FilterState } from './components/FilterBar';
import { useProducts } from '@/hooks/useProducts';

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  hairType: 'all',
  length: 'all',
  priceRange: 'all',
  sortBy: 'featured',
};

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '').replace(',', '')) || 0;
}

function matchesHairType(name: string, desc: string, hairType: string): boolean {
  if (hairType === 'all') return true;
  const text = `${name} ${desc}`.toLowerCase();
  return text.includes(hairType.toLowerCase());
}

function matchesLength(lengths: string[], lengthFilter: string): boolean {
  if (lengthFilter === 'all') return true;
  if (lengths.length === 0) return true;
  const nums = lengths.map((l) => parseInt(l.replace(/[^0-9]/g, ''), 10)).filter(Boolean);
  if (nums.length === 0) return true;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  switch (lengthFilter) {
    case 'short': return min <= 14;
    case 'medium': return nums.some((n) => n >= 16 && n <= 18);
    case 'long': return nums.some((n) => n >= 20 && n <= 22);
    case 'xllong': return max >= 24;
    default: return true;
  }
}

function matchesPriceRange(price: string, range: string): boolean {
  if (range === 'all') return true;
  const p = parsePrice(price);
  switch (range) {
    case 'under500': return p < 500;
    case '500-900': return p >= 500 && p <= 900;
    case '900-1200': return p > 900 && p <= 1200;
    case 'over1200': return p > 1200;
    default: return true;
  }
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const { products } = useProducts();

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (!matchesHairType(p.name, p.desc, filters.hairType)) return false;
      if (!matchesLength(p.lengths, filters.length)) return false;
      if (!matchesPriceRange(p.price, filters.priceRange)) return false;
      return true;
    });

    switch (filters.sortBy) {
      case 'price_asc':
        result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price_desc':
        result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'newest':
        result = [...result].filter((p) => p.badge === 'New In').concat(
          result.filter((p) => p.badge !== 'New In')
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  return (
    <PageLayout>
      <section className="py-16 bg-white min-h-screen" data-product-shop>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">The Collection</span>
            <h1
              className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop Our Products
            </h1>
            <p className="text-stone-500 text-base max-w-md mx-auto">
              100% human hair wigs, extensions &amp; bundles — luxury quality, prices you'll love.
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar filters={filters} onChange={setFilters} totalCount={filtered.length} />

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <i className="ri-search-line text-5xl mb-4 block"></i>
              <p className="text-base font-medium text-stone-500 mb-2">No products match your filters</p>
              <p className="text-sm text-stone-400 mb-6">Try adjusting or clearing your filters to see more results.</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="inline-flex items-center gap-2 bg-rose-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full cursor-pointer whitespace-nowrap hover:bg-rose-800 transition-colors"
              >
                <i className="ri-refresh-line"></i>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BundleSection />
    </PageLayout>
  );
}
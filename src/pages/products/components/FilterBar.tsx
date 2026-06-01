export interface FilterState {
  category: string;
  hairType: string;
  length: string;
  priceRange: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
}

const CATEGORIES = ['All', 'Wigs', 'Bundles', 'Extensions'];

const HAIR_TYPES = [
  { value: 'all', label: 'All Hair Types' },
  { value: 'straight', label: 'Straight' },
  { value: 'body wave', label: 'Body Wave' },
  { value: 'curly', label: 'Curly' },
  { value: 'kinky', label: 'Kinky' },
  { value: 'loose wave', label: 'Loose Wave' },
];

const LENGTHS = [
  { value: 'all', label: 'All Lengths' },
  { value: 'short', label: 'Short (≤14")' },
  { value: 'medium', label: 'Medium (16–18")' },
  { value: 'long', label: 'Long (20–22")' },
  { value: 'xllong', label: 'Extra Long (24"+)' },
];

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: 'under500', label: 'Under $500' },
  { value: '500-900', label: '$500 – $900' },
  { value: '900-1200', label: '$900 – $1200' },
  { value: 'over1200', label: 'Over $1200' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export default function FilterBar({ filters, onChange, totalCount }: FilterBarProps) {
  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="mb-10">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => update('category', cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filters.category === cat
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dropdown filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <select
            value={filters.hairType}
            onChange={(e) => update('hairType', e.target.value)}
            className="appearance-none bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-full px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-rose-400"
          >
            {HAIR_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={filters.length}
            onChange={(e) => update('length', e.target.value)}
            className="appearance-none bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-full px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-rose-400"
          >
            {LENGTHS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={filters.priceRange}
            onChange={(e) => update('priceRange', e.target.value)}
            className="appearance-none bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-full px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-rose-400"
          >
            {PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none"></i>
        </div>

        <div className="relative ml-auto">
          <select
            value={filters.sortBy}
            onChange={(e) => update('sortBy', e.target.value)}
            className="appearance-none bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-full px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:border-rose-400"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none"></i>
        </div>

        <span className="text-xs text-stone-400 whitespace-nowrap">
          {totalCount} result{totalCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
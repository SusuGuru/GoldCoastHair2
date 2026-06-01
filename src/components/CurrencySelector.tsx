import { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES } from '@/hooks/useCurrency';

export default function CurrencySelector() {
  const { currency, setCurrency, isLoading } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-700 transition-colors cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full border border-stone-200 hover:border-rose-300 bg-white"
      >
        <span>{currency.flag}</span>
        <span>{currency.code}</span>
        {isLoading && <i className="ri-loader-4-line animate-spin text-xs text-stone-400"></i>}
        <i className={`ri-arrow-down-s-line text-sm transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-stone-100 overflow-hidden z-50 shadow-lg">
          <div className="px-4 py-3 border-b border-stone-50">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Select Currency</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                onClick={() => { setCurrency(c.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer text-left ${
                  currency.code === c.code
                    ? 'bg-rose-50 text-rose-700 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs font-bold text-stone-400">{c.code}</span>
                {currency.code === c.code && <i className="ri-check-line text-rose-600 text-sm"></i>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
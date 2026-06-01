import { useNavigate } from 'react-router-dom';
import { useBundles } from '@/hooks/useBundles';
import { useCurrencyContext } from '@/hooks/CurrencyContext';

export default function BundleSection() {
  const navigate = useNavigate();
  const { bundles, loading } = useBundles();
  const { formatPrice } = useCurrencyContext();

  if (loading) {
    return (
      <section className="py-20 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-stone-500">
              <i className="ri-loader-4-line animate-spin text-lg"></i>
              <span className="text-sm">Loading bundle deals...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Bundle Deals</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Save More with Bundles
          </h2>
          <p className="text-stone-500 text-base max-w-md mx-auto">
            Get complete looks at a fraction of the price. Our bundles come with everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => {
            const discount = Math.round((1 - bundle.price / bundle.originalPrice) * 100);
            return (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-rose-200 transition-colors cursor-pointer"
                onClick={() => navigate('/products')}
              >
                <div className="relative h-[240px] overflow-hidden bg-stone-100">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {bundle.badge}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-stone-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{discount}%
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-stone-900 text-sm mb-1">{bundle.name}</h3>
                  <p className="text-xs text-stone-500 mb-3">{bundle.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-stone-900">{formatPrice(bundle.price)}</span>
                    <span className="text-sm text-stone-400 line-through">{formatPrice(bundle.originalPrice)}</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                      Save {formatPrice(bundle.originalPrice - bundle.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
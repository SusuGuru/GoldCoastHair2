import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { trackOrder } from '@/services/api';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  productName: string;
  price: string;
  qty: number;
  length?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  total: string;
  date: string;
  estimatedDelivery?: string;
  address: string;
  notes?: string;
}

const statusSteps: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const statusMeta: Record<OrderStatus, { label: string; icon: string; desc: string; color: string; bg: string }> = {
  pending: {
    label: 'Order Received',
    icon: 'ri-time-line',
    desc: "We've received your order and are reviewing it.",
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  confirmed: {
    label: 'Order Confirmed',
    icon: 'ri-checkbox-circle-line',
    desc: 'Your order has been confirmed and payment verified.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  processing: {
    label: 'Being Prepared',
    icon: 'ri-scissors-line',
    desc: 'Your hair is being carefully prepared and packaged.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  shipped: {
    label: 'On Its Way',
    icon: 'ri-truck-line',
    desc: 'Your order has been dispatched and is on its way to you!',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  delivered: {
    label: 'Delivered',
    icon: 'ri-gift-line',
    desc: 'Your order has been delivered. Enjoy your new hair!',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  cancelled: {
    label: 'Cancelled',
    icon: 'ri-close-circle-line',
    desc: 'This order has been cancelled. Contact us on WhatsApp for help.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
};

const statusBg: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-teal-100 text-teal-700',
  processing: 'bg-rose-100 text-rose-700',
  shipped: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
};

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('id') || '';
  
  const [query, setQuery] = useState(initialOrderId);
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<Order | null | 'not_found'>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auto-track if order ID is passed in URL
  useEffect(() => {
    if (initialOrderId) {
      // Pre-fill the order number but still require phone for security
      setQuery(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await trackOrder(query.trim());
      if (data && data.orderNumber) {
        // Verify phone match if API returns order
        const orderPhone = data.customerPhone || '';
        if (orderPhone.replace(/\s+/g, '').includes(phone.replace(/\s+/g, '').slice(-6))) {
          setResult(data as Order);
        } else {
          setResult('not_found');
        }
      } else {
        setResult('not_found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order');
      setResult('not_found');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const reset = () => {
    setQuery('');
    setPhone('');
    setResult(null);
    setSearched(false);
    setError('');
  };

  const currentStepIndex =
    result && result !== 'not_found' && result.status !== 'cancelled'
      ? statusSteps.indexOf(result.status)
      : -1;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-stone-900 pt-16 pb-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #be123c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #be123c 0%, transparent 40%)',
          }}
        ></div>
        <div className="relative max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-rose-900/50 text-rose-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <i className="ri-map-pin-line"></i>
            Order Tracking
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where's My Order?
          </h1>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed">
            Enter your order number and phone number to see your delivery status in real time.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        {/* Search Form */}
        {!searched && (
          <div className="bg-white rounded-3xl border border-stone-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <i className="ri-search-line text-xl"></i>
              </div>
              <div>
                <h2 className="font-bold text-stone-900 text-lg">Track Your Order</h2>
                <p className="text-stone-400 text-sm">Your order number was sent via WhatsApp</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSearch} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. GCH-240612-001"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-rose-300 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +233 24 567 8901"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                />
                <p className="text-xs text-stone-400 mt-1.5">Use the phone number you ordered with</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <><i className="ri-loader-4-line animate-spin"></i> Tracking...</>
                ) : (
                  <><i className="ri-search-line"></i> Track My Order</>
                )}
              </button>
            </form>

            {/* Help hint */}
            <div className="mt-6 flex items-start gap-3 bg-stone-50 rounded-2xl p-4">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-information-line text-stone-400 text-sm"></i>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Your order number looks like <strong className="text-stone-700">GCH-2025-001</strong> and was sent to you on WhatsApp when your order was placed. Can't find it?{' '}
                <a
                  href="https://wa.me/233547149360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer"
                >
                  Message us on WhatsApp
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Not Found */}
        {searched && result === 'not_found' && (
          <div className="bg-white rounded-3xl border border-stone-100 p-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-red-400 mx-auto mb-5">
              <i className="ri-search-line text-2xl"></i>
            </div>
            <h2 className="font-bold text-stone-900 text-xl mb-2">Order Not Found</h2>
            <p className="text-stone-500 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
              We couldn't find an order matching that number and phone. Double-check the details or contact us for help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-semibold px-6 py-2.5 rounded-full cursor-pointer whitespace-nowrap text-sm hover:bg-stone-50 transition-colors"
              >
                <i className="ri-arrow-left-line"></i>
                Try Again
              </button>
              <a
                href="https://wa.me/233547149360"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-full cursor-pointer whitespace-nowrap text-sm transition-colors"
              >
                <i className="ri-whatsapp-line"></i>
                WhatsApp Us
              </a>
            </div>
          </div>
        )}

        {/* Order Found */}
        {searched && result !== 'not_found' && result && (
          <div className="flex flex-col gap-5">
            {/* Order Card */}
            <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden">
              {/* Header */}
              <div className="bg-stone-900 px-6 py-5 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-1">Order Number</p>
                  <p className="text-white font-bold text-lg">{result.orderNumber}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${statusBg[result.status]}`}>
                  {statusMeta[result.status].label}
                </span>
              </div>

              {/* Progress Tracker */}
              {result.status !== 'cancelled' && (
                <div className="px-6 py-7 border-b border-stone-100">
                  <div className="flex items-start justify-between relative">
                    {/* Progress line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-100 mx-5"></div>
                    <div
                      className="absolute top-5 left-0 h-0.5 bg-rose-500 transition-all"
                      style={{
                        width: `calc(${Math.max(0, currentStepIndex) / (statusSteps.length - 1)} * (100% - 40px))`,
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    ></div>
                    {statusSteps.map((step, idx) => {
                      const isDone = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div key={step} className="relative flex flex-col items-center z-10" style={{ width: '20%' }}>
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                              isDone
                                ? 'bg-rose-700 border-rose-700 text-white'
                                : 'bg-white border-stone-200 text-stone-300'
                            } ${isCurrent ? 'ring-4 ring-rose-100' : ''}`}
                          >
                            <i className={`${statusMeta[step].icon} text-sm`}></i>
                          </div>
                          <span className={`text-[10px] font-semibold uppercase tracking-wide mt-2 text-center leading-tight ${isDone ? 'text-stone-700' : 'text-stone-300'}`}>
                            {statusMeta[step].label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cancelled banner */}
              {result.status === 'cancelled' && (
                <div className="px-6 py-5 border-b border-stone-100">
                  <div className="flex items-center gap-3 bg-red-50 rounded-2xl p-4">
                    <i className="ri-close-circle-line text-red-500 text-xl"></i>
                    <div>
                      <p className="text-red-700 text-sm font-semibold">Order Cancelled</p>
                      <p className="text-red-600 text-xs mt-0.5">This order has been cancelled. Contact us on WhatsApp for assistance.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Details */}
              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Items */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">Your Items</p>
                  <div className="flex flex-col gap-2">
                    {result.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-stone-800">{item.productName}</p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {item.length && item.length !== '-' ? item.length : ''}
                            {item.color && item.color !== '-' ? ` · ${item.color}` : ''}
                            {` · Qty: ${item.qty}`}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-stone-900">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary row */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                  <div>
                    <p className="text-xs text-stone-400">Order Date</p>
                    <p className="text-sm font-semibold text-stone-700">{new Date(result.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-400">Order Total</p>
                    <p className="text-lg font-bold text-stone-900">{result.total}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-semibold py-3 rounded-full cursor-pointer whitespace-nowrap text-sm hover:bg-stone-50 transition-colors"
              >
                <i className="ri-search-line"></i>
                Track Another Order
              </button>
              <a
                href="https://wa.me/233547149360"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-full cursor-pointer whitespace-nowrap text-sm transition-colors"
              >
                <i className="ri-whatsapp-line"></i>
                Need Help? Chat With Us
              </a>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
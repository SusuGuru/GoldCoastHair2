import { useState, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('productName') || '';
  const price = searchParams.get('price') || '';
  const preLength = searchParams.get('length') || '';
  const preColor = searchParams.get('color') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement)?.value || '';
    if (notes.length > 500) return;

    setLoading(true);
    const formData = new FormData(form);
    const data = new URLSearchParams(formData as unknown as Record<string, string>);
    try {
      await fetch('https://readdy.ai/api/form/d8etm9fejtnocflsnmh0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      
      // Send email notification to business owner
      const formName = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
      const formEmail = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
      const formPhone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
      const formAddress = (form.elements.namedItem('address') as HTMLTextAreaElement)?.value || '';
      const formNotes = (form.elements.namedItem('notes') as HTMLTextAreaElement)?.value || '';
      
      try {
        await fetch('https://42ay9uqe0d0xm1q3tqy6.helloreaddy.com/functions/v1/order-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: 'DIRECT-' + Date.now(),
            orderNumber: 'DIRECT-' + Date.now(),
            customer: {
              name: formName,
              email: formEmail,
              phone: formPhone,
              address: formAddress,
            },
            items: [{
              name: productName || 'Direct Order',
              quantity: 1,
              price: price || '',
            }],
            total: price || '',
            notes: formNotes,
          }),
        });
      } catch {
        // Notification is best-effort
      }
      
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <PageLayout>
        <section className="min-h-[80vh] flex items-center justify-center py-16 bg-[#FDF9F7]">
          <div className="max-w-md w-full mx-auto px-6 text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-rose-100 text-rose-700 mx-auto mb-6">
              <i className="ri-check-double-line text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order Received!
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-4">
              Your order for <strong className="text-stone-800">{productName}</strong> has been sent to us. We&apos;ll confirm your order and get back to you within 24 hours.
            </p>
            <div className="bg-white rounded-2xl border border-stone-100 p-5 mb-8 text-left flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0">
                  <i className="ri-mail-line text-base"></i>
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Confirmation sent to</p>
                  <p className="text-sm text-stone-700 font-semibold">hello@goldcoasthair.com.au</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <i className="ri-whatsapp-line text-base"></i>
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Or reach us directly</p>
                  <p className="text-sm text-stone-700 font-semibold">0547149360</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/233547149360"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line"></i>
                Follow Up on WhatsApp
              </a>
              <Link
                to="/products"
                className="w-full border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
              >
                <i className="ri-arrow-left-line"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-16 bg-[#FDF9F7] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-rose-700 transition-colors mb-8 cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            Back to Products
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Place Your Order</span>
            <h1
              className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {productName || 'Order Your Hair'}
            </h1>
            {price && (
              <p className="text-xl font-semibold text-rose-700 mt-2">
                {price}
              </p>
            )}
            {(preLength || preColor) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {preLength && (
                  <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                    Length: {preLength}
                  </span>
                )}
                {preColor && (
                  <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                    Color: {preColor}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8">
            <form
              id="order-form"
              data-readdy-form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Hidden product info */}
              <input type="hidden" name="product" value={productName} />
              <input type="hidden" name="price" value={price} />
              <input type="hidden" name="length" value={preLength} />
              <input type="hidden" name="color" value={preColor} />

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Email <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="0547149360"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Delivery Address <span className="text-rose-600">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  placeholder="Street, City, State, Country"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Notes
                  <span className="text-stone-400 font-normal text-xs ml-1">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={500}
                  placeholder="Any special requests, questions about the product, or preferred delivery time..."
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                ></textarea>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${charCount > 500 ? 'text-red-500' : 'text-stone-400'}`}>
                    {charCount}/500
                  </span>
                  {charCount > 500 && (
                    <span className="text-red-500 text-xs">Notes cannot exceed 500 characters.</span>
                  )}
                </div>
              </div>

              {/* Contact note */}
              <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
                <i className="ri-information-line text-rose-600 text-base mt-0.5 flex-shrink-0"></i>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Your order will be sent to <strong>hello@goldcoasthair.com.au</strong>. We&apos;ll confirm via email or WhatsApp at <strong>0547149360</strong> within 24 hours.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || charCount > 500}
                className="w-full bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-semibold py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-base mt-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><i className="ri-loader-4-line animate-spin"></i> Sending Order...</>
                ) : (
                  <><i className="ri-send-plane-line"></i> Confirm Order</>
                )}
              </button>
            </form>
          </div>

          {/* WhatsApp alternative */}
          <div className="text-center mt-6">
            <p className="text-stone-400 text-sm mb-3">Prefer to order directly?</p>
            <a
              href={`https://wa.me/233547149360?text=Hi! I'd like to order: ${encodeURIComponent(productName)} ${preLength ? `(${preLength})` : ''} ${preColor ? `- ${preColor}` : ''} at ${price}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              <i className="ri-whatsapp-line text-base"></i>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
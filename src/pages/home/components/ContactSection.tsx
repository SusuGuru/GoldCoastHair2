import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    if (message.length > 500) return;

    setLoading(true);
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    try {
      await fetch('https://readdy.ai/api/form/d7oc7chus6nbnotnonhg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">Order &amp; Enquiries</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Get<br />
              <span className="italic font-light">Your Dream Hair?</span>
            </h2>
            <p className="text-stone-600 text-base leading-relaxed mb-10">
              Send us a message to place your order, ask about a product, or get personalised hair advice. We respond within 24 hours.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-5 mb-10">
              {[
                { icon: 'ri-instagram-line', label: 'Instagram', value: '@goldcoasthair' },
                { icon: 'ri-tiktok-line', label: 'TikTok', value: '@goldcoasthair' },
                { icon: 'ri-mail-line', label: 'Email', value: 'hello@goldcoasthair.com.au' },
                { icon: 'ri-time-line', label: 'Response Time', value: 'Within 24 hours · Mon–Sat' },
                { icon: 'ri-truck-line', label: 'Shipping', value: 'Australia-wide · Online orders only' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-100 text-rose-700 flex-shrink-0">
                    <i className={`${item.icon} text-base`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-stone-700 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand image */}
            <div className="rounded-2xl overflow-hidden h-52 w-full">
              <img
                src="https://readdy.ai/api/search-image?query=luxury%20hair%20products%20flat%20lay%2C%20wigs%20and%20hair%20extensions%20beautifully%20arranged%2C%20elegant%20packaging%2C%20warm%20cream%20and%20gold%20tones%2C%20professional%20product%20photography%2C%20premium%20beauty%20brand%20aesthetic%2C%20clean%20and%20sophisticated&width=700&height=400&seq=contact_img01&orientation=landscape"
                alt="Gold Coast Hair products"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 border border-stone-100">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <i className="ri-check-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-stone-900">Message Received!</h3>
                <p className="text-stone-500 text-sm max-w-xs">
                  Thanks for reaching out! We&apos;ll get back to you within 24 hours with all the details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-rose-700 text-sm font-medium underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-stone-900 mb-6">Place an Order / Enquire</h3>
                <form
                  data-readdy-form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        placeholder="Jane"
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        placeholder="Doe"
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@email.com"
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="0400 000 000"
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Order enquiry, Product question, etc."
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5 block">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={500}
                      placeholder="Tell us what you're looking for — length, texture, colour, budget..."
                      onChange={(e) => setCharCount(e.target.value.length)}
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                    ></textarea>
                    {charCount > 500 && (
                      <p className="text-red-500 text-xs mt-1">Message cannot exceed 500 characters.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading || charCount > 500}
                    className="w-full bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm mt-2"
                  >
                    {loading ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
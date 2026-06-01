import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from "@/components/feature/PageLayout";

const contactMethods = [
  {
    icon: "ri-whatsapp-line",
    color: "bg-emerald-50 text-emerald-600",
    hoverColor: "hover:bg-emerald-100",
    title: "WhatsApp",
    value: "+233 547 149 360",
    action: "Chat Now",
    href: "https://wa.me/233547149360",
  },
  {
    icon: "ri-mail-line",
    color: "bg-rose-50 text-rose-600",
    hoverColor: "hover:bg-rose-100",
    title: "Email",
    value: "hello@goldcoasthair.com",
    action: "Send Email",
    href: "mailto:hello@goldcoasthair.com",
  },
  {
    icon: "ri-phone-line",
    color: "bg-stone-100 text-stone-600",
    hoverColor: "hover:bg-stone-200",
    title: "Phone",
    value: "0547149360",
    action: "Call Now",
    href: "tel:+233547149360",
  },
];

export default function ContactPage() {
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
      await fetch('https://readdy.ai/api/form/d8eu1heuf4jvh7ti3k1g', {
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
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[480px] md:min-h-[540px] flex items-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20warm%20texture%20background%20with%20soft%20flowing%20organic%20shapes%2C%20golden%20and%20cream%20tones%2C%20silk%20fabric%20texture%2C%20warm%20neutral%20palette%2C%20soft%20diffused%20lighting%2C%20elegant%20and%20luxurious%20feel%2C%20premium%20beauty%20brand%20aesthetic%2C%20no%20text%20no%20logos%2C%20subtle%20and%20minimal&width=1920&height=1080&seq=contact_bg_2026&orientation=landscape"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-800/30 to-stone-700/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">
            Get in Touch
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We&apos;d Love to
            <br />
            <span className="italic font-light">Hear From You</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
            Have a question about our products, shipping, or just want to say hello? Our team is here and ready to help.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line" />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:hello@goldcoasthair.com"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line" />
              Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">
              Reach Us
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Information
            </h2>
            <p className="text-stone-500 text-base max-w-lg mx-auto">
              Multiple ways to reach us. Pick the one that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`bg-white rounded-2xl p-6 border border-stone-100 transition-all group cursor-pointer`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-colors ${method.color} ${method.hoverColor}`}
                >
                  <i className={`${method.icon} text-xl`} />
                </div>
                <h3 className="font-semibold text-stone-900 text-base mb-1">
                  {method.title}
                </h3>
                <p className="text-stone-600 text-sm mb-4">{method.value}</p>
                <span className="inline-flex items-center gap-1 text-rose-700 text-sm font-semibold group-hover:gap-2 transition-all">
                  {method.action}
                  <i className="ri-arrow-right-line text-xs" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section — Same as Home Page ContactSection */}
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

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20luxurious%20long%20flowing%20hair%20looking%20at%20camera%2C%20warm%20smile%2C%20elegant%20fashion%20portrait%2C%20soft%20golden%20lighting%2C%20cream%20and%20rose%20gold%20tones%2C%20beauty%20editorial%20photography%2C%20confident%20and%20welcoming%20expression%2C%20premium%20aesthetic%2C%20warm%20neutral%20background%2C%20no%20text%20or%20logos"
          alt="Shop Gold Coast Hair"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">
            Ready to Shop?
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Perfect
            <br />
            <span className="italic font-light">Wig Today</span>
          </h2>
          <p className="text-white/80 text-base mb-10 leading-relaxed">
            Browse our full collection of 100% human hair wigs, extensions, and bundles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line" />
              Shop the Collection
            </Link>
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
            >
              <i className="ri-whatsapp-line text-emerald-400" />
              Chat with Us
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
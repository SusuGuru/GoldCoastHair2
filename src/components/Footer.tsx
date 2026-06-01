import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2d1a0e] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-xl font-bold tracking-tight mb-4 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gold Coast Hair
            </h3>
            <p className="text-[#d4b8a0] text-sm leading-relaxed mb-6">
              Luxury wigs, extensions &amp; bundles made from 100% human hair. Affordable prices, premium quality — always.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'ri-instagram-line', label: 'Instagram', href: 'https://www.instagram.com/goldcoasthair' },
                { icon: 'ri-tiktok-line', label: 'TikTok', href: 'https://www.tiktok.com/@goldcoasthair' },
                { icon: 'ri-facebook-line', label: 'Facebook', href: 'https://www.facebook.com/goldcoasthair' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3d2a1e] hover:bg-rose-700 text-[#d4b8a0] hover:text-white transition-colors cursor-pointer"
                >
                  <i className={`${s.icon} text-base`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#e8c9a0] mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Shop', path: '/products' },
                { label: 'Customer Looks', path: '/portfolio' },
                { label: 'Reviews', path: '/reviews' },
                { label: 'Hair Care Guide', path: '/hair-care' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact', path: '/contact' },
                { label: 'Track My Order', path: '/track' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#d4b8a0] hover:text-rose-400 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#e8c9a0] mb-5">
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {['Lace Front Wigs', 'Clip-In Extensions', 'Hair Bundles', 'Bundle Deals', 'New Arrivals'].map((p) => (
                <li key={p}>
                  <Link
                    to="/products"
                    className="text-[#d4b8a0] hover:text-rose-400 text-sm transition-colors cursor-pointer"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#e8c9a0] mb-5">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4 mb-6">
              {[
                { icon: 'ri-whatsapp-line', text: '0547149360', href: 'https://wa.me/233547149360' },
                { icon: 'ri-mail-line', text: 'hello@goldcoasthair.com.au' },
                { icon: 'ri-time-line', text: 'Mon–Sat · Replies within 24hrs' },
                { icon: 'ri-truck-line', text: 'Fast delivery across Ghana' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-rose-500 text-sm`}></i>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-[#d4b8a0] text-sm hover:text-rose-400 transition-colors cursor-pointer">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-[#d4b8a0] text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              {['100% Human Hair', 'Fast Australian Shipping', 'Secure Checkout'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-[#d4b8a0] text-xs">
                  <i className="ri-check-line text-rose-500 text-sm"></i>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-500 text-xs">
            &copy; {new Date().getFullYear()} Gold Coast Hair. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs">
            Proudly Australian · Luxury Hair for Every Woman
          </p>
        </div>
      </div>
    </footer>
  );
}
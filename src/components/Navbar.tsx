import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

const navLinks: { label: string; path: string; hot?: boolean }[] = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Sale", path: "/sale", hot: true },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solidBg = !isHome || scrolled;

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 ${
          solidBg ? "bg-white border-b border-stone-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://storage.readdy-site.link/project_files/0a78a3fb-04dc-492d-a348-cc7f13ce670a/9ae6ffc9-fa63-48e9-8f4e-e2671ea01c4b_ChatGPT-Image-May-29-2026-05_48_31-PM.png?v=630b7298fd52039d91c7bdb314fde595"
              alt="Gold Coast Hair"
              className="h-20 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                    solidBg
                      ? isActive
                        ? "text-rose-700 font-semibold"
                        : link.hot
                        ? "text-rose-600 font-semibold hover:text-rose-700"
                        : "text-stone-700 hover:text-rose-700"
                      : isActive
                      ? "text-white font-semibold"
                      : link.hot
                      ? "text-yellow-300 font-semibold hover:text-yellow-200"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.hot && (
                    <span className="absolute -top-2.5 -right-4 bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none tracking-wide">
                      SALE
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Currency + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <CurrencySelector />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              Shop Now
              <i className="ri-shopping-bag-line text-base"></i>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              solidBg ? "text-stone-800" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[min(320px,85vw)] bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-stone-100">
          <span
            className="text-lg font-semibold text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Drawer Nav */}
        <div className="px-3 py-4 space-y-0.5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                location.pathname === link.path
                  ? "bg-rose-50 text-rose-700"
                  : link.hot
                  ? "text-rose-600 font-semibold hover:bg-stone-50"
                  : "text-stone-700 hover:bg-stone-50"
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                location.pathname === link.path ? "bg-rose-100" : "bg-stone-100"
              }`}>
                <i className={`${
                  location.pathname === link.path ? "text-rose-600" : "text-stone-500"
                } ri-arrow-right-line`}></i>
              </div>
              {link.label}
              {link.hot && (
                <span className="ml-auto bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                  SALE
                </span>
              )}
            </Link>
          ))}

          {/* Mobile CTA */}
          <div className="mt-4 px-3">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line text-base"></i>
              Shop Now
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-stone-100 bg-white">
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100">
              <i className="ri-whatsapp-line text-stone-500"></i>
            </div>
            <div>
              <p className="font-medium text-stone-700">Need help?</p>
              <p>+233 547 149 360</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
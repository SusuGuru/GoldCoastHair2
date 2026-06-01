import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "233547149360";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to place an order for a wig/extension from Gold Coast Hair 💛");

export default function WhatsAppBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.85 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= heroHeight * 0.85) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-4">
          {/* Left: message */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 flex items-center justify-center bg-[#25D366] rounded-full shrink-0">
              <i className="ri-whatsapp-line text-white text-lg"></i>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight whitespace-nowrap">
                Ready to order? Chat with us on WhatsApp
              </p>
              <p className="text-white/50 text-xs hidden sm:block">
                Fast replies · Custom orders welcome · Delivery across Ghana & worldwide
              </p>
            </div>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-base"></i>
              Order via WhatsApp
            </a>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => setDismissed(true), 500);
              }}
              className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors cursor-pointer rounded-full hover:bg-white/10"
              aria-label="Dismiss"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
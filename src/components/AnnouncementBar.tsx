import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface AnnouncementMessage {
  icon: string;
  iconColor: string;
  highlight: string;
  highlightColor: string;
  text: string;
  cta: string;
  ctaLink: string;
  bgGradient: string;
}

const messages: AnnouncementMessage[] = [
  {
    icon: 'ri-truck-line',
    iconColor: 'text-emerald-300',
    highlight: 'FREE SHIPPING',
    highlightColor: 'text-emerald-300',
    text: 'on all orders over GHS 800 across Ghana',
    cta: 'Shop Now',
    ctaLink: '/products',
    bgGradient: 'from-stone-900 via-stone-900 to-emerald-950',
  },
  {
    icon: 'ri-flashlight-line',
    iconColor: 'text-amber-300',
    highlight: 'FLASH SALE',
    highlightColor: 'text-amber-300',
    text: 'Up to 30% off selected wigs — ends tonight!',
    cta: 'Grab Yours',
    ctaLink: '/sale',
    bgGradient: 'from-stone-900 via-stone-900 to-amber-950',
  },
  {
    icon: 'ri-heart-3-line',
    iconColor: 'text-rose-300',
    highlight: '100% HUMAN HAIR',
    highlightColor: 'text-rose-300',
    text: 'Premium quality wigs, bundles & extensions',
    cta: 'Explore',
    ctaLink: '/products',
    bgGradient: 'from-stone-900 via-stone-900 to-rose-950',
  },
  {
    icon: 'ri-whatsapp-line',
    iconColor: 'text-emerald-400',
    highlight: 'ORDER VIA WHATSAPP',
    highlightColor: 'text-emerald-400',
    text: 'Get personalised advice & fast replies',
    cta: 'Chat Now',
    ctaLink: 'https://wa.me/233547149360',
    bgGradient: 'from-stone-900 via-stone-900 to-emerald-950',
  },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const nextMessage = useCallback(() => {
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % messages.length);
      setIsAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextMessage, 5000);
    return () => clearInterval(interval);
  }, [nextMessage]);

  if (!visible) return null;

  const msg = messages[activeIdx];
  const isExternal = msg.ctaLink.startsWith('http');

  return (
    <div className={`w-full relative z-50 bg-gradient-to-r ${msg.bgGradient} transition-all duration-700`}>
      <div className="flex items-center justify-center h-11 px-3 md:px-6 relative overflow-hidden">
        {/* Animated shine effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-[100%] animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>

        <div className="flex items-center justify-center gap-2 relative z-10">
          {/* Animated icon */}
          <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${msg.iconColor} animate-pulse`}>
            <i className={`${msg.icon} text-sm`}></i>
          </div>

          {/* Message text with animation */}
          <div className="overflow-hidden h-5 md:h-6">
            <div
              className={`flex items-center gap-1 transition-all duration-300 ${
                isAnimating
                  ? direction === 'left'
                    ? '-translate-y-full opacity-0'
                    : 'translate-y-full opacity-0'
                  : 'translate-y-0 opacity-100'
              }`}
            >
              <p className="text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
                <strong className={`font-extrabold mr-1 ${msg.highlightColor}`}>{msg.highlight}</strong>
                <span className="text-white/80">{msg.text}</span>
              </p>
            </div>
          </div>

          {/* CTA button */}
          {isExternal ? (
            <a
              href={msg.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 ml-2 text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 hover:bg-white hover:text-stone-900 transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1 animate-pulse"
            >
              {msg.cta}
              <i className="ri-arrow-right-line text-xs"></i>
            </a>
          ) : (
            <Link
              to={msg.ctaLink}
              className="flex-shrink-0 ml-2 text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 hover:bg-white hover:text-stone-900 transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1 animate-pulse"
            >
              {msg.cta}
              <i className="ri-arrow-right-line text-xs"></i>
            </Link>
          )}
        </div>

        {/* Dots indicator */}
        <div className="absolute left-3 md:left-6 hidden md:flex items-center gap-1.5">
          {messages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIdx ? 'left' : 'right');
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveIdx(idx);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIdx ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Show announcement ${idx + 1}`}
            />
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 md:right-4 w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <i className="ri-close-line text-base"></i>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/10 w-full">
        <div
          className="h-full bg-white/40 transition-all ease-linear"
          style={{ width: '100%', animation: 'progress 5s linear infinite' }}
        />
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
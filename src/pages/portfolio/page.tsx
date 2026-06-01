import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/feature/PageLayout";
import { useCustomerLooks } from "@/hooks/useCustomerLooks";

export default function PortfolioPage() {
  const [active, setActive] = useState<string | null>(null);
  const { looks, loading } = useCustomerLooks();

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20long%20flowing%20hair%2C%20artistic%20silhouette%2C%20warm%20golden%20lighting%2C%20elegant%20and%20luxurious%2C%20fashion%20editorial%20background%2C%20dark%20moody%20atmosphere%2C%20rich%20warm%20tones%2C%20abstract%20and%20artistic&width=1400&height=500&seq=portfoliohero&orientation=landscape"
            alt="Portfolio background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-400 mb-4 block">
            Real Customers, Real Results
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Customer Looks
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            See how our customers are slaying their Gold Coast Hair. Tag{" "}
            <strong className="text-white">@goldcoasthair</strong> to be featured.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 md:py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2 text-stone-500">
                <i className="ri-loader-4-line animate-spin text-lg"></i>
                <span className="text-sm">Loading customer looks...</span>
              </div>
            </div>
          ) : looks.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <i className="ri-image-line text-5xl mb-4 block"></i>
              <p className="text-base">No customer looks yet. Be the first to share yours!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {looks.map((look) => (
                <div
                  key={look.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ height: "400px" }}
                  onMouseEnter={() => setActive(look.id)}
                  onMouseLeave={() => setActive(null)}
                >
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                      active === look.id ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Info card */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 ${
                      active === look.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-sm font-bold text-stone-900">{look.name}</p>
                      <p className="text-xs text-rose-700 font-semibold mt-0.5">
                        {look.product}
                      </p>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                        {look.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 mx-auto mb-6">
            <i className="ri-camera-line text-rose-600 text-2xl"></i>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Want to Be Featured?
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Tag us on Instagram or TikTok with{" "}
            <strong className="text-stone-900">@goldcoasthair</strong> and we might
            feature your look on our page!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://instagram.com/goldcoasthair"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-200 hover:border-rose-400 text-stone-700 hover:text-rose-700 text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-instagram-line text-base"></i>
              Follow on Instagram
            </a>
            <a
              href="https://wa.me/233547149360?text=Hi!%20I%20want%20to%20share%20my%20Gold%20Coast%20Hair%20look%20with%20you%20💛"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-base"></i>
              Send Your Look
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/feature/PageLayout";
import { useReviews } from "@/hooks/useReviews";
import BeforeAfterSection from "./components/BeforeAfterSection";

const filterCategories = ["All", "Wigs", "Extensions", "Bundles"];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "text-xl" : "text-sm";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`${star <= rating ? "ri-star-fill text-amber-400" : "ri-star-line text-stone-300"} ${sizeClass}`}
        ></i>
      ))}
    </div>
  );
}

function RatingBar({ stars, count, pct }: { stars: number; count: number; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-16 flex-shrink-0">
        <span className="text-sm text-stone-600 font-medium">{stars}</span>
        <i className="ri-star-fill text-amber-400 text-xs"></i>
      </div>
      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        ></div>
      </div>
      <span className="text-xs text-stone-400 w-8 text-right flex-shrink-0">{count}</span>
    </div>
  );
}

export default function ReviewsPage() {
  const { reviews, stats, loading } = useReviews();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list =
      activeFilter === "All"
        ? reviews
        : reviews.filter((r) => r.productCategory === activeFilter);

    if (showPhotosOnly) {
      list = list.filter((r) => !!r.photo);
    }

    if (sortBy === "helpful") {
      return [...list].sort((a, b) => b.helpful - a.helpful);
    }
    if (sortBy === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [reviews, activeFilter, sortBy, showPhotosOnly]);

  const photoReviews = reviews.filter((r) => !!r.photo);

  if (loading) {
    return (
      <PageLayout>
        <section className="relative py-20 bg-[#FDF9F7] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2 text-stone-500">
                <i className="ri-loader-4-line animate-spin text-lg"></i>
                <span className="text-sm">Loading reviews...</span>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 bg-[#FDF9F7] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Stats */}
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-4 block">
                Real Women, Real Results
              </span>
              <h1
                className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Our
                <br />
                <span className="italic font-light">Customers Say</span>
              </h1>
              <p className="text-stone-500 text-base leading-relaxed mb-10 max-w-md">
                Over {stats.total} verified reviews from women across Ghana, Nigeria, the UK, and
                beyond. Real hair, real results, real love.
              </p>

              {/* Big rating display */}
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p
                    className="text-7xl font-bold text-stone-900 leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stats.average}
                  </p>
                  <StarRating rating={5} size="lg" />
                  <p className="text-stone-400 text-sm mt-1">{stats.total} verified reviews</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {stats.breakdown.map((b) => (
                    <RatingBar key={b.stars} stars={b.stars} count={b.count} pct={b.pct} />
                  ))}
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-shopping-bag-line"></i>
                Shop Now
              </Link>
            </div>

            {/* Right: Photo grid preview */}
            <div className="grid grid-cols-3 gap-3">
              {photoReviews.slice(0, 6).map((review, i) => (
                <div
                  key={review.id}
                  className={`relative rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <img
                    src={review.photo}
                    alt={review.productName}
                    className="w-full h-full object-cover"
                    style={{ minHeight: i === 0 ? "260px" : "125px" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="flex items-center gap-1 text-white">
                      <i className="ri-star-fill text-amber-400 text-xs"></i>
                      <span className="text-xs font-semibold">{review.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfterSection />

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Category Filters + Photos */}
            <div className="flex items-center gap-2 flex-wrap">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeFilter === cat
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowPhotosOnly(!showPhotosOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  showPhotosOnly
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <i className="ri-image-line text-sm"></i>
                Photos Only
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-400 whitespace-nowrap">Sort by:</span>
              {(["recent", "helpful", "rating"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap capitalize ${
                    sortBy === s
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-stone-400 mb-6">
            Showing <strong className="text-stone-700">{filtered.length}</strong> reviews
            {activeFilter !== "All" && <span> in <strong className="text-stone-700">{activeFilter}</strong></span>}
            {showPhotosOnly && <span> with photos</span>}
          </p>

          {/* Reviews grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <i className="ri-chat-smile-3-line text-5xl mb-4 block"></i>
              <p className="text-base">No reviews match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((review) => {
                const isExpanded = expandedId === review.id;
                const isLong = review.body.length > 180;
                return (
                  <div
                    key={review.id}
                    className="bg-[#FDF9F7] rounded-2xl overflow-hidden border border-stone-100 hover:border-rose-100 transition-colors flex flex-col"
                  >
                    {/* Customer photo */}
                    {review.photo && (
                      <div className="relative overflow-hidden" style={{ height: "220px" }}>
                        <img
                          src={review.photo}
                          alt={`${review.name} wearing ${review.productName}`}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {review.productName}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Review content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-stone-200 flex items-center justify-center text-xs font-medium text-stone-600">
                              {review.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-stone-900 text-sm">{review.name}</p>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-emerald-700 text-xs font-medium">
                                <i className="ri-shield-check-fill text-xs"></i>
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-stone-400 text-xs">{review.location || 'Verified Customer'} · {review.date ? new Date(review.date).toLocaleDateString() : ''}</p>
                        </div>
                      </div>

                      {/* Stars + category */}
                      <div className="flex items-center justify-between mb-3">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {review.productCategory}
                        </span>
                      </div>

                      {/* Review text */}
                      <h4 className="font-bold text-stone-900 text-sm mb-2 leading-snug">{review.title}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed mb-4">
                        {isExpanded || !isLong ? review.body : review.body.slice(0, 180) + "..."}
                        {isLong && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : review.id)}
                            className="text-rose-700 font-semibold text-sm ml-1 cursor-pointer hover:underline"
                          >
                            {isExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                        <button className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 transition-colors cursor-pointer">
                          <i className="ri-thumb-up-line"></i>
                          Helpful ({review.helpful})
                        </button>
                        <span className="text-xs text-stone-400">{review.date ? new Date(review.date).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load more / CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-line"></i>
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>
      {/* Leave a review CTA */}
      <section className="py-16 bg-[#FDF9F7]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 mx-auto mb-6">
            <i className="ri-camera-line text-2xl"></i>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Share Your Look
          </h2>
          <p className="text-stone-500 text-base leading-relaxed mb-8">
            Rocking your Gold Coast Hair? Tag us <strong className="text-stone-700">@goldcoasthair</strong> on Instagram or TikTok and you could be featured right here. We love seeing your transformations!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/goldcoasthair"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-instagram-line"></i>
              Tag @goldcoasthair
            </a>
            <a
              href="https://wa.me/233547149360?text=Hi! I'd like to leave a review for my Gold Coast Hair order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-700 font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-emerald-600"></i>
              Send Us Your Review
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
import { useState, useEffect } from 'react';
import { useReviews } from '@/hooks/useReviews';

export default function TestimonialsSection() {
  const { reviews, loading } = useReviews();
  const [displayReviews, setDisplayReviews] = useState(reviews.slice(0, 6));

  useEffect(() => {
    setDisplayReviews(reviews.slice(0, 6));
  }, [reviews]);

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-stone-500">
              <i className="ri-loader-4-line animate-spin text-lg"></i>
              <span className="text-sm">Loading reviews...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700">Customer Reviews</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Girls<br />
            <span className="italic font-light">Are Saying</span>
          </h2>
          <p className="text-stone-500 text-base max-w-md mx-auto">
            Over 5,000 happy customers across Australia and beyond. Real reviews from real women.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, idx) => (
            <div
              key={review.id || idx}
              className="bg-white border border-stone-100 rounded-2xl p-6 hover:border-rose-200 transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`text-sm ${i < review.rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-stone-200'}`}
                  ></i>
                ))}
              </div>

              {/* Headline */}
              <p className="font-semibold text-stone-900 text-sm mb-3">{review.title}</p>

              {/* Review */}
              <p className="text-stone-600 text-sm leading-relaxed mb-6">{review.body}</p>

              {/* Product tag */}
              <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <i className="ri-shopping-bag-3-line"></i>
                {review.productName}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-xs font-medium text-stone-600 flex-shrink-0">
                  {review.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{review.name}</p>
                  <p className="text-xs text-stone-400">{review.location || 'Verified Customer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
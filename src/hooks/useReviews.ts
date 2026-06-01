import { useState, useEffect } from 'react';
import { getReviews, getReviewSummary } from '@/services/api';
import { reviewsData, reviewStats as defaultReviewStats } from '@/mocks/reviews';

export interface ReviewItem {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  rating: number;
  date: string;
  productName: string;
  productCategory: string;
  title: string;
  body: string;
  photo?: string;
  helpful: number;
  verified: boolean;
}

export interface ReviewStats {
  average: number;
  total: number;
  breakdown: { stars: number; count: number; pct: number }[];
}

function normalizeReview(r: any): ReviewItem {
  return {
    id: r.id?.toString() || r._id?.toString() || '',
    name: r.customerName || r.name || r.author || 'Anonymous',
    avatar: r.avatar || r.customerAvatar,
    location: r.location || r.city || '',
    rating: r.rating || r.stars || 5,
    date: r.createdAt || r.date || new Date().toISOString(),
    productName: r.productName || r.product?.name || 'Product',
    productCategory: r.productCategory || r.category || 'General',
    title: r.title || r.headline || r.subject || 'Great product!',
    body: r.comment || r.body || r.review || r.message || '',
    photo: r.photo || r.image || r.imageUrl,
    helpful: r.helpful || r.likes || 0,
    verified: r.verified ?? r.isVerified ?? true,
  };
}

function normalizeStats(data: any): ReviewStats {
  const avg = data.average || data.averageRating || data.avg || 4.8;
  const total = data.total || data.totalReviews || data.count || 847;
  const breakdown = data.breakdown || data.distribution || data.ratings || defaultReviewStats.breakdown;
  return {
    average: typeof avg === 'number' ? avg : parseFloat(avg) || 4.8,
    total: typeof total === 'number' ? total : parseInt(total, 10) || 847,
    breakdown,
  };
}

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<ReviewStats>(defaultReviewStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [reviewsData, summaryData] = await Promise.all([
          getReviews(),
          getReviewSummary('all'),
        ]);
        const apiReviews = Array.isArray(reviewsData) ? reviewsData : reviewsData.reviews || [];
        setReviews(apiReviews.map(normalizeReview));
        setStats(normalizeStats(summaryData));
      } catch {
        setReviews(reviewsData.map(normalizeReview));
        setStats(defaultReviewStats);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { reviews, stats, loading };
}
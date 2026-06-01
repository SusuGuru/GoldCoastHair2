import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { defaultProducts } from '@/mocks/products';

export interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  originalPrice?: string;
  category: string;
  badge?: string;
  lengths: string[];
  image?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
}

function normalizeProduct(p: any): Product {
  const lengthMatches = p.name?.match(/(\d+)/g) || [];
  const lengths = lengthMatches.map((m: string) => `${m}"`);
  const price = p.price ? Number(p.price) : 0;
  const discountPrice = p.discount_enabled && p.discount_price ? Number(p.discount_price) : null;
  const originalPrice = p.discount_enabled && p.discount_price ? Number(p.price) : null;
  const media = p.media || [];
  const firstImage = Array.isArray(media) && media.length > 0 ? media[0].url : undefined;
  return {
    id: p.id?.toString() || '',
    name: p.name || '',
    desc: p.description || '',
    price: discountPrice ? discountPrice.toString() : price.toString(),
    originalPrice: originalPrice ? originalPrice.toString() : undefined,
    category: p.product_categories?.name || p.category || 'Hair',
    badge: p.discount_enabled ? 'Sale' : undefined,
    lengths,
    image: firstImage,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
  };
}

function normalizeMockProducts(): Product[] {
  return defaultProducts.map((p) => {
    const lengthMatches = p.name.match(/(\d+)/g);
    const lengths = lengthMatches ? lengthMatches.map((m) => `${m}"`) : [];
    return {
      id: p.id,
      name: p.name,
      desc: p.description || '',
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : undefined,
      category: p.category || 'Hair',
      badge: p.badge,
      lengths,
      image: p.image,
      rating: p.rating,
      reviewCount: p.reviewCount,
      stock: p.stock,
    };
  });
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('product_items')
          .select('*, product_categories(id, name, sort_order)')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts((data || []).map(normalizeProduct));
      } catch {
        setProducts(normalizeMockProducts());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('product_items')
          .select('*, product_categories(id, name, sort_order)')
          .eq('status', 'active')
          .limit(8);

        if (error) throw error;
        const mapped = (data || []).map(normalizeProduct);
        setProducts(mapped.filter((p) => p.rating && p.rating >= 4.8));
      } catch {
        const mocks = normalizeMockProducts();
        setProducts(mocks.filter((p) => p.rating && p.rating >= 4.8));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
}

export function useSaleProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('product_items')
          .select('*, product_categories(id, name, sort_order)')
          .eq('status', 'active')
          .eq('discount_enabled', true)
          .not('discount_price', 'is', null);

        if (error) throw error;
        setProducts((data || []).map(normalizeProduct));
      } catch {
        const mocks = normalizeMockProducts();
        setProducts(mocks.filter((p) => p.originalPrice && parseFloat(p.originalPrice) > parseFloat(p.price)));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
}
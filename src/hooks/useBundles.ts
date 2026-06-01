import { useState, useEffect } from 'react';
import { getBundles } from '@/services/api';

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  products?: { name: string; quantity: number }[];
}

const defaultBundles: Bundle[] = [
  {
    id: 'b1',
    name: '3-Bundle Body Wave Deal',
    description: '3 bundles + closure, 100% virgin hair',
    price: 189,
    originalPrice: 239,
    image: 'https://readdy.ai/api/search-image?query=peruvian%20body%20wave%20hair%20bundle%20set%20flat%20lay%2C%203%20bundles%20with%20closure%2C%20wavy%20texture%2C%20warm%20cream%20background%2C%20premium%20product%20photography%2C%20elegant%20and%20clean%20aesthetic%2C%20luxury%20beauty%20brand%20style&width=600&height=600&seq=bundle_01&orientation=squarish',
    badge: 'Best Seller',
  },
  {
    id: 'b2',
    name: '4-Bundle Straight Deal',
    description: '4 bundles + closure, silky smooth',
    price: 229,
    originalPrice: 289,
    image: 'https://readdy.ai/api/search-image?query=brazilian%20straight%20hair%20bundle%20set%20flat%20lay%2C%204%20bundles%20with%20closure%2C%20luxury%20hair%20extensions%2C%20warm%20cream%20background%2C%20premium%20product%20photography%2C%20elegant%20and%20clean%20aesthetic%2C%20gold%20and%20neutral%20tones&width=600&height=600&seq=bundle_02&orientation=squarish',
    badge: 'Most Popular',
  },
  {
    id: 'b3',
    name: 'Curly Bundle Set',
    description: '3 bundles + closure, tight bouncy curls',
    price: 199,
    originalPrice: 259,
    image: 'https://readdy.ai/api/search-image?query=curly%20hair%20bundle%20set%20flat%20lay%2C%203%20bundles%20with%20closure%2C%20tight%20bouncy%20curls%2C%20warm%20cream%20background%2C%20premium%20product%20photography%2C%20luxury%20beauty%20brand%20style&width=600&height=600&seq=bundle_03&orientation=squarish',
    badge: 'Hot Deal',
  },
];

function normalizeBundle(b: any): Bundle {
  return {
    id: b.id?.toString() || b._id?.toString() || '',
    name: b.name || '',
    description: b.description || b.desc || '',
    price: typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0,
    originalPrice: typeof b.originalPrice === 'number' ? b.originalPrice : parseFloat(b.originalPrice) || 0,
    image: b.image || b.images?.[0] || '',
    badge: b.badge || b.tag || b.label,
    products: b.products || b.items,
  };
}

export function useBundles() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBundles();
        const apiBundles = Array.isArray(data) ? data : data.bundles || [];
        setBundles(apiBundles.map(normalizeBundle));
      } catch {
        setBundles(defaultBundles);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { bundles, loading };
}
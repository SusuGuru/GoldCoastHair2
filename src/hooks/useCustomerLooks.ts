import { useState, useEffect } from 'react';
import { getCustomerLooks } from '@/services/api';

export interface CustomerLook {
  id: string;
  name: string;
  product: string;
  caption: string;
  image: string;
  approved?: boolean;
}

const defaultLooks: CustomerLook[] = [
  {
    id: '1',
    name: 'Aaliyah M.',
    product: 'Silky Straight Lace Front Wig — 22"',
    caption: 'Obsessed with how natural this looks! The lace is completely undetectable.',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20wearing%20a%20silky%20straight%20lace%20front%20wig%2C%20natural%20looking%20hairline%2C%20long%20straight%20black%20hair%2C%20confident%20and%20glamorous%2C%20warm%20studio%20lighting%2C%20fashion%20portrait%2C%20elegant%20outfit%2C%20rich%20skin%20tone&width=500&height=650&seq=look001&orientation=portrait',
  },
  {
    id: '2',
    name: 'Destiny R.',
    product: 'Deep Curly HD Lace Wig — 18"',
    caption: 'These curls are everything! Got so many compliments at my birthday dinner.',
    image: 'https://readdy.ai/api/search-image?query=gorgeous%20Black%20woman%20with%20deep%20curly%20wig%2C%20bouncy%20tight%20curls%2C%20natural%20and%20voluminous%2C%20warm%20golden%20lighting%2C%20confident%20smile%2C%20fashion%20editorial%20portrait%2C%20beautiful%20skin%2C%20elegant%20setting&width=500&height=650&seq=look002&orientation=portrait',
  },
  {
    id: '3',
    name: 'Jasmine T.',
    product: '3-Bundle Body Wave + Closure',
    caption: 'My install came out so flawless. The hair is so soft and holds curls perfectly.',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20body%20wave%20sew-in%20hair%20extensions%2C%20soft%20natural%20waves%2C%20voluminous%20and%20glossy%2C%20warm%20studio%20lighting%2C%20confident%20and%20stylish%2C%20fashion%20portrait%2C%20elegant%20and%20modern%20look&width=500&height=650&seq=look003&orientation=portrait',
  },
  {
    id: '4',
    name: 'Kezia O.',
    product: 'Clip-In Extensions — 20"',
    caption: 'Added so much length and volume in literally 10 minutes. Game changer!',
    image: 'https://readdy.ai/api/search-image?query=woman%20with%20long%20voluminous%20clip-in%20hair%20extensions%2C%20natural%20straight%20hair%20with%20added%20length%2C%20glamorous%20and%20confident%2C%20warm%20lighting%2C%20fashion%20portrait%2C%20beautiful%20and%20elegant%20look%2C%20rich%20warm%20tones&width=500&height=650&seq=look004&orientation=portrait',
  },
  {
    id: '5',
    name: 'Simone B.',
    product: 'Body Wave Full Lace Wig — 24"',
    caption: 'The length and the waves are just perfect. Worth every single cent!',
    image: 'https://readdy.ai/api/search-image?query=stunning%20Black%20woman%20with%20long%20body%20wave%20full%20lace%20wig%2C%20beautiful%20natural%20waves%2C%20extra%20long%20hair%2C%20glamorous%20and%20confident%2C%20warm%20golden%20studio%20lighting%2C%20high%20fashion%20portrait%2C%20elegant%20and%20luxurious%20look&width=500&height=650&seq=look005&orientation=portrait',
  },
  {
    id: '6',
    name: 'Tiana W.',
    product: '4-Bundle Straight Deal — 20"',
    caption: 'Thick, full, and so silky. This is my third order and it never disappoints.',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20thick%20straight%20sew-in%20hair%2C%20silky%20smooth%20black%20hair%2C%20full%20and%20voluminous%2C%20confident%20and%20stylish%2C%20warm%20studio%20lighting%2C%20fashion%20portrait%2C%20elegant%20modern%20aesthetic&width=500&height=650&seq=look006&orientation=portrait',
  },
  {
    id: '7',
    name: 'Nia K.',
    product: 'Kinky Curly Full Lace Wig — 16"',
    caption: 'Finally a wig that matches my natural texture perfectly. I feel so confident!',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20kinky%20curly%20natural%20hair%20wig%2C%20defined%20tight%20curls%2C%20natural%20hair%20texture%2C%20warm%20golden%20lighting%2C%20confident%20and%20radiant%2C%20fashion%20portrait%2C%20elegant%20and%20empowering%20look%2C%20beautiful%20skin&width=500&height=650&seq=look007&orientation=portrait',
  },
  {
    id: '8',
    name: 'Chloe A.',
    product: 'Loose Wave Lace Front — 26"',
    caption: 'The waves are so effortless and beachy. Perfect for summer and vacation vibes.',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20loose%20wave%20lace%20front%20wig%2C%20soft%20beachy%20waves%2C%20long%20flowing%20hair%2C%20warm%20golden%20lighting%2C%20confident%20and%20glamorous%2C%20fashion%20portrait%2C%20elegant%20summer%20look%2C%20beautiful%20and%20radiant&width=500&height=650&seq=look008&orientation=portrait',
  },
  {
    id: '9',
    name: 'Zara E.',
    product: 'Bob Wig with Fringe — 12"',
    caption: 'This bob is giving CEO energy. So sleek, so chic, absolutely love it.',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20chic%20bob%20wig%20with%20fringe%20bangs%2C%20sleek%20and%20modern%20short%20hair%2C%20confident%20and%20stylish%2C%20warm%20studio%20lighting%2C%20fashion%20portrait%2C%20elegant%20professional%20look%2C%20beautiful%20skin%20tone&width=500&height=650&seq=look009&orientation=portrait',
  },
];

function normalizeLook(l: any): CustomerLook {
  return {
    id: l.id?.toString() || l._id?.toString() || '',
    name: l.customerName || l.name || l.submittedBy || 'Customer',
    product: l.product || l.productName || l.hairStyle || '',
    caption: l.caption || l.description || l.comment || l.feedback || '',
    image: l.imageUrl || l.image || l.photo || l.url || '',
    approved: l.approved ?? l.isApproved ?? true,
  };
}

export function useCustomerLooks() {
  const [looks, setLooks] = useState<CustomerLook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCustomerLooks();
        const apiLooks = Array.isArray(data) ? data : data.looks || data.customerLooks || [];
        setLooks(apiLooks.filter((l: any) => l.approved !== false).map(normalizeLook));
      } catch {
        setLooks(defaultLooks);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { looks, loading };
}
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productName: string;
  price: string;
  qty: number;
  length?: string;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  total: string;
  date: string; // ISO date
  estimatedDelivery?: string;
  address: string;
  notes?: string;
}

export const defaultOrders: Order[] = [
  {
    id: 'ord_001',
    orderNumber: 'GCH-240612-001',
    customerName: 'Ama Owusu',
    customerPhone: '+233 54 123 4567',
    customerEmail: 'ama.owusu@gmail.com',
    status: 'shipped',
    items: [
      { productName: 'Silk Straight 24" Lace Front Wig', price: 'GHS 289', qty: 1, length: '24"', color: 'Natural Black' },
      { productName: 'Brazilian Straight Bundle Set', price: 'GHS 179', qty: 1, length: '20"', color: 'Natural Black' },
    ],
    total: 'GHS 468',
    date: '2026-05-28T10:30:00Z',
    estimatedDelivery: '2026-06-03',
    address: '12 Independence Ave, Accra, Ghana',
    notes: 'Please call before delivery.',
  },
  {
    id: 'ord_002',
    orderNumber: 'GCH-240615-002',
    customerName: 'Kofi Mensah',
    customerPhone: '+233 24 987 6543',
    customerEmail: 'kofi.mensah@yahoo.com',
    status: 'delivered',
    items: [
      { productName: 'Body Wave 20" Closure Wig', price: 'GHS 249', qty: 1, length: '20"', color: 'Natural Black' },
    ],
    total: 'GHS 249',
    date: '2026-05-15T14:00:00Z',
    estimatedDelivery: '2026-05-20',
    address: '45 Oxford Street, Osu, Accra, Ghana',
  },
  {
    id: 'ord_003',
    orderNumber: 'GCH-240618-003',
    customerName: 'Nana Yaa',
    customerPhone: '+233 55 444 7777',
    customerEmail: 'nana.yaa@outlook.com',
    status: 'processing',
    items: [
      { productName: 'Water Wave 26" HD Lace Wig', price: 'GHS 329', qty: 1, length: '26"', color: 'Natural Black' },
      { productName: 'Peruvian Body Wave Bundle Set', price: 'GHS 189', qty: 2, length: '22"', color: 'Natural Black' },
    ],
    total: 'GHS 707',
    date: '2026-05-30T09:15:00Z',
    estimatedDelivery: '2026-06-06',
    address: '78 Spintex Road, Accra, Ghana',
  },
  {
    id: 'ord_004',
    orderNumber: 'GCH-240620-004',
    customerName: 'Abena Serwaa',
    customerPhone: '+233 20 111 2222',
    customerEmail: 'abena.s@gmail.com',
    status: 'pending',
    items: [
      { productName: 'Blonde Balayage 18" Wig', price: 'GHS 319', qty: 1, length: '18"', color: 'Blonde Balayage' },
    ],
    total: 'GHS 319',
    date: '2026-06-01T08:00:00Z',
    estimatedDelivery: '2026-06-08',
    address: '33 Labone Crescent, Accra, Ghana',
  },
  {
    id: 'ord_005',
    orderNumber: 'GCH-240605-005',
    customerName: 'Efua Asante',
    customerPhone: '+233 54 333 8888',
    customerEmail: 'efua.asante@hotmail.com',
    status: 'cancelled',
    items: [
      { productName: 'Deep Curly 18" Headband Wig', price: 'GHS 199', qty: 1, length: '18"', color: 'Natural Black' },
    ],
    total: 'GHS 199',
    date: '2026-05-20T16:45:00Z',
    address: '19 East Legon, Accra, Ghana',
  },
  {
    id: 'ord_006',
    orderNumber: 'GCH-240622-006',
    customerName: 'Kwame Appiah',
    customerPhone: '+233 24 555 9999',
    customerEmail: 'kwame.appiah@gmail.com',
    status: 'confirmed',
    items: [
      { productName: 'Loose Wave 24" Lace Front', price: 'GHS 299', qty: 1, length: '24"', color: 'Natural Black' },
      { productName: 'Curly Clip-In Extensions', price: 'GHS 89', qty: 1, color: 'Natural Black' },
    ],
    total: 'GHS 388',
    date: '2026-05-31T11:20:00Z',
    estimatedDelivery: '2026-06-07',
    address: '56 Ring Road Central, Accra, Ghana',
  },
];
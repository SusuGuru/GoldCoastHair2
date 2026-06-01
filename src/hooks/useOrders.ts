import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items?: { name: string; quantity: number }[];
  customer?: { name: string; email: string; phone?: string; address?: string };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('order_headers')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        const mapped = (data || []).map((h: any) => {
          const items = (h.order_items || []).map((i: any) => ({
            name: i.product_name,
            quantity: i.quantity,
          }));

          const total = (h.subtotal_items || 0) + (h.shipping_total || 0) + (h.tax_total || 0) - (h.discount_price || 0);

          return {
            id: h.id.toString(),
            orderNumber: h.id.toString(),
            status: h.status || 'pending',
            total: Math.max(0, total),
            createdAt: h.created_at,
            items,
            customer: h.recipient || {},
          };
        });

        setOrders(mapped);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { orders, loading };
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('order_headers')
          .select('*, order_items(*)')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          setOrder(null);
          return;
        }

        const items = (data.order_items || []).map((i: any) => ({
          name: i.product_name,
          quantity: i.quantity,
          unitPrice: i.unit_price,
          finalPrice: i.final_price,
          subtotal: i.subtotal,
        }));

        const total = (data.subtotal_items || 0) + (data.shipping_total || 0) + (data.tax_total || 0) - (data.discount_price || 0);

        setOrder({
          id: data.id.toString(),
          orderNumber: data.id.toString(),
          status: data.status || 'pending',
          total: Math.max(0, total),
          createdAt: data.created_at,
          items,
          customer: data.recipient || {},
        });
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  return { order, loading };
}
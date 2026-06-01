import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrder } from "@/services/api";
import PageLayout from "@/components/feature/PageLayout";

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (orderId) {
      getOrder(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch(() => {
          // Fallback
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  return (
    <PageLayout>
      <section className="min-h-[80vh] flex items-center justify-center py-16 bg-[#FDF9F7]">
        <div className="max-w-lg w-full mx-auto px-6 text-center">
          {/* Success badge */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto mb-6">
            <i className="ri-check-double-line text-4xl"></i>
          </div>

          {/* Header */}
          <h1
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order Confirmed!
          </h1>
          <p className="text-stone-500 text-base leading-relaxed mb-2">
            Thank you for choosing Gold Coast Hair. We&apos;re so excited to get your gorgeous hair to you!
          </p>
          <p className="text-stone-400 text-sm mb-8">
            A confirmation email has been sent to your inbox.
          </p>

          {/* Order details card */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-50 text-rose-700">
                <i className="ri-shopping-bag-3-line text-lg"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Order Details</p>
                <p className="text-xs text-stone-400">
                  {orderId ? `Order #${orderId}` : "Order submitted"}
                </p>
              </div>
              <span className="ml-auto text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full capitalize">
                {order?.status || "Pending"}
              </span>
            </div>

            {order && !loading && (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order ID</span>
                  <span className="font-semibold text-stone-900">{order.id || orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total</span>
                  <span className="font-semibold text-stone-900">${order.total?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Items</span>
                  <span className="font-semibold text-stone-900">
                    {order?.items?.length || "—"}
                  </span>
                </div>
              </div>
            )}

            {!order && !loading && (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Status</span>
                  <span className="font-semibold text-amber-600">Pending Confirmation</span>
                </div>
                <p className="text-xs text-stone-400 mt-2">
                  We&apos;ll send you an order confirmation within 24 hours via email or WhatsApp.
                </p>
              </div>
            )}
          </div>

          {/* Contact cards */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-50 text-rose-700 flex-shrink-0">
                <i className="ri-mail-line text-base"></i>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Email us</p>
                <p className="text-sm text-stone-700 font-semibold">hello@goldcoasthair.com.au</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 flex-shrink-0">
                <i className="ri-whatsapp-line text-base"></i>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">WhatsApp us</p>
                <p className="text-sm text-stone-700 font-semibold">0547149360</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              to={`/track?id=${orderId || ''}`}
              className="w-full bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
            >
              <i className="ri-map-pin-line"></i>
              Track My Order
            </Link>
            <a
              href="https://wa.me/233547149360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
            >
              <i className="ri-whatsapp-line"></i>
              Follow Up on WhatsApp
            </a>
            <Link
              to="/products"
              className="w-full border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-2"
            >
              <i className="ri-shopping-bag-line"></i>
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/orders")}
              className="w-full text-stone-500 hover:text-stone-700 font-medium py-2 transition-colors cursor-pointer text-sm"
            >
              View My Orders
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
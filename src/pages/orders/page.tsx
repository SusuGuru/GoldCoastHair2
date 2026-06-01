import { useNavigate } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items?: { name: string; quantity: number }[];
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders, loading } = useOrders();

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    processing: "bg-blue-50 text-blue-700",
    shipped: "bg-emerald-50 text-emerald-700",
    delivered: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-8">My Orders</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-stone-500">
              <i className="ri-loader-4-line animate-spin text-lg"></i>
              <span className="text-sm">Loading orders...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 md:p-12 text-center border border-stone-100">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-line text-stone-400 text-xl"></i>
            </div>
            <h2 className="text-lg font-medium text-stone-900 mb-2">No orders yet</h2>
            <p className="text-stone-500 text-sm mb-6">Your order history will appear here.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-5 md:p-6 border border-stone-100 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Order #{order.orderNumber || order.id}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize w-fit ${
                      statusColors[order.status] || "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-stone-600">
                    {order.items && order.items.length > 0
                      ? `${order.items[0].name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}`
                      : "—"}
                  </div>
                  <div className="text-sm font-semibold text-stone-900">
                    ${order.total?.toFixed(2) || "0.00"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
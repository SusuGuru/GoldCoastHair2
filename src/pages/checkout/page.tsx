import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionId } from "@/utils/session";
import { getCart, placeOrder } from "@/services/api";
import { useCurrencyContext } from "@/hooks/CurrencyContext";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrencyContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const sessionId = getSessionId();
        const cart = await getCart(sessionId);
        setCartItems(cart.items || []);
      } catch {
        setCartItems([]);
      } finally {
        setCartLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setError("");
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const sessionId = getSessionId();
      const res = await placeOrder({
        sessionId,
        customer: form,
      });
      if (res?.id || res?.orderId) {
        // Send email notification to business owner
        const orderId = res.id || res.orderId;
        try {
          await fetch('https://42ay9uqe0d0xm1q3tqy6.helloreaddy.com/functions/v1/order-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              orderNumber: res.orderNumber || orderId,
              customer: form,
              items: cartItems.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              total: `${total}`,
            }),
          });
        } catch {
          // Notification is best-effort
        }
        setSuccess(true);
        setTimeout(() => navigate(`/order-success?id=${orderId}`), 1500);
      } else {
        setError("Checkout failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-emerald-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-semibold text-stone-900 mb-2">Order Placed!</h2>
          <p className="text-stone-600">Redirecting you to confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-6 cursor-pointer"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Cart
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-stone-100">
              <h2 className="text-lg font-medium text-stone-900 mb-5">Shipping Details</h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+233 20 123 4567"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    placeholder="123 Street Name, City, Country"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-stone-100 sticky top-6">
              <h2 className="text-lg font-medium text-stone-900 mb-5">Order Summary</h2>

              {cartLoading ? (
                <div className="text-sm text-stone-400 py-4">Loading cart...</div>
              ) : cartItems.length === 0 ? (
                <div className="text-sm text-stone-400 py-4">Your cart is empty</div>
              ) : (
                <div className="space-y-3 mb-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-stone-700">
                        {item.name} <span className="text-stone-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-900">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-stone-100">
                  <span className="text-stone-900">Total</span>
                  <span className="text-stone-900">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className="w-full mt-6 bg-stone-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
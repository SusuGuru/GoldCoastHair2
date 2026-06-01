import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useCurrencyContext } from "@/hooks/CurrencyContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrencyContext();
  const { items, loading, updateQuantity, removeItem, clearCart, subtotal, shipping, total, itemCount } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 300);
  };

  const handleClear = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF9F7]">
        <div className="flex items-center gap-2 text-stone-500">
          <i className="ri-loader-4-line animate-spin text-lg"></i>
          <span className="text-sm">Loading your cart...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F7]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <button
            onClick={() => navigate("/")}
            className="hover:text-rose-700 transition-colors cursor-pointer"
          >
            Home
          </button>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <span className="text-stone-900 font-medium">Shopping Cart</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shopping Cart
            </h1>
            {items.length > 0 && (
              <p className="text-sm text-stone-500 mt-1">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-sm text-stone-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <i className="ri-delete-bin-line text-sm"></i>
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-28">
            <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-6">
              <i className="ri-shopping-bag-3-line text-rose-700 text-3xl"></i>
            </div>
            <h2
              className="text-2xl font-bold text-stone-900 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your cart is empty
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-sm text-center leading-relaxed">
              Looks like you haven't added anything yet. Browse our collection and find your perfect hair.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-rose-700 hover:bg-rose-800 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-shopping-bag-line"></i>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 md:p-5 border border-stone-100 transition-all duration-300 ${
                    removingId === item.id ? "opacity-50 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-image-line text-stone-300 text-2xl"></i>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-stone-900 truncate">
                              {item.name}
                            </h3>
                            {item.variant && (
                              <p className="text-xs text-stone-500 mt-0.5">{item.variant}</p>
                            )}
                            {item.category && (
                              <span className="text-xs text-rose-700 font-medium mt-1 inline-block">
                                {item.category}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line text-xs"></i>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line text-xs"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm font-semibold text-stone-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-stone-400">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-rose-700 transition-colors cursor-pointer mt-2"
              >
                <i className="ri-arrow-left-line"></i>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[380px]">
              <div className="bg-white rounded-2xl p-6 border border-stone-100 sticky top-6">
                <h2 className="text-lg font-bold text-stone-900 mb-5">Order Summary</h2>

                {/* Calculation */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">
                      Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                    <span className="text-stone-900 font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Shipping</span>
                    <span className="text-stone-900 font-medium">
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping === 0 && subtotal > 0 && (
                    <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                      <i className="ri-truck-line"></i>
                      <span>You qualified for free shipping!</span>
                    </div>
                  )}
                  {shipping > 0 && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 px-3 py-2 rounded-lg">
                      <i className="ri-truck-line"></i>
                      <span>Spend {formatPrice(200 - subtotal)} more for free shipping</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold pt-3 border-t border-stone-100">
                    <span className="text-stone-900">Total</span>
                    <span className="text-stone-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-full py-4 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-secure-payment-line"></i>
                  Proceed to Checkout
                </button>

                {/* WhatsApp Order */}
                <a
                  href="https://wa.me/233547149360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 bg-white border-2 border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50 rounded-full py-3 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-whatsapp-line text-emerald-600"></i>
                  Order via WhatsApp
                </a>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-stone-100">
                  {[
                    { icon: "ri-shield-check-line", text: "Secure checkout" },
                    { icon: "ri-truck-line", text: "Fast shipping" },
                    { icon: "ri-refresh-line", text: "14-day returns" },
                  ].map((badge) => (
                    <div
                      key={badge.text}
                      className="flex items-center gap-1.5 text-xs text-stone-500"
                    >
                      <i className={`${badge.icon} text-stone-400`}></i>
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-stone-900 text-center mb-2">
              Clear your cart?
            </h3>
            <p className="text-sm text-stone-500 text-center mb-6">
              This will remove all {itemCount} items from your cart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full py-3 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full py-3 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
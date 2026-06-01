import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, getReviews } from "@/services/api";
import { useCart } from "@/hooks/useCart";
import { useCurrencyContext } from "@/hooks/CurrencyContext";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  category?: string;
  images?: string[];
  image?: string;
  inStock?: boolean;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  variants?: { id: string; name: string; price: number }[];
  badge?: string;
  features?: string[];
  length?: string;
  color?: string;
  texture?: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice } = useCurrencyContext();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const [productData, reviewsData] = await Promise.all([
          getProduct(id),
          getReviews(id),
        ]);
        setProduct(productData);
        setReviews(reviewsData.reviews || reviewsData || []);
        if (productData.variants?.length) {
          setSelectedVariant(productData.variants[0].id);
        }
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !id) return;
    setAddingToCart(true);
    try {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity,
        image: product.image || product.images?.[0],
        variant: selectedVariant || undefined,
        category: product.category,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (!product || !id) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      image: product.image || product.images?.[0],
      variant: selectedVariant || undefined,
      category: product.category,
    });
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF9F7]">
        <div className="flex items-center gap-2 text-stone-500">
          <i className="ri-loader-4-line animate-spin text-lg"></i>
          <span className="text-sm">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF9F7] px-4">
        <div className="text-center">
          <h2 className="text-lg font-medium text-stone-900 mb-2">Product not found</h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm cursor-pointer whitespace-nowrap hover:bg-rose-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const maxQty = product.stock || 10;
  const isOutOfStock = product.inStock === false || product.stock === 0;
  const discount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
          <button
            onClick={() => navigate("/products")}
            className="hover:text-rose-700 transition-colors cursor-pointer"
          >
            Products
          </button>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <span className="text-stone-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Images */}
          <div className="w-full lg:w-[55%]">
            <div className="relative w-full h-[420px] md:h-[540px] rounded-2xl overflow-hidden bg-stone-100 mb-4">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="ri-image-line text-stone-300 text-6xl"></i>
                </div>
              )}
              {discount && (
                <div className="absolute top-4 left-4 bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discountPercent}%
                </div>
              )}
              {product.badge && !discount && (
                <div className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </div>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <button
                    onClick={() => setActiveImage(Math.max(0, activeImage - 1))}
                    disabled={activeImage === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <i className="ri-arrow-left-s-line text-stone-700"></i>
                  </button>
                  <span className="text-xs font-medium text-stone-700">
                    {activeImage + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setActiveImage(Math.min(images.length - 1, activeImage + 1))}
                    disabled={activeImage === images.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <i className="ri-arrow-right-s-line text-stone-700"></i>
                  </button>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === idx
                        ? "border-rose-700 ring-2 ring-rose-700/20"
                        : "border-transparent hover:border-stone-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col">
            {/* Category + Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                {product.category}
              </span>
              {isOutOfStock && (
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
              {!isOutOfStock && product.stock && product.stock < 5 && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-2xl md:text-3xl font-bold text-stone-900 mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            {(product.rating || reviews.length > 0) && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5 text-amber-500">
                  <i className="ri-star-fill text-sm"></i>
                  <span className="text-sm font-semibold text-stone-900">
                    {product.rating?.toFixed(1) || "4.8"}
                  </span>
                </div>
                <span className="text-stone-400 text-sm">|</span>
                <span className="text-sm text-stone-500">
                  {product.reviewCount || reviews.length} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {discount && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Short description */}
            {product.description && (
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-5">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Select Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all cursor-pointer whitespace-nowrap ${
                        selectedVariant === v.id
                          ? "border-rose-700 bg-rose-700 text-white"
                          : "border-stone-200 text-stone-700 hover:border-stone-300 bg-white"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-11 h-11 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  <i className="ri-subtract-line text-sm"></i>
                </button>
                <span className="w-12 text-center text-sm font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  disabled={quantity >= maxQty || isOutOfStock}
                  className="w-11 h-11 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  <i className="ri-add-line text-sm"></i>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || isOutOfStock}
                className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-full py-4 text-sm font-semibold transition-colors disabled:bg-stone-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Adding...
                  </>
                ) : added ? (
                  <>
                    <i className="ri-check-line"></i>
                    Added to Cart!
                  </>
                ) : isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    <i className="ri-shopping-bag-3-line"></i>
                    Add to Cart
                  </>
                )}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-white border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white rounded-full py-3 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-send-plane-line"></i>
                  Buy Now
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-pointer"
                >
                  <i className="ri-shopping-bag-line text-lg"></i>
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-stone-200">
              {[
                { icon: "ri-truck-line", text: "Free Shipping over $200" },
                { icon: "ri-shield-check-line", text: "100% Human Hair" },
                { icon: "ri-refresh-line", text: "14-Day Returns" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-xs text-stone-600">
                  <i className={`${badge.icon} text-stone-400`}></i>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl font-bold text-stone-900">Customer Reviews</h2>
              <span className="text-sm text-stone-500">({reviews.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="bg-[#FDF9F7] rounded-2xl p-5 border border-stone-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-sm font-semibold text-rose-700">
                      {review.customerName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        {review.customerName || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i
                            key={i}
                            className={
                              i < review.rating ? "ri-star-fill" : "ri-star-line"
                            }
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* You may also like section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2
            className="text-xl font-bold text-stone-900 mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You may also like
          </h2>
          <div className="flex items-center justify-center py-8">
            <p className="text-stone-400 text-sm">Related products coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
const API_BASE_URL = "https://gold-coast-api-production.up.railway.app/api/v1";

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
  localStorage.setItem("accessToken", token);
}

export function getAccessToken(): string | null {
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

async function fetchWithAuth(url: string, options: { method?: string; body?: string; headers?: Record<string, string> } = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export async function login(email: string, password: string) {
  const data = await fetchWithAuth("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
  return data;
}

export async function register(email: string, password: string, name: string) {
  const data = await fetchWithAuth("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No refresh token");
  const data = await fetchWithAuth("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken: refresh }),
  });
  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
  return data;
}

export async function logout() {
  try {
    await fetchWithAuth("/auth/logout", { method: "POST" });
  } finally {
    clearAccessToken();
  }
}

// Products
export async function getProducts(params?: { category?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.category) query.append("category", params.category);
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  return fetchWithAuth(`/products?${query.toString()}`);
}

export async function getFeaturedProducts() {
  return fetchWithAuth("/products/featured");
}

export async function getSaleProducts() {
  return fetchWithAuth("/products/sale");
}

export async function getProductCategories() {
  return fetchWithAuth("/products/categories");
}

export async function getProduct(id: string) {
  return fetchWithAuth(`/products/${id}`);
}

// Cart
export async function getCart(sessionId: string) {
  return fetchWithAuth(`/cart/${sessionId}`);
}

export async function addCartItem(sessionId: string, productId: string, quantity: number, variantId?: string) {
  return fetchWithAuth(`/cart/${sessionId}/items`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity, variantId }),
  });
}

export async function updateCartItem(sessionId: string, itemId: string, quantity: number) {
  return fetchWithAuth(`/cart/${sessionId}/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(sessionId: string, itemId: string) {
  return fetchWithAuth(`/cart/${sessionId}/items/${itemId}`, { method: "DELETE" });
}

export async function clearCart(sessionId: string) {
  return fetchWithAuth(`/cart/${sessionId}`, { method: "DELETE" });
}

// Orders
export async function placeOrder(payload: {
  sessionId: string;
  customer: { name: string; email: string; phone: string; address: string };
  paymentMethod?: string;
  note?: string;
}) {
  return fetchWithAuth("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getOrders() {
  return fetchWithAuth("/orders");
}

export async function getOrder(id: string) {
  return fetchWithAuth(`/orders/${id}`);
}

export async function trackOrder(orderNumber: string) {
  return fetchWithAuth(`/orders/track?orderNumber=${encodeURIComponent(orderNumber)}`);
}

export async function cancelOrder(id: string) {
  return fetchWithAuth(`/orders/${id}`, { method: "DELETE" });
}

// Reviews
export async function getReviews(productId?: string) {
  const query = productId ? `?productId=${productId}` : "";
  return fetchWithAuth(`/reviews${query}`);
}

export async function createReview(payload: { productId: string; rating: number; comment: string }) {
  return fetchWithAuth("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getReviewSummary(productId: string) {
  return fetchWithAuth(`/reviews/summary?productId=${productId}`);
}

// Enquiries
export async function createEnquiry(payload: { name: string; email: string; subject: string; message: string }) {
  return fetchWithAuth("/enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getFAQ() {
  return fetchWithAuth("/faq");
}

// Promotions
export async function getPromotions() {
  return fetchWithAuth("/promotions");
}

export async function getActivePromotion() {
  return fetchWithAuth("/promotions/active");
}

// Bundles
export async function getBundles() {
  return fetchWithAuth("/bundles");
}

export async function getBundle(id: string) {
  return fetchWithAuth(`/bundles/${id}`);
}

// Customer Looks
export async function getCustomerLooks() {
  return fetchWithAuth("/customer-looks");
}

export async function submitCustomerLook(payload: { name: string; email: string; description: string; imageUrl?: string }) {
  return fetchWithAuth("/customer-looks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Products from "../pages/products/page";
import ProductDetail from "../pages/product-detail/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";
import OrderSuccess from "../pages/order-success/page";
import Orders from "../pages/orders/page";
import Login from "../pages/login/page";
import Register from "../pages/register/page";

import ContactPage from "../pages/contact/page";
import OrderPage from "../pages/order/page";
import PortfolioPage from "../pages/portfolio/page";
import AboutPage from "../pages/about/page";
import ReviewsPage from "../pages/reviews/page";
import FAQPage from "../pages/faq/page";
import TrackPage from "../pages/track/page";
import SalePage from "../pages/sale/page";
import HairCarePage from "../pages/hair-care/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/sale",
    element: <SalePage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/order-success",
    element: <OrderSuccess />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/portfolio",
    element: <PortfolioPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/track",
    element: <TrackPage />,
  },
  {
    path: "/hair-care",
    element: <HairCarePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
import Home from "../pages/Home";
import type { JSX } from "react";
import Tickets from "../pages/Tickets";
import { Route } from "react-router-dom";
import type { AppRoute } from "../types/t";
import DefaultLayout from "../layouts/DefaultLayout";
import Sponsor from "../pages/Sponsor";
import Checkout from "../pages/Checkout";
import Exhibitor from "../pages/Exhibitor";
import AdminDashboard from "../pages/Dashboard";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import SignIn from "../pages/SignIn";
import ProtectedRoute from "../contexts/ProtectedRoute";
import ShopDashboard from "../pages/ShopDashboard";
import PublicRoute from "../contexts/publicRoute";
import CheckoutShop from "../pages/CheckoutShop";
import OrderDetails from "../pages/OrderDetails";
import Giveaway from "../components/Giveaway";
import Scholarship from "../components/Scholarship";

export const routes: AppRoute[] = [
  {
    path: "/",
    element: DefaultLayout,
    children: [
      {
        index: true,
        element: Home,
      },
      {
        path: "ticket",
        element: Tickets,
      },
      {
        path: "sponsor",
        element: Sponsor,
      },
      // new
      {
        path: "giveaway",
        element: Giveaway,
      },
      {
        path: "scholarship",
        element: Scholarship,
      },
      //
      {
        path: "exhibitor",
        element: Exhibitor,
      },
      {
        path: "checkout",
        element: Checkout,
      },
      {
        path: "shop",
        element: Shop,
      },
      {
        path: "shop/:id",
        element: ProductDetails,
      },
    ],
  },
  {
    path: "checkout/shop",
    element: CheckoutShop,
  },
  {
    path: "/admin/v1/dashboard",
    element: AdminDashboard,
  },
  {
    path: "/v1/login",
    public: true,
    element: SignIn,
  },
  {
    path: "/v1/console",
    element: ShopDashboard,
    protected: true,
  },
  {
    path: "/v1/console/order/:id",
    element: OrderDetails,
    protected: true,
  },
];

export function createRoutes(routes: AppRoute[]): React.ReactNode {
  return routes.map(
    (
      {
        path,
        element: Component,
        protected: isProtected,
        public: isPublic,
        index: isIndex,
        children,
      },
      idx
    ) => {
      let wrappedElement: JSX.Element = <Component />;

      if (isProtected) {
        wrappedElement = <ProtectedRoute element={wrappedElement} />;
      }

      if (isPublic) {
        wrappedElement = <PublicRoute element={wrappedElement} />;
      }

      if (isIndex) {
        return <Route key={idx} index element={wrappedElement} />;
      }

      return (
        <Route key={idx} path={path} element={wrappedElement}>
          {children && createRoutes(children)}
        </Route>
      );
    }
  );
}

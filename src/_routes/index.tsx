import Home from "../pages/Home";
import type { JSX } from "react";
import Tickets from "../pages/Tickets";
import { Route } from "react-router-dom";
import type { AppRoute } from "../types/t";
import DefaultLayout from "../layouts/DefaultLayout";
import Sponsor from "../pages/Sponsor";
import Checkout from "../pages/Checkout";

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
        path: "tickets",
        element: Tickets,
      },
      {
        path: "sponsors",
        element: Sponsor,
      },
      {
        path: "checkout",
        element: Checkout,
      },
    ],
  },
];

export function createRoutes(routes: AppRoute[]): React.ReactNode {
  return routes.map(
    ({ path, element: Component, index: isIndex, children }, idx) => {
      const wrappedElement: JSX.Element = <Component />;

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

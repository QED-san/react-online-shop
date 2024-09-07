import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages/allPages/Pages";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Pages.Layout />,
    children: [
      { index: true, element: <Pages.Home /> },
      { path: "products", element: <Pages.Products /> },
      { path: "products/:id", element: <Pages.ProductDetail /> },
      { path: "login", element: <Pages.Login /> },
      { path: "signup", element: <Pages.Signup /> },
      {
        element: <AuthenticatedRoutes />,
        children: [
          { path: "dashboard", element: <Pages.Dashboard /> },
          { path: "dashboard/cart", element: <Pages.Cart /> },
          { path: "dashboard/orders", element: <Pages.Orders /> },
        ],
      },
    ],
  },
]);

export default routes;

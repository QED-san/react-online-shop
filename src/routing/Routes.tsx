import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages/allPages/Pages";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import AdminRoutes from "./AdminRoutes";
import * as AdminPages from "../pages/admin/allPages/Pages";

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
      {
        element: <AdminRoutes />,
        children: [
          {
            path: "admin/create_category",
            element: <AdminPages.CreateCategory />,
          },
          {
            path: "admin/update_category",
            element: <AdminPages.UpdateCategory />,
          },
          {
            path: "admin/delete_category",
            element: <AdminPages.DeleteCategory />,
          },
          {
            path: "admin/create_product",
            element: <AdminPages.CreateProduct />,
          },
          {
            path: "admin/update_product",
            element: <AdminPages.UpdateProduct />,
          },
          {
            path: "admin/delete_product",
            element: <AdminPages.DeleteProduct />,
          },
        ],
      },
    ],
  },
]);

export default routes;

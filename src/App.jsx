import { createBrowserRouter, Navigate } from "react-router";
import PublicLayout from "./layout/PublicLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import EditProduct from "./pages/admin/EditProduct";
import AddProducts from "./pages/admin/AddProducts";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import ErrorPage from "./pages/ErrorPage";

const routes = createBrowserRouter([
  {
  path: "/",
  element: <Navigate to="/login" replace />,
},
{
  path: "/login",
  element: <Login />,
},
{
  path: "/home",
  element: <PublicLayout />,
    errorElement: <ErrorPage />,

  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "products/:id",
      element: <ProductDetails />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
  ],
},
{
  path: "/admin",
  element: (
    <ProtectedRoute>
      <AdminLayout />
     </ProtectedRoute>
  ),
    errorElement: <ErrorPage />,

  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "products",
      element: <AdminProducts />,
    },
    {
        path: "add-product",
        element: <AddProducts />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
  ],
},
{
  path: "*",
  element: <NotFound />,
}
]);

export default routes;

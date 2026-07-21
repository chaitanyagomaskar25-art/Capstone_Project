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
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "products",
      element: <AdminProducts />,
    },
  ],
},
]);

export default routes;

import { createBrowserRouter, Navigate } from "react-router";
import PublicLayout from "./layout/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { lazy } from "react";
const Home = lazy(()=>import("./pages/Home"))
const Products = lazy(()=>import("./pages/Products"))
const Cart = lazy(()=>import("./pages/Cart"))
const AdminLayout = lazy(()=>import("./layout/AdminLayout"))
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))
const EditProduct = lazy(()=>import("./pages/admin/EditProduct"))
const AddProducts = lazy(()=>import("./pages/admin/AddProducts"))
const AdminProducts = lazy(()=>import("./pages/admin/Products"))
const ProductDetails = lazy(()=>import("./components/ProductDetails"))
const NotFound = lazy(()=>import("./components/NotFound"))
const ErrorPage = lazy(()=>import("./pages/ErrorPage"))


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

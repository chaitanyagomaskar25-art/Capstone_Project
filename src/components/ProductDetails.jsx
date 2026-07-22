import React, { useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  Navigate,
} from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProductDetails } from "../api/api";
import { useCart, useDispatch } from "../context/CartContext";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ImageOff,
  AlertCircle,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCart() || [];

  const [activeTab, setActiveTab] = useState("features");

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    retry: false,
  });

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  const handleIncrease = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: "REMOVE",
      payload: product.id,
    });
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold">
          Loading Product...
        </h1>
      </div>
    );
  }

  // API Error
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <AlertCircle
          className="text-red-500"
          size={50}
        />

        <h2 className="text-2xl font-bold">
          {error.message}
        </h2>

        <Link
          to="/app/products"
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
        >
          Back To Products
        </Link>
      </div>
    );
  }

  // Product Not Found
  if (
    !product ||
    Object.keys(product).length === 0 ||
    !product.id
  ) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-3xl p-10 flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <ImageOff size={80} />
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={18}
            />

            <span>
              {product.rating?.rate ?? 0}
            </span>

            <span className="text-gray-500">
              ({product.rating?.count ?? 0} Reviews)
            </span>
          </div>

          <h2 className="text-4xl font-bold">
            ₹{Number(product.price).toFixed(2)}
          </h2>

          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Cart */}
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 p-2 rounded-lg"
              >
                <Minus />
              </button>

              <span className="text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="bg-indigo-600 text-white p-2 rounded-lg"
              >
                <Plus />
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <Truck className="mx-auto" />
              <p>Free Shipping</p>
            </div>

            <div className="text-center">
              <ShieldCheck className="mx-auto" />
              <p>1 Year Warranty</p>
            </div>

            <div className="text-center">
              <RotateCcw className="mx-auto" />
              <p>7 Days Return</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
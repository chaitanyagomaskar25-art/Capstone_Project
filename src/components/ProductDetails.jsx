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
  ImageOff,
  AlertCircle,
  Package,
  MessageSquare,
  Tag,
  Calendar,
  User,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCart() || [];

  const [activeTab, setActiveTab] = useState("description");

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

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold">Loading Product...</h1>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <AlertCircle className="text-red-500" size={50} />
        <h2 className="text-2xl font-bold">{error.message}</h2>
        <Link
          to="/app/products"
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Back To Products
        </Link>
      </div>
    );
  }

  // Not Found State
  if (!product || Object.keys(product).length === 0 || !product.id) {
    return <Navigate to="/not-found" replace />;
  }

  // Calculate discounted price
  const originalPrice = product.price ?? 0;
  const discountPct = product.discountPercentage ?? 0;
  const discountedPrice = discountPct > 0 
    ? originalPrice - (originalPrice * discountPct) / 100 
    : originalPrice;

  // Image source fallbacks (supports dummyJSON `thumbnail` or standard `image`)
  const imageUrl = product.thumbnail || product.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-black font-medium transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-10 flex flex-col justify-center items-center relative">
          {discountPct > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
              {discountPct}% OFF
            </span>
          )}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="max-h-96 object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <ImageOff size={80} className="text-gray-400" />
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center gap-3">
            {product.brand && (
              <span className="bg-indigo-600 text-white font-semibold text-xs px-3 py-1 rounded-md uppercase tracking-wide">
                {product.brand}
              </span>
            )}
            <span className="bg-indigo-50 text-indigo-700 font-medium text-xs px-3 py-1 rounded-md capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {/* Ratings & Stock Status */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="fill-amber-400 text-amber-400" size={18} />
              <span className="font-semibold">{product.rating ?? 0}</span>
              <span className="text-gray-500">
                ({product.reviews?.length ?? 0} Reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span
              className={`font-semibold ${
                product.availabilityStatus === "In Stock"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {product.availabilityStatus || `${product.stock} In Stock`}
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-extrabold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </h2>
            {discountPct > 0 && (
              <span className="text-lg text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Minimum Order Quantity & Stock Info */}
          {product.minimumOrderQuantity > 1 && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <Tag size={16} />
              <span>Minimum Order Quantity: <strong>{product.minimumOrderQuantity}</strong> units</span>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="pt-2">
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition"
              >
                <ShoppingBag size={20} />
                Add To Cart
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={handleDecrease}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 text-lg font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="p-2 text-indigo-600 hover:bg-white rounded-lg transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Item(s) in cart
                </span>
              </div>
            )}
          </div>

          {/* Policies & Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Truck className="text-indigo-600 shrink-0" size={22} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Shipping</p>
                <p className="text-xs font-semibold text-gray-800">
                  {product.shippingInformation || "Standard Shipping"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <ShieldCheck className="text-indigo-600 shrink-0" size={22} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Warranty</p>
                <p className="text-xs font-semibold text-gray-800">
                  {product.warrantyInformation || "Standard Warranty"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <RotateCcw className="text-indigo-600 shrink-0" size={22} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Returns</p>
                <p className="text-xs font-semibold text-gray-800">
                  {product.returnPolicy || "Standard Policy"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-indigo-600" size={22} />
            <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 shadow-sm p-5 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-50 text-xs text-gray-500">
                  <User size={14} className="text-gray-400" />
                  <span className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
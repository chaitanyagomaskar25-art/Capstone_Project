import React from "react";
import { Link } from "react-router"; // Import Link
import { useDispatch, useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingBag, ImageOff, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useCart() || [];

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD", payload: product });
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD", payload: product });
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    dispatch({ type: "REMOVE", payload: product.id });
  };

  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-3xl p-3 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      
      {/* Image & Badge Wrapper */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-50/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <ImageOff className="w-8 h-8 text-slate-300" />
        )}

        {/* Category Pill */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-xl uppercase tracking-wider shadow-xs">
            {product.category}
          </span>
        )}

        {/* --- VIEW DETAILS BUTTON OVERLAY --- */}
        <Link
          to={`/home/products/${product.id}`}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl backdrop-blur-md transition-all shadow-xs group-hover:opacity-100 opacity-90 sm:opacity-0"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-2 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title link leading to the details page */}
          <Link to={`/home/products/${product.id}`}>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug hover:text-indigo-600 transition-colors cursor-pointer">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Footer: Price & Dynamic Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              ${product.price}
            </span>
          </div>

          {/* Dynamic Stepper / Cart Button */}
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:text-indigo-600 flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-xs font-bold text-slate-900 w-4 text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
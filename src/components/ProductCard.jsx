import React from "react";
import { useDispatch, useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingBag, ImageOff } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useCart() || [];

  // Find if this specific product is already in the cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Add initial item to cart
  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  // Increment item quantity
  const handleIncrease = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  // Decrement item quantity (removes if quantity reaches 0)
  const handleDecrease = () => {
    dispatch({
      type: "DECREMENT",
      payload: product.id,
    });
  };

  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-3xl p-3 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      
      {/* Image & Badge Wrapper */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-50/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
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
      </div>

      {/* Product Information */}
      <div className="p-2 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Footer: Price & Dynamic Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              ₹{product.price}
            </span>
          </div>

          {/* Dynamic Action Area */}
          {quantity === 0 ? (
            /* First Time: Default "Add to Cart" Button */
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add To Cart
            </button>
          ) : (
            /* Subsequent Times: Quantity Stepper (- quantity +) */
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:text-indigo-600 flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-xs font-bold text-slate-900 w-4 text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                aria-label="Increase quantity"
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
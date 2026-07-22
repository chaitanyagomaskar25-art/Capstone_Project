import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthDispatch } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  LogOut 
} from "lucide-react";

const Navbar = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const cartTotalItem = useCart();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  // Modern active vs inactive navigation link styles
  const getLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
    }`;

  const itemCount = cartTotalItem?.length || 0;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <NavLink to="/home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight leading-none block">
              Nexus
            </span>
            <span className="text-[10px] text-indigo-600 font-bold tracking-wider uppercase">
              Storefront
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/home" end className={getLinkStyle}>
            <Home className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/home/products" className={getLinkStyle}>
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Products</span>
          </NavLink>

          <NavLink to="/home/cart" className={getLinkStyle}>
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Cart</span>

            {/* Animated Dynamic Cart Counter Badge */}
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full leading-none shrink-0 shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer group"
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-rose-500 group-hover:-translate-x-0.5 transition-all" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
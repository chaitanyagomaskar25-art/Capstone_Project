import React from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Truck 
} from 'lucide-react'
import CartCard from '../components/CartCard'
import { useCart, useDispatch } from '../context/CartContext'

const Cart = () => {
  const cart = useCart()
  const dispatch = useDispatch()

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const formattedTotal = totalPrice.toLocaleString('en-IN')

  // Free shipping progress logic (e.g., target ₹2,000 for free shipping)
  const freeShippingThreshold = 2000
  const progressPercent = Math.min((totalPrice / freeShippingThreshold) * 100, 100)
  const amountLeftForFreeShipping = freeShippingThreshold - totalPrice

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  // Empty Cart State
  if (!cart || cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto py-16 px-4 text-center space-y-5"
      >
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our latest products and start shopping!
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/home/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-6"
    >
      
      {/* Header Bar */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">
            You have <span className="font-semibold text-indigo-600">{cart.length}</span> {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: List of Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((product) => (
              <motion.div key={product.id} variants={itemVariants} layout>
                <CartCard item={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm space-y-6 lg:sticky lg:top-24"
        >
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          {/* Pricing Details */}
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">$ {formattedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">
                {amountLeftForFreeShipping <= 0 ? 'FREE' : '$ 99'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="text-slate-400">Calculated at checkout</span>
            </div>
          </div>

         

          {/* Total Row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Amount</p>
              <p className="text-2xl font-extrabold text-slate-900">$ {formattedTotal}</p>
            </div>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Best Value
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2">
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed 256-Bit SSL Encryption</span>
          </div>
        </motion.div>

      </div>

    </motion.div>
  )
}

export default Cart
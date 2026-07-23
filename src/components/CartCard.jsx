import React from 'react'
import { useDispatch } from '../context/CartContext'

const CartCard = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-sky-200 transition-all">
      
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Image Frame */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Title & Price */}
        <div className="space-y-1 min-w-0 flex-1">
          <h2 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
            {item.title}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-900">
            ${item.price}
          </p>
        </div>
      </div>

      {/* Quantity Controls & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        
        {/* Quantity Increment/Decrement Counter */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-1">
          <button
            onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200/60 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all font-bold text-sm cursor-pointer shadow-2xs"
            title="Decrease quantity"
          >
            -
          </button>

          <span className="w-8 text-center text-xs font-bold text-slate-800">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200/60 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all font-bold text-sm cursor-pointer shadow-2xs"
            title="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>

    </div>
  )
}

export default CartCard
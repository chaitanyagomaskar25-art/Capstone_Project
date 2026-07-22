import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuthDispatch } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  Boxes, 
  PlusCircle, 
  LogOut, 
  Store 
} from 'lucide-react'

const SideBar = () => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login", { replace: true })
  }

  // Modern active vs. inactive link styling
  const getLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
    }`

  return (
    <aside className="w-64 h-full min-h-screen bg-white/80 backdrop-blur-md p-4 flex flex-col justify-between select-none">
      
      {/* Top Branding & Navigation */}
      <div className="space-y-6">
        
        {/* Brand Logo Header */}
        <div className="px-3 py-2 flex items-center gap-3 border-b border-slate-100/80 pb-4">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">Nexus</h2>
            <p className="text-[10px] text-indigo-600 font-bold tracking-wider uppercase">Admin Portal</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>

          {/* Dashboard Link */}
          <NavLink to="/admin" end className={getLinkStyle}>
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            Dashboard
          </NavLink>

          {/* Products Catalog Link */}
          <NavLink to="/admin/products" className={getLinkStyle}>
            <Boxes className="w-4 h-4 shrink-0" />
            Products
          </NavLink>

          {/* Add Product Link */}
          <NavLink to="/admin/add-product" className={getLinkStyle}>
            <PlusCircle className="w-4 h-4 shrink-0" />
            Add Product
          </NavLink>
        </nav>

      </div>

      {/* Footer Section: Logout Action */}
      <div className="pt-4 border-t border-slate-100/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer group"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-600 group-hover:text-rose-500 group-hover:-translate-x-0.5 transition-all" />
          Log Out
        </button>
      </div>

    </aside>
  )
}

export default SideBar
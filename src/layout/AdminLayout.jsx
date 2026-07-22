import React from 'react'
import SideBar from '../components/admin/SideBar'
import { Outlet } from 'react-router'
import { Bell, ShieldCheck, ChevronDown } from 'lucide-react'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50/80 text-slate-800 antialiased">
      
      {/* Permanent Fixed Sidebar Container */}
      <aside className="w-64 bg-white shadow-xs shrink-0 hidden md:block z-20">
        <SideBar />
      </aside>

      {/* Main Content Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Minimal Executive Header Bar */}
        <header className="h-16 bg-white/90 backdrop-blur-md shadow-xs px-8 flex items-center justify-between sticky top-0 z-10">
          
          {/* Left: Section Context */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Admin Console</h2>
            <p className="text-[11px] text-slate-400 font-medium">Management & Operations</p>
          </div>

          {/* Right: Actions & Admin Profile */}
          <div className="flex items-center gap-5">
            
            {/* Notifications */}
            <button 
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-indigo-600 rounded-full absolute top-2 right-2 ring-2 ring-white" />
            </button>

            <div className="h-5 w-px bg-slate-200/80" />

            {/* Profile Dropdown Pillar */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                  System Admin
                </p>
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 inline shrink-0" /> Authorized
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>

          </div>
        </header>

        {/* Main Workspace Canvas */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}

export default AdminLayout
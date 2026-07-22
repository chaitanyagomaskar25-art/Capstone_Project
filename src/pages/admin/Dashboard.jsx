import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Package, 
  ShoppingBag, 
  Activity, 
  ArrowRight, 
  TrendingUp, 
  Boxes, 
  Sparkles,
  ShieldCheck,
  Layers,
  Zap,
  Clock,
  DollarSign
} from 'lucide-react'

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 max-w-7xl mx-auto"
    >
      
      {/* Bento Grid Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Hero Welcome Tile (Spans 2 cols) */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2 bg-linear-to-br from-indigo-600 to-indigo-800 text-white p-7 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          {/* Ambient Lighting Background */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" /> Executive Command
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Nexus Operations</h1>
            <p className="text-xs text-indigo-100/90 leading-relaxed max-w-md">
              Store systems are fully operational. Manage catalog expansions, monitor order fulfillment, and configure parameters seamlessly.
            </p>
          </div>

          <div className="pt-6 flex items-center gap-3 relative z-10">
            <Link
              to="/admin/add-product"
              className="inline-flex items-center gap-2 bg-white text-indigo-900 hover:bg-indigo-50 text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 bg-indigo-700/60 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl backdrop-blur-md transition-all cursor-pointer"
            >
              View Catalog
            </Link>
          </div>
        </motion.div>

        {/* Stat Tile 1: Total Products */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="space-y-1 mt-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Inventory</p>
            <h3 className="text-3xl font-extrabold text-slate-900">124</h3>
            <p className="text-[10px] text-slate-400 font-medium">Active catalog items</p>
          </div>
        </motion.div>

        {/* Stat Tile 2: Active Orders */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xs flex flex-col justify-between group hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
              4 pending
            </span>
          </div>
          <div className="space-y-1 mt-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Orders</p>
            <h3 className="text-3xl font-extrabold text-slate-900">18</h3>
            <p className="text-[10px] text-slate-400 font-medium">Ready for dispatch</p>
          </div>
        </motion.div>

      </div>

      {/* Secondary Row: Quick Management & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Quick Management Cards (Spans 2 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Quick Management Hub
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link
              to="/admin/products"
              className="group bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex items-start gap-4 cursor-pointer"
            >
              <div className="p-3.5 bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl text-slate-600 transition-colors shrink-0">
                <Boxes className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  Manage Catalog
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Search, edit, or remove products instantly.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </Link>

            <Link
              to="/admin/add-product"
              className="group bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex items-start gap-4 cursor-pointer"
            >
              <div className="p-3.5 bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl text-slate-600 transition-colors shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  Publish Item
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Upload new stock details and prices.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </Link>

          </div>
        </motion.div>

        {/* System Health / Status Pillar */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            System Status
          </h2>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> API Gateway
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Operational</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> Security Protocol
              </span>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Secured</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" /> Uptime
              </span>
              <span className="text-xs font-bold text-slate-800 font-mono">99.98%</span>
            </div>
          </div>
        </motion.div>

      </div>

    </motion.div>
  )
}

export default Dashboard
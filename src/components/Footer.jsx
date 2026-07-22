import React from 'react'
import { Link } from 'react-router'
import { Store} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md select-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <Link to="/home" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <Store className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                Nexus<span className="text-indigo-600">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Your modern destination for everyday tech & lifestyle essentials.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <Link to="/home" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/home/products" className="hover:text-indigo-600 transition-colors">
              Shop
            </Link>
            <Link to="/home/cart" className="hover:text-indigo-600 transition-colors">
              Cart
            </Link>
           
          </div>

          {/* Social Links (Inline SVGs) */}
          <div className="flex items-center gap-3 text-slate-400">
            {/* X / Twitter */}
            <a href="#twitter" className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="#github" className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#instagram" className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

        </div>

        {/* Divider & Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-400">
          <p>© {new Date().getFullYear()} Nexus Store. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
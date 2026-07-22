import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sparkles, ArrowRight } from 'lucide-react'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
    
      {/* Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-xs transition-all duration-300">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>

      {/* Footer Container */}
      <footer className="mt-auto bg-white/90 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <Footer />
      </footer>

    </div>
  )
}

export default PublicLayout
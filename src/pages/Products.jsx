import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  AlertTriangle, 
  PackageSearch, 
  ArrowUpDown, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { getProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import useDebounce from '../hook/useDebouunce';

const Products = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60,
    gcTime: 5000 * 60,
    refetchInterval: 5000 * 60,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const processedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const title = product?.title ?? "";
      const input = debouncedSearch ?? "";
      return title.toLowerCase().includes(input.toLowerCase());
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "title-asc") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return result;
  }, [products, debouncedSearch, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const sortOptions = [
    { id: 'default', label: 'Featured / Default' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'title-asc', label: 'Alphabetical: A to Z' },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-7 bg-slate-200 rounded-lg w-36"></div>
            <div className="h-4 bg-slate-100 rounded-lg w-48"></div>
          </div>
          <div className="h-10 bg-slate-100 rounded-full w-full sm:w-80"></div>
        </div>

        <div className="flex gap-6">
          <div className="hidden md:block w-64 bg-white p-6 rounded-2xl shadow-sm h-80 animate-pulse space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/2"></div>
            <div className="space-y-2 pt-2">
              <div className="h-8 bg-slate-100 rounded-xl"></div>
              <div className="h-8 bg-slate-100 rounded-xl"></div>
              <div className="h-8 bg-slate-100 rounded-xl"></div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 space-y-3 shadow-sm animate-pulse">
                <div className="h-48 bg-slate-100 rounded-xl"></div>
                <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md text-center space-y-4 my-12"
      >
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Failed to load products</h2>
          <p className="text-xs text-slate-500 mt-1">{error?.message || "An unexpected error occurred."}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header & Search Control Bar */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Products</h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <span className="font-semibold text-indigo-600">{processedProducts.length}</span> of {products.length} available items
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-2xl flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Sort
          </button>

          {/* Style 1: Floating Glass Pill */}
          <div className="relative w-full md:w-96">
            <div className="flex items-center w-full bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300 px-4 py-2.5">
              <Search className="w-4 h-4 text-indigo-600 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Type to search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs font-medium bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-2 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid with Sidebar Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Desktop Sidebar */}
        <motion.aside 
          variants={itemVariants}
          className="hidden md:block w-64 shrink-0 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm h-fit space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
              Sort By
            </span>
            {sortBy !== 'default' && (
              <button 
                onClick={() => setSortBy('default')}
                className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {sortOptions.map((option) => {
              const isActive = sortBy === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {option.label}
                  {isActive && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </motion.aside>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white p-4 rounded-2xl shadow-sm space-y-3"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Sort Options</div>
              <div className="grid grid-cols-1 gap-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-left px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between ${
                      sortBy === option.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {option.label}
                    {sortBy === option.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Cards Grid Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {processedProducts.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {processedProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants} layout>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center space-y-4 shadow-sm"
              >
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <PackageSearch className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">No products found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    We couldn't find anything matching <span className="font-semibold text-slate-800">"{debouncedSearch}"</span>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearch("");
                    setSortBy("default");
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default Products;
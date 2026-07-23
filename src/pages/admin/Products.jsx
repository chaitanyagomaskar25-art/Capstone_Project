import React, { useState } from 'react'
import { deleteProduct, getProducts } from '../../api/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  PackageX, 
  AlertCircle, 
  Package, 
  Loader2,
  X,
  SlidersHorizontal
} from 'lucide-react'

const Products = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      mutation.mutate(id)
    }
  }

  // Filter products by search term
  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xs space-y-3">
          <div className="h-6 bg-slate-200/80 rounded-md w-48"></div>
          <div className="h-3 bg-slate-200/80 rounded-md w-24"></div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xs p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-slate-100/80 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    )
  }

  // Error State
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xs text-center space-y-3"
      >
        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Failed to load products</h2>
          <p className="text-xs text-rose-500 mt-1">{error?.message || 'Something went wrong.'}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      
      {/* Page Header Bar */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-indigo-600" />
            Product Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Total Inventory Items: <span className="font-semibold text-indigo-600">{data.length}</span>
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Modern Search & Action Toolbar */}
      {data.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Enhanced Search Input */}
          <div className="relative w-full sm:max-w-md flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-600" />
            <input
              type="text"
              placeholder="Search products by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all"
            />
            {/* Clear Input Button */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results Badge & Context */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
            {searchTerm && (
              <span className="text-[11px] font-medium bg-indigo-50/70 text-indigo-700 px-3 py-1.5 rounded-lg">
                Showing <span className="font-bold">{filteredData.length}</span> of {data.length}
              </span>
            )}
            
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium ml-auto sm:ml-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Live Search</span>
            </div>
          </div>

        </div>
      )}

      {/* Empty State */}
      {filteredData.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xs p-12 text-center text-slate-500 space-y-3">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <PackageX className="w-8 h-8" />
          </div>
          <div>
            <p className="font-bold text-slate-900">No products found</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchTerm ? (
                <>
                  No items match "<span className="font-semibold text-slate-700">{searchTerm}</span>". Try clearing your search filter.
                </>
              ) : (
                'Start by adding your first product to the inventory.'
              )}
            </p>
          </div>
        </div>
      ) : (
        /* Data Table View */
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                <AnimatePresence>
                  {filteredData.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      
                      {/* Thumbnail & Title */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0 p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="max-w-xs sm:max-w-md">
                            <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-[10px] font-medium text-slate-400 mt-0.5">ID: #{product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                        ${product.price}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors inline-flex items-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            disabled={mutation.isPending}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {mutation.isPending ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>

                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </motion.div>
  )
}

export default Products
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit3, AlertCircle, Loader2 } from 'lucide-react'
import { getProductDetails, updateProduct } from '../../api/api'
import ProductForm from '../../components/admin/ProductForm'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch Existing Product Data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetails(id),
  })

  // Update Mutation
  const mutation = useMutation({
    mutationFn: (updatedProduct) => updateProduct({ id, product: updatedProduct }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      queryClient.invalidateQueries({
        queryKey: ['product', id],
      })
      navigate('/admin/products')
    },
  })

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs space-y-3">
          <div className="h-3.5 bg-slate-200/80 rounded-md w-28"></div>
          <div className="h-7 bg-slate-200/80 rounded-lg w-52"></div>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
          <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
          <div className="h-28 bg-slate-100 rounded-xl w-full"></div>
        </div>
      </div>
    )
  }

  // Error Fetching Product
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white/90 backdrop-blur-md shadow-xs p-8 rounded-2xl text-center space-y-4"
      >
        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Failed to load product details</h2>
          <p className="text-xs text-rose-500 mt-1">{error?.message || 'Product not found.'}</p>
        </div>
        <div className="pt-2">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Products
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 mb-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Edit3 className="w-6 h-6 text-indigo-600" />
            Edit Product
          </h1>
          <p className="text-xs text-slate-500">
            Updating item <span className="font-semibold text-indigo-600">#{id}</span>
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs relative overflow-hidden">
        
        {/* Mutation Error Alert */}
        {mutation.isError && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <div>
              <p className="font-bold text-slate-900">Failed to update product</p>
              <p className="mt-0.5 text-rose-600">{mutation.error?.message || 'An unexpected error occurred.'}</p>
            </div>
          </motion.div>
        )}

        {/* Form Area */}
        <div className={mutation.isPending ? 'opacity-40 pointer-events-none transition-opacity duration-200' : ''}>
          <ProductForm
            initialData={data}
            onSubmit={(updatedData) => mutation.mutate(updatedData)}
            buttonText={mutation.isPending ? 'Updating...' : 'Update Product'}
          />
        </div>

        {/* Loading Overlay when Submitting */}
        {mutation.isPending && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-bold text-slate-800">Saving changes...</p>
          </div>
        )}

      </div>

    </motion.div>
  )
}

export default EditProduct
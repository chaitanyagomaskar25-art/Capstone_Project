import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, Loader2, PlusCircle } from "lucide-react";
import { addProducts } from "../../api/api";
import ProductForm from "../../components/admin/ProductForm";

const AddProducts = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["products"],
      });
      navigate("/admin/products");
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      
      {/* Top Header Card with Back Navigation */}
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
            <PlusCircle className="w-6 h-6 text-indigo-600" />
            Add New Product
          </h1>
          <p className="text-xs text-slate-500">
            Fill out the details below to publish a new product to your catalog.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xs relative overflow-hidden">
        
        {/* Error Alert Box */}
        {mutation.isError && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <div>
              <p className="font-bold text-slate-900">Failed to add product</p>
              <p className="mt-0.5 text-rose-600">{mutation.error?.message || "An unexpected error occurred."}</p>
            </div>
          </motion.div>
        )}

        {/* Product Form Component */}
        <div className={mutation.isPending ? "opacity-40 pointer-events-none transition-opacity duration-200" : ""}>
          <ProductForm
            initialData={null}
            onSubmit={handleSubmit}
            buttonText={mutation.isPending ? "Adding Product..." : "Add Product"}
          />
        </div>

        {/* Loading Overlay */}
        {mutation.isPending && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-bold text-slate-800">Creating product...</p>
          </div>
        )}

      </div>

    </motion.div>
  );
};

export default AddProducts;
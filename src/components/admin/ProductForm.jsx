import React, { useEffect, useState } from "react";
import { 
  Tag, 
  IndianRupee, 
  Image as ImageIcon, 
  FileText, 
  Check, 
  ImageOff,
  FolderTree,
  DollarSign
} from "lucide-react";

const ProductForm = ({ initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        price: initialData.price || "",
        category: initialData.category || "",
        image: initialData.image || "",
        description: initialData.description || "",
      });
      setImgError(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") setImgError(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.price ||
      !formData.category.trim() ||
      !formData.image.trim() ||
      !formData.description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Row 1: Title & Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Title Field */}
        <div className="md:col-span-2 space-y-1.5">
          <label htmlFor="title" className=" text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-600" />
            Product Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Wireless Noise-Canceling Headphones"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all"
          />
        </div>

        {/* Category Field */}
        <div className="space-y-1.5">
          <label htmlFor="category" className=" text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-indigo-600" />
            Category <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="e.g. Electronics"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all"
          />
        </div>

      </div>

      {/* Row 2: Price & Image URL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Price Field */}
        <div className="space-y-1.5">
          <label htmlFor="price" className=" text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
            Price ($) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full pl-8 pr-4 py-2.5 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all"
            />
          </div>
        </div>

        {/* Image URL & Preview */}
        <div className="md:col-span-2 space-y-1.5">
          <label htmlFor="image" className=" text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
            Image URL <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              id="image"
              name="image"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all"
            />

            {/* Live Thumbnail Box */}
            <div className="w-10 h-10 rounded-xl bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center p-1 border border-slate-100 shadow-xs">
              {formData.image && !imgError ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <ImageOff className="w-4 h-4 text-slate-300" />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Description Field (Resize Disabled) */}
      <div className="space-y-1.5">
        <label htmlFor="description" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Provide a detailed description of the product features, build quality, and specifications..."
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-xs bg-slate-50/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 placeholder:text-slate-400 font-medium transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          {buttonText}
        </button>
      </div>

    </form>
  );
};

export default ProductForm;
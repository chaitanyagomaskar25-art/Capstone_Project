import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import { useAuthDispatch } from "../context/AuthContext";

const Login = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Helper to autofill demo admin credentials
  const fillDemoAdmin = () => {
    setFormData({
      email: "admin@gmail.com",
      password: "admin123",
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock Admin Login
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      dispatch({
        type: "LOGIN",
        payload: "admin",
      });

      navigate("/admin");
      return;
    } else if (formData.email && formData.password) {
      dispatch({
        type: "LOGIN",
        payload: "user",
      });

      navigate("/home");
      return;
    }

    setError("Invalid Email or Password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-87.5 h-87.5 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl space-y-6"
      >
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
         
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to access your ShopVibe account
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 bg-rose-50 text-rose-600 text-xs text-center font-medium rounded-2xl flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                Password
              </label>
             
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 text-xs bg-slate-50/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default Login;
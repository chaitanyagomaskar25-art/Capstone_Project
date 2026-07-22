import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, RefreshCw, ShoppingBag, ShieldCheck } from 'lucide-react';

const Home = () => {
  // Animation Variants for orchestrated entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'Express Shipping',
      description: 'Free next-day delivery on all orders over $50, tracked straight to your door.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: 'Buyer Protection',
      description: 'Shop with confidence using our 100% secure checkout and fraud prevention.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-indigo-600" />,
      title: 'Hassle-Free Returns',
      description: 'Not fully satisfied? Return any item within 30 days for a full refund.',
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 overflow-hidden relative border-none outline-none">
      {/* Background Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none animate-pulse border-none" />
      <div className="absolute top-1/3 right-10 w-100 h-100 bg-purple-200/30 rounded-full blur-3xl pointer-events-none border-none" />

      {/* Main Container */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 pt-24 pb-16 relative z-10 border-none outline-none"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6 border-none">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700 border-0 outline-none">
            <Sparkles className="w-3.5 h-3.5" />
            New Season Collection Is Here
          </span>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 border-none">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent border-none"
          >
            Elevate your lifestyle with premium essentials.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 font-normal border-none"
          >
            Discover curated collections, handcrafted quality, and timeless designs delivered straight to your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center border-none"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-colors flex items-center gap-2 group cursor-pointer border-0 outline-none"
            >
              Shop Collection
              <ShoppingBag className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2 border-0 outline-none"
            >
              Explore Trending
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </motion.button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.section
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 my-20 border-none"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-xl transition-all border-0 outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 border-0">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Quick Stats Bar */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white shadow-md text-center border-0 outline-none"
        >
          {[
            { value: '100k+', label: 'Happy Customers' },
            { value: '4.9★', label: 'Customer Rating' },
            { value: '24/7', label: 'Customer Support' },
            { value: '30-Day', label: 'Money Back Guarantee' },
          ].map((stat, i) => (
            <div key={i} className="border-none">
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
};

export default Home;
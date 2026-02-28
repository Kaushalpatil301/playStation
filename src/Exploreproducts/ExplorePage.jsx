import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center max-w-3xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Explore New Horizons
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
          Welcome to the explore page! This is a dedicated space where you can discover upcoming features, community highlights, and the latest gaming trends.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full font-semibold transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ExplorePage;

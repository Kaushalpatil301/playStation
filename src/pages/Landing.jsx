import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { SiPlaystation } from "react-icons/si";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center relative overflow-hidden w-full m-0 p-0">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-4xl px-6 flex flex-col items-center"
      >
        <SiPlaystation className="w-24 h-24 text-blue-500 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Unite Your Squad
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Level up your gaming experience. Sync with your friends, vote on your
          next adventure, and communicate seamlessly in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/squadsync"
              className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)]"
            >
              <Users className="w-6 h-6" />
              <span>Squad Sync</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold text-lg transition-all backdrop-blur-sm"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span>Explore New Page</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Optional decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-sm text-gray-500 font-medium"
      >
        The Ultimate Next-Gen Gaming Hub
      </motion.div>
    </div>
  );
};

export default LandingPage;

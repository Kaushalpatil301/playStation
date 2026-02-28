import React from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1220] text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

import React from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#00040f] text-white font-sans selection:bg-[#00f3ff]/30">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-0">
        {/* Global base blue glow */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#00040f]/80 to-[#00040f]" />

        {children}
      </main>
    </div>
  );
}

import React from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  // Show sidebar ONLY on syncsquad-related pages
  const syncSquadPaths = [
    "/squadsync",
    "/voice",
    "/chat",
    "/voting",
    "/community",
  ];
  const showSidebar = syncSquadPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#00040f] text-white font-sans selection:bg-[#00f3ff]/30">
      {showSidebar && <Sidebar />}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-0">
        {/* Global base blue glow */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#00040f]/80 to-[#00040f]" />

        {children}
      </main>
    </div>
  );
}

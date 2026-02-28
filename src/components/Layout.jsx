import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { SiPlaystation } from "react-icons/si";

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#00040f] text-white font-sans selection:bg-[#00f3ff]/30 relative">
      {showSidebar && (
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main
        className={`flex-1 flex flex-col min-w-0 ${showSidebar ? "h-screen overflow-hidden" : "min-h-screen overflow-y-auto"} relative z-0`}
      >
        {/* Global base blue glow */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#00040f]/80 to-[#00040f]" />

        {/* Mobile Header for Sidebar pages */}
        {showSidebar && (
          <div className="md:hidden flex items-center justify-between p-4 bg-[#000512]/80 backdrop-blur-md border-b border-[#0e1a38] z-30 sticky top-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col items-center justify-center">
              <SiPlaystation className="text-[#00f3ff] w-6 h-6 mb-1" />
            </div>
            <div className="w-10"></div>{" "}
            {/* Spacer to keep the icon centered */}
          </div>
        )}

        <div
          className={`flex-1 w-full h-full relative ${showSidebar ? "overflow-y-auto" : ""}`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Mic, MessageSquare, BarChart2, Globe, X } from "lucide-react";
import { SiPlaystation } from "react-icons/si";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "PSN Dashboard", path: "/squadsync", icon: Home },
    { label: "Party Chat", path: "/voice", icon: Mic },
    { label: "Messages", path: "/chat", icon: MessageSquare },
    { label: "Play Together", path: "/voting", icon: BarChart2 },
    { label: "Game Hub", path: "/community", icon: Globe },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#000512] border-r border-[#0e1a38] flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-center relative">
          <h1
            onClick={() => {
              navigate("/");
              onClose?.();
            }}
            className="text-xl font-bold tracking-widest text-blue-500 flex flex-col items-center gap-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] cursor-pointer hover:opacity-80 transition-opacity mt-4 md:mt-0"
            style={{ fontFamily: "Orbitron" }}
          >
            <SiPlaystation className="w-16 h-16 text-[#00f3ff]" />
            PLAYSTATION
          </h1>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  isActive
                    ? "bg-blue-600/20 text-[#00f3ff] border border-blue-500/50 shadow-[0_0_15px_rgba(0,195,255,0.2)]"
                    : "text-gray-400 hover:bg-blue-900/20 hover:text-blue-200 border border-transparent"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium font-sans">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Mic, MessageSquare, BarChart2, Globe } from "lucide-react";
import { SiPlaystation } from "react-icons/si";

export default function Sidebar() {
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
    <aside className="w-64 shrink-0 bg-[#000512] border-r border-[#0e1a38] flex flex-col h-full">
      <div className="p-6 text-center">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold tracking-widest text-blue-500 flex flex-col items-center gap-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontFamily: "Orbitron" }}
        >
          <SiPlaystation className="w-16 h-16 text-[#00f3ff]" />
          PLAYSTATION
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
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
  );
}

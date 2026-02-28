import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Mic, MessageSquare, BarChart2, Globe } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Mission Control", path: "/", icon: Home },
    { label: "Voice Lobby", path: "/voice", icon: Mic },
    { label: "Chat Room", path: "/chat", icon: MessageSquare },
    { label: "Voting", path: "/voting", icon: BarChart2 },
    { label: "Community", path: "/community", icon: Globe },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#060a14] border-r border-[#1a2336] flex flex-col h-full">
      <div className="p-6">
        <h1
          className="text-xl font-bold tracking-widest text-[#00f3ff]"
          style={{ fontFamily: "Orbitron" }}
        >
          SQUAD SYNC
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? "bg-[#0b1b3d] text-[#00f3ff] border border-[#00f3ff]/30"
                  : "text-gray-400 hover:bg-[#111827] hover:text-gray-200 border border-transparent"
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

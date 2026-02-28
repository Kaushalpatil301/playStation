import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Mic, MessageSquare, BarChart2, Globe } from "lucide-react";

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
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-[#00f3ff]"
          >
            <path d="M12.043 21.05c-1.396 0-2.825-.333-3.619-.747l-.271-.144v-3.088l.332.181c.78.434 2.054.733 3.327.733 1.054 0 1.543-.207 1.543-.655 0-.487-1.109-.646-2.585-1.026-1.579-.408-3.076-.902-3.076-2.227 0-1.428 1.636-2.091 3.256-2.091 1.488 0 2.502.327 3.125.688l.317.185v3.13l-.337-.17c-.771-.42-1.921-.692-3.153-.692-.937 0-1.365.234-1.365.6 0 .428.903.627 2.378.983 1.956.471 3.275 1 3.275 2.366.002 1.309-1.531 1.984-3.147 1.984M19.645 10.38l-4.542 2.625v7.412h-2.316V2.551l3.75 1.104c2.81 1.054 3.96 2.871 3.96 4.629 0 1.05-.595 1.748-1.503 2.127m-1.564-2.819c0-1.127-1.272-1.9-2.909-2.329l-.071-.019v4.546l.72-.415c1.474-.852 2.26-1.312 2.26-1.783" />
          </svg>
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

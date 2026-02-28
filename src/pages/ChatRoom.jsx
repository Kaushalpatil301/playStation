import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, Activity, Crosshair, ArrowLeft } from "lucide-react";

export default function SquadChatRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: "sys-1",
      type: "system",
      text: "Lobby secured. Voice comms active.",
      timestamp: "10:42 PM",
    },
    {
      id: "msg-1",
      type: "user",
      user: "Phantom_Striker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phantom",
      text: "Yeah, just finishing my loadout. Ready to drop in?",
      timestamp: "10:46 PM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      type: "user",
      user: "Kaushal", // Standardized to your profile for the demo
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-[#050505]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.1)] overflow-hidden relative">
      {/* AMBIENT GLOW */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* HEADER: PLAYSTATION BRANDING */}
      <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02] shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 mr-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
            title="Leave Chat & Return Home"
          >
            <ArrowLeft className="text-gray-300" size={20} />
          </button>
          <div className="bg-blue-500/10 border border-blue-500/30 p-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <Users className="text-blue-400" size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black font-sans tracking-widest text-white uppercase flex items-center gap-2">
              Squad Chat{" "}
              <Crosshair size={16} className="text-blue-500 opacity-50" />
            </h2>
            <p className="text-xs text-blue-400 flex items-center gap-1.5 font-bold tracking-wider mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              4 MEMBERS IN LOBBY
            </p>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 z-10 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center my-6"
                >
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    {msg.text}
                  </span>
                </motion.div>
              );
            }

            const isMe = msg.user === "Kaushal";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-9 h-9 rounded-full bg-[#111] border border-white/20 shrink-0 mt-1 shadow-lg"
                />
                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-gray-300 tracking-wide">
                      {msg.user}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono tracking-tighter">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2.5 text-sm tracking-wide leading-relaxed shadow-xl ${
                      isMe
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                        : "bg-white/5 text-gray-200 rounded-2xl rounded-tl-sm border border-white/10 backdrop-blur-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endOfMessagesRef} className="h-2" />
      </div>

      {/* INPUT AREA: HAPTIC FEEDBACK */}
      <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl shrink-0 z-10">
        <form onSubmit={handleSend} className="flex gap-3 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your strategy..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-blue-600 text-white px-5 rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
          >
            <Send size={18} className="ml-1" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}

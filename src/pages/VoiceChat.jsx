import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Users,
  Activity,
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Smile,
  FileText,
  Image as ImageIcon,
  Film,
  Trophy,
} from "lucide-react";

export default function SquadChatRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Evan Scott",
      text: "Ooo, why don't you say something more",
      timestamp: "11:25 AM",
      avatar: "https://i.pravatar.cc/150?u=evan",
      isMe: false,
    },
    {
      id: 2,
      user: "Kate Johnson",
      text: "Working on the tactical map for the next raid! 🗺️",
      timestamp: "11:26 AM",
      avatar: "https://i.pravatar.cc/150?u=kate",
      isMe: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      user: "Kaushal Patil",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate "Social-First" AI response [cite: 22, 26]
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          user: "PS Assistant",
          text: "Based on your strategy, I recommend checking the new 'Stealth Loadout' in the store! 🎮",
          timestamp: "Just Now",
          avatar: "https://i.pravatar.cc/150?u=ps",
          isMe: false,
          isAI: true,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-transparent text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* LEFT SIDEBAR: PROFILE & FRIENDS [cite: 19] */}
      <div className="w-72 border-r border-white/5 bg-white/[0.01] flex flex-col z-20 backdrop-blur-xl">
        <div className="p-6">
          <button
            onClick={() => navigate("/")}
            className="mb-8 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
          >
            <ArrowLeft size={18} className="text-gray-300" />
          </button>

          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <img
                src="https://i.pravatar.cc/150?u=kaushal"
                className="w-20 h-20 rounded-full border-2 border-blue-500 p-1 shadow-[0_0_20px_rgba(0,114,206,0.3)]"
                alt="Kaushal"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-[#050505] rounded-full" />
            </motion.div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">
              Kaushal Patil
            </h3>
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
              Rank: Platinum Elite
            </span>
          </div>

          <nav className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 px-2">
              Active Squads
            </p>
            {["Ghost Runners", "Apex Legends Crew", "GTA Heist"].map(
              (squad, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${i === 0 ? "bg-blue-600/10 border border-blue-500/20 shadow-lg" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center font-black text-xs">
                    {squad.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{squad}</p>
                    <p className="text-[10px] text-blue-400 font-medium">
                      4 Online
                    </p>
                  </div>
                </div>
              ),
            )}
          </nav>
        </div>
      </div>

      {/* CENTER: IMMERSIVE CHAT [cite: 27, 28] */}
      <div className="flex-1 flex flex-col bg-white/[0.02] relative border-r border-white/5">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
              <Users size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-widest uppercase">
                Squad Lobby
              </h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Encypted Channel // PSN-Secure
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,114,206,0.4)]">
              Voice Chat
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.isMe ? "flex-row-reverse" : ""}`}
              >
                {!msg.isMe && (
                  <img
                    src={msg.avatar}
                    className="w-10 h-10 rounded-full border border-white/10 shadow-xl"
                    alt={msg.user}
                  />
                )}
                <div
                  className={`max-w-[70%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${msg.isAI ? "text-blue-400" : "text-gray-400"}`}
                    >
                      {msg.user} {msg.isAI && "• AI"}
                    </span>
                    <span className="text-[9px] text-gray-600 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-2xl transition-all hover:brightness-110 ${
                      msg.isMe
                        ? "bg-blue-600 text-white rounded-tr-none shadow-[0_5px_20px_rgba(0,114,206,0.2)]"
                        : msg.isAI
                          ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-tl-none backdrop-blur-md italic"
                          : "bg-white/5 border border-white/10 rounded-tl-none backdrop-blur-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex gap-2 p-2 items-center text-gray-500 italic text-[10px]">
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </div>
              Tactical Assistant is typing
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-black/60 border-t border-white/5 backdrop-blur-2xl">
          <form
            onSubmit={handleSend}
            className="relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus-within:border-blue-500/50 transition-all shadow-inner"
          >
            <Paperclip
              className="text-gray-500 cursor-pointer hover:text-blue-400 transition-colors"
              size={20}
            />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-600"
              placeholder="Type your strategy or share a clip..."
            />
            <div className="flex items-center gap-4">
              <Smile
                size={20}
                className="text-gray-500 cursor-pointer hover:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
                type="submit"
                className="bg-blue-600 p-2.5 rounded-xl text-white disabled:opacity-30 shadow-[0_0_20px_rgba(0,114,206,0.5)]"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL: ACHIEVEMENT-BASED UI  */}
      <div className="w-80 border-l border-white/5 bg-black/20 p-6 z-20 flex flex-col gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Lobby Assets
            </h3>
            <Trophy size={14} className="text-yellow-500" />
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-5 border border-white/10 text-center">
            <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-400/30">
              <Activity size={20} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-sm">Squad Progress</h4>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full w-[65%] shadow-[0_0_10px_#3b82f6]" />
            </div>
            <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-tighter">
              65% to Next Trophy
            </p>
          </div>
        </section>

        <section className="space-y-4 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Shared Files
          </div>
          {[
            {
              icon: <FileText size={16} />,
              label: "Raid_Strategy.pdf",
              size: "2.4MB",
              color: "text-blue-400",
            },
            {
              icon: <ImageIcon size={16} />,
              label: "Boss_Spawn_Map.png",
              size: "5.1MB",
              color: "text-emerald-400",
            },
            {
              icon: <Film size={16} />,
              label: "Triple_Kill_Clip.mp4",
              size: "42MB",
              color: "text-purple-400",
            },
          ].map((item, i) => (
            <motion.div
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
              key={i}
              className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-white/5 rounded-lg ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold truncate w-32">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-gray-500">{item.size}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <footer className="pt-4 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">
            Project PlayStation // TSEC CodeCell
          </p>
        </footer>
      </div>

      {/* AMBIENT LIGHTING EFFECTS  */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-900/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
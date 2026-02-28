import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, Activity } from "lucide-react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      id: "sys-1",
      type: "system",
      text: "X_QUANTUM_LEAP_X created the voice lobby.",
      timestamp: "10:42 PM",
    },
    {
      id: "msg-1",
      type: "user",
      user: "X_QUANTUM_LEAP_X",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quantum",
      text: "Hey everyone, ready to drop in?",
      timestamp: "10:45 PM",
    },
    {
      id: "msg-2",
      type: "user",
      user: "Phantom_Striker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phantom",
      text: "Yeah, just finishing my loadout.",
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
      user: "You",
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
    <div className="flex flex-col h-full bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#0B1220]/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <Users className="text-blue-400" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono tracking-wide text-gray-200">
              SQUAD CHAT
            </h2>
            <p className="text-xs text-green-400 flex items-center gap-1 font-medium">
              <Activity size={10} /> 4 SQUAD MEMBERS ONLINE
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center my-4 text-xs font-mono text-gray-500"
                >
                  <span className="bg-[#0B1220] px-3 py-1 rounded-full border border-gray-800">
                    {msg.text} • {msg.timestamp}
                  </span>
                </motion.div>
              );
            }

            const isMe = msg.user === "You";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 shrink-0 mt-1"
                />
                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 font-mono">
                      {msg.user}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endOfMessagesRef} className="h-1" />
      </div>

      <div className="p-4 border-t border-gray-800 bg-[#0B1220]/50 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message to squad..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-blue-600 text-white px-5 rounded-xl flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

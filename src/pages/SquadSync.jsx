import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Zap, Shield, ChevronRight, Gamepad2, Radio, Crosshair, Play } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   HAPTIC ANIMATION CONFIG
────────────────────────────────────────────────────────────── */
const hapticTap = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

/* ──────────────────────────────────────────────────────────────
   PORTAL OVERLAY (Warm Theme)
────────────────────────────────────────────────────────────── */
function PortalOverlay({ onComplete }) {
  return (
    <motion.div
      key="portal"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A0B0E]/80 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 20], opacity: [0, 1, 0] }}
        transition={{ duration: 1, ease: "easeInOut", times: [0, 0.4, 1] }}
        className="rounded-full"
        style={{
          width: 100,
          height: 100,
          background: "radial-gradient(circle, #f43f5e 0%, #ea580c 50%, transparent 80%)",
          boxShadow: "0 0 100px 40px rgba(244,63,94,0.6)",
        }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MOCK DATA WITH HIGH-IMPACT IMAGERY
────────────────────────────────────────────────────────────── */
const ACTIVE_LOBBIES = [
  { 
    id: 1, name: "Chill Ranked Drop", game: "Apex Legends", players: "2/3", status: "LIVE", col: "col-span-1 md:col-span-2",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: 2, name: "Late Night Grind", game: "CS2", players: "5/5", status: "FULL", col: "col-span-1",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3, name: "Story Mode Co-op", game: "Uncharted 4", players: "1/2", status: "WAITING", col: "col-span-1",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop" 
  },
];

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
export default function SquadSync() {
  const navigate = useNavigate();
  const [portalActive, setPortalActive] = useState(false);

  const handleJoin = () => {
    setPortalActive(true);
  };

  return (
    <div className="min-h-screen bg-[#14080A] text-white p-6 md:p-10 overflow-hidden relative font-sans">
      
      {/* AMBIENT WARM GLOWS (Matching the reference UI) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-800/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-700/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence>
        {portalActive && (
          <PortalOverlay
            onComplete={() => {
              setPortalActive(false);
              navigate("/voice");
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-1 flex items-center gap-3">
              <Gamepad2 size={36} className="text-rose-500" />
              Mission Control
            </h1>
            <p className="text-white/40 font-medium tracking-wide text-sm">
              Good evening, <span className="text-white">Kaushal</span>
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-2.5 rounded-full backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-sm tracking-wide text-white/80">45 Friends Online</span>
          </div>
        </motion.div>

        {/* HERO FEATURED SQUAD (Cinematic Imagery + Glassmorphism) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative w-full rounded-[2.5rem] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-h-[400px] flex flex-col justify-end"
        >
          {/* Hero Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?q=80&w=2000&auto=format&fit=crop')" }}
          />
          {/* Smooth Fade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14080A] via-[#14080A]/60 to-transparent" />
          <div className="absolute inset-0 bg-rose-900/10 mix-blend-overlay" />

          {/* Hero Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="bg-white/20 backdrop-blur-md border border-white/10 w-fit px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-[0.1em] flex items-center gap-2">
                <Zap size={14} className="fill-rose-400 text-rose-400" />
                <span>POPULAR LOBBY</span>
              </div>

              <div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2 drop-shadow-xl">
                  Valorant
                </h2>
                <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                  Join the Diamond Push. We need a solid Initiator to lock down the site. Comms are live.
                </p>
              </div>

              {/* Avatar Stack like the reference image */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-full border-2 border-[#14080A] bg-gray-800" alt="player" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" className="w-10 h-10 rounded-full border-2 border-[#14080A] bg-gray-800" alt="player" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-10 h-10 rounded-full border-2 border-[#14080A] bg-gray-800" alt="player" />
                </div>
                <span className="text-white/50 text-sm font-semibold">+ 2 Waiting</span>
              </div>
            </div>

            <div className="shrink-0">
              <motion.button
                {...hapticTap}
                onClick={handleJoin}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#14080A] text-lg font-bold rounded-2xl hover:bg-rose-50 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="bg-[#14080A] p-1.5 rounded-full">
                  <Play size={16} className="text-white fill-white ml-0.5" />
                </div>
                JOIN SQUAD
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ACTIVE LOBBIES BENTO GRID (Image-Heavy) */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold tracking-tight text-white">Active Sectors</h3>
            <span className="text-rose-400 text-sm font-semibold cursor-pointer hover:text-rose-300 transition-colors">See More</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVE_LOBBIES.map((lobby, index) => (
              <motion.div
                key={lobby.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                {...hapticTap}
                className={`${lobby.col} group cursor-pointer relative rounded-[2rem] overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${lobby.image})` }}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14080A]/90 via-[#14080A]/40 to-transparent transition-opacity group-hover:opacity-80" />
                
                {/* Top Tags */}
                <div className="flex justify-between items-start relative z-10 p-6">
                  <span className={`text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border ${lobby.status === 'LIVE' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-white/10 text-white/70 border-white/10'}`}>
                    {lobby.status}
                  </span>
                  <div className="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                    <Users size={14} className="text-white" />
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div className="relative z-10 p-6 mt-auto">
                  <p className="text-xs text-white/60 font-medium tracking-wide mb-1 uppercase">{lobby.game}</p>
                  <h4 className="text-2xl font-bold tracking-tight text-white mb-2">{lobby.name}</h4>
                  
                  <div className="flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-rose-400 text-sm font-semibold">Join Lobby</span>
                    <ChevronRight size={16} className="text-rose-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
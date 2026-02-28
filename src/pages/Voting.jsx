import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  MonitorPlay,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   HAPTIC ANIMATION CONFIG
────────────────────────────────────────────────────────────── */
const hapticTap = {
  whileHover: { scale: 1.02 },
  whileTap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

/* ──────────────────────────────────────────────────────────────
   MOCK DATA (High-Quality Imagery)
────────────────────────────────────────────────────────────── */
const GAMES_LIST = [
  {
    id: 1,
    title: "Valorant",
    developer: "Riot Games",
    category: "Tactical FPS",
    desc: "Lock in your agents. We need a solid Initiator for the Diamond Push tonight.",
    image:
      "https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Apex Legends",
    developer: "Respawn Entertainment",
    category: "Battle Royale",
    desc: "Drop into Olympus. Fast-paced movement and squad synergy required.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Helldivers 2",
    developer: "Arrowhead Game Studios",
    category: "Co-op Shooter",
    desc: "Spread Managed Democracy. High-stakes PvE action for the full squad.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Destiny 2",
    developer: "Bungie",
    category: "MMO Looter-Shooter",
    desc: "Raid practice. Need 6 players for the final boss checkpoint.",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Voting() {
  const navigate = useNavigate();
  const MAX_VOTES = 3;
  const [activeItem, setActiveItem] = useState(GAMES_LIST[0]);
  const [userVotes, setUserVotes] = useState([]); // Array of voted game IDs

  const hasVotedForActive = userVotes.includes(activeItem.id);
  const votesFull = userVotes.length >= MAX_VOTES;

  const handleVote = () => {
    if (hasVotedForActive || votesFull) return;
    setUserVotes([...userVotes, activeItem.id]);
  };

  return (
    <div className="h-full overflow-y-auto bg-transparent text-white p-4 md:p-8 font-sans flex justify-center">
      {/* Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-6">
        {/* 1. TOP NAVIGATION BAR (Matches reference image) */}
        <div className="flex items-center justify-between bg-white/5 border border-blue-500/20 rounded-full px-6 py-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.1)]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#00f3ff]/60 hover:text-[#00f3ff] transition-colors font-semibold text-sm drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]"
          >
            <ChevronLeft size={18} /> Home
          </button>

          <div className="flex items-center gap-6">
            <span className="bg-blue-900/40 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#00f3ff] cursor-pointer hover:bg-blue-600/30 transition shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              WEEKEND PLAYLIST ▾
            </span>
            <div className="font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="text-white/50">Vote Progress</span>
              <span className="text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                {userVotes.length}/{MAX_VOTES}
              </span>
            </div>
          </div>

          <button className="flex items-center gap-2 text-white hover:text-[#00f3ff] transition-colors font-semibold text-sm drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
            Next <ChevronRight size={18} />
          </button>
        </div>

        {/* 2. HERO SECTION (The Active Selection) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-gradient-to-r from-[#000512] to-[#000512]/40 border border-blue-900/50 rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[400px] shadow-[0_0_25px_rgba(0,30,100,0.6)]"
          >
            {/* Left Info Panel */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#00f3ff] text-xs font-bold tracking-[0.1em] mb-4 uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                <MonitorPlay size={14} /> {activeItem.category}
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2 drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                {activeItem.title}
              </h1>
              <p className="text-white/50 font-medium mb-6">
                {activeItem.developer}
              </p>

              <p className="text-white/80 leading-relaxed mb-8 max-w-md">
                {activeItem.desc}
              </p>

              {/* VOTE BUTTON */}
              <div className="flex items-center gap-4 mt-auto">
                <motion.button
                  {...(!hasVotedForActive && !votesFull ? hapticTap : {})}
                  onClick={handleVote}
                  disabled={hasVotedForActive || votesFull}
                  className={`flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    hasVotedForActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                      : votesFull
                        ? "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                        : "bg-[#00f3ff] text-[#000512] hover:bg-white shadow-[0_0_30px_rgba(0,243,255,0.6)]"
                  }`}
                >
                  {hasVotedForActive ? (
                    <>
                      <CheckCircle2 size={20} /> VOTED
                    </>
                  ) : votesFull ? (
                    "NO VOTES LEFT"
                  ) : (
                    <>
                      <Flame size={20} /> CAST VOTE
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Right Image Panel */}
            <div className="flex-1 relative min-h-[300px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#000512] via-transparent to-transparent z-10 hidden md:block" />
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-blue-600/20 mix-blend-color" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. BENTO GRID (The Options) */}
        <div className="bg-black/40 border border-blue-900/30 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-[0_0_15px_rgba(0,30,100,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES_LIST.map((game) => {
              const isSelected = activeItem.id === game.id;
              const isVoted = userVotes.includes(game.id);

              return (
                <motion.div
                  key={game.id}
                  {...(!isSelected ? hapticTap : {})}
                  onClick={() => setActiveItem(game)}
                  className={`relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-blue-900/20 hover:border-blue-500/20"
                  }`}
                >
                  {/* Game Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative mr-4">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-color" />
                    {isVoted && (
                      <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Game Info */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-white font-bold truncate text-sm drop-shadow-[0_0_5px_rgba(0,195,255,0.3)]">
                      {game.title}
                    </h4>
                    <p className="text-blue-200/40 text-xs truncate">
                      {game.developer}
                    </p>
                  </div>

                  {/* Link Icon */}
                  <div
                    className={`shrink-0 p-2 rounded-full ${isSelected ? "bg-[#00f3ff]/20 text-[#00f3ff]" : "bg-white/5 text-white/40"}`}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

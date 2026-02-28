import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Gamepad2,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   DUALSENSE HAPTIC ANIMATION CONFIG
────────────────────────────────────────────────────────────── */
const hapticTap = {
  whileHover: { scale: 1.02 },
  whileTap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

/* ──────────────────────────────────────────────────────────────
   MOCK DATA (PlayStation Centric)
────────────────────────────────────────────────────────────── */
const GAMES_LIST = [
  {
    id: 1,
    title: "Helldivers 2",
    developer: "Arrowhead Game Studios",
    category: "Co-op Shooter",
    desc: "Spread Managed Democracy. High-stakes PvE action for the full squad. DualSense haptics recommended.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Call of Duty: Warzone",
    developer: "Activision",
    category: "Battle Royale",
    desc: "Drop into Urzikstan. Sweaty lobbies, need a solid squad for the resurgence push.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Ghost of Tsushima: Legends",
    developer: "Sucker Punch Productions",
    category: "Action Survival",
    desc: "Defend the gates. Need a skilled Ronin for Nightmare Survival. Mics required.",
    image:
      "https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Destiny 2",
    developer: "PlayStation Studios | Bungie",
    category: "MMO Looter-Shooter",
    desc: "Raid practice. Need 6 Guardians for the final boss checkpoint. Cross-play enabled.",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function GameBaseVoting() {
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
      {/* Ambient PS5 UI Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#0070D1]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-6">
        {/* 1. TOP NAVIGATION BAR */}
        <div className="flex items-center justify-between bg-[#000512]/60 border border-[#0070D1]/20 rounded-full px-6 py-4 backdrop-blur-xl shadow-[0_0_15px_rgba(0,112,209,0.2)]">
          <button
            onClick={() => navigate("/game-base")}
            className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors font-bold text-sm drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]"
          >
            <ChevronLeft size={18} /> Game Base
          </button>

          <div className="flex items-center gap-6">
            <span className="bg-[#0070D1]/20 border border-[#0070D1]/50 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white cursor-pointer hover:bg-[#0070D1]/40 transition shadow-[0_0_10px_rgba(0,112,209,0.3)]">
              PARTY SESSION POLL ▾
            </span>
            <div className="font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="text-white/60">Votes Cast</span>
              <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                {userVotes.length}/{MAX_VOTES}
              </span>
            </div>
          </div>

          <button className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-bold text-sm drop-shadow-[0_0_5px_rgba(0,112,209,0.4)]">
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
            className="w-full bg-[#000512]/80 backdrop-blur-md border border-[#0070D1]/30 rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[400px] shadow-[0_0_25px_rgba(0,30,100,0.6)]"
          >
            {/* Left Info Panel */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center z-10">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-bold tracking-[0.1em] mb-4 uppercase drop-shadow-[0_0_5px_rgba(0,112,209,0.5)]">
                <Gamepad2 size={14} /> {activeItem.category}
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {activeItem.title}
              </h1>
              <p className="text-blue-100/60 font-medium mb-6">
                {activeItem.developer}
              </p>

              <p className="text-white/80 font-medium leading-relaxed mb-8 max-w-md">
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
                      ? "bg-[#0070D1]/20 text-[#0070D1] border border-[#0070D1]/50 cursor-default"
                      : votesFull
                        ? "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                        : "bg-white text-[#000512] hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white"
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
                      <Flame size={20} className="text-[#0070D1]" /> CAST VOTE
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Right Image Panel */}
            <div className="flex-1 relative min-h-[300px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#000512]/90 via-[#000512]/40 to-transparent z-10 hidden md:block" />
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0070D1]/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. BENTO GRID (The Options) */}
        <div className="bg-[#000512]/60 border border-[#0070D1]/20 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-[0_0_15px_rgba(0,30,100,0.5)]">
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
                      ? "bg-[#0070D1]/20 border-[#0070D1]/50 shadow-[0_0_15px_rgba(0,112,209,0.3)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-[#003791]/30 hover:border-[#0070D1]/30"
                  }`}
                >
                  {/* Game Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative mr-4 border border-white/10">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0070D1]/20 mix-blend-color" />
                    {isVoted && (
                      <div className="absolute inset-0 bg-[#0070D1]/80 flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Game Info */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-white font-bold truncate text-sm drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                      {game.title}
                    </h4>
                    <p className="text-blue-100/50 font-medium text-xs truncate mt-0.5">
                      {game.developer}
                    </p>
                  </div>

                  {/* Link Icon */}
                  <div
                    className={`shrink-0 p-2 rounded-full transition-colors ${
                      isSelected
                        ? "bg-white text-[#000512]"
                        : "bg-white/5 text-white/40"
                    }`}
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
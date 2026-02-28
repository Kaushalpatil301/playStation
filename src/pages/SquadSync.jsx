import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Zap, Shield, ChevronRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Portal Overlay (join animation)
────────────────────────────────────────────────────────────── */
function PortalOverlay({ onComplete }) {
  return (
    <motion.div
      key="portal"
      initial={{ scale: 0, opacity: 0, filter: "blur(0px)" }}
      animate={{ scale: 18, opacity: [0, 1, 0], filter: "blur(30px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
    >
      <div
        className="rounded-full"
        style={{
          width: 80,
          height: 80,
          background:
            "radial-gradient(circle, #00f3ff 0%, #0055ff 50%, transparent 80%)",
          boxShadow: "0 0 60px 20px rgba(0,243,255,0.6)",
        }}
      />
    </motion.div>
  );
}

export default function SquadSync() {
  const navigate = useNavigate();
  const [portalActive, setPortalActive] = useState(false);

  const handleJoin = () => {
    setPortalActive(true);
  };

  return (
    <div className="flex flex-col gap-6">
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

      <div className="mb-4">
        <h1 className="text-3xl font-black tracking-widest text-[#e0e6ed] font-mono mb-2">
          MISSION CONTROL
        </h1>
        <p className="text-[#8b9bb4]">
          Your gaming command center — ready up and drop in.
        </p>
      </div>

      <motion.section
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0f2e] via-[#0d1a3b] to-[#050b1a] p-6 md:p-10 border border-blue-500/20 shadow-[0_0_60px_rgba(0,85,255,0.18)]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-4">
            <div className="text-[#00f3ff] text-xs font-bold tracking-[0.2em] font-mono flex items-center gap-2">
              <Zap size={14} />
              <span>FEATURED SQUAD</span>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-wide mb-2 uppercase">
                Diamond Push Tonight
              </h2>
              <p className="text-blue-200 text-lg">Valorant • Diamond III</p>
            </div>

            <div className="flex items-center gap-6 mt-2 text-sm text-blue-200 font-mono">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00f3ff]" />
                <span>LEADER: X_QUANTUM_LEAP_X</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#00f3ff]" />
                <span>4 / 5 PLAYERS</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center bg-blue-950/40 p-6 rounded-2xl border border-blue-500/30 backdrop-blur-md">
            <span className="text-blue-300 font-mono text-sm tracking-widest mb-4">
              STATUS: READY
            </span>
            <button
              onClick={handleJoin}
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-[#00f3ff] text-[#0a0f2e] text-lg font-bold font-mono rounded-xl hover:bg-white transition-all duration-300"
            >
              QUICK JOIN
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

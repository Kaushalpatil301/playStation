import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Gamepad2,
  Mic,
  MessageSquare,
  Globe,
  ChevronDown,
} from "lucide-react";
import { SiPlaystation } from "react-icons/si";
import "@fontsource/play";
import psBg from "../assets/ps.jpg";

const LandingPage = () => {
  useEffect(() => {
    !(function () {
      var u = window.UnicornStudio;
      if (u && u.init) {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () {
            u.init();
          });
        } else {
          u.init();
        }
      } else {
        window.UnicornStudio = { isInitialized: !1 };
        var i = document.createElement("script");
        ((i.src =
          "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"),
          (i.onload = function () {
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", function () {
                UnicornStudio.init();
              });
            } else {
              UnicornStudio.init();
            }
          }),
          (document.head || document.body).appendChild(i));
      }
    })();
  }, []);

  return (
    <div className="bg-[#000512] text-white w-full overflow-x-hidden">
      {/* 
        =================
        HERO SECTION
        =================
      */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${psBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Background gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center max-w-4xl px-6 flex flex-col items-center"
        >
          {/* Main heading with PS aesthetics */}
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wider mb-6 text-white drop-shadow-xl uppercase"
            style={{ fontFamily: "'Play', sans-serif" }}
          >
            PLAY HAS NO LIMITS
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-light drop-shadow-md">
            Experience lightning-fast loading, deeper immersion, and an all-new
            generation of incredible PlayStation games.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/squadsync"
                className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-sm font-bold text-lg transition-all hover:bg-gray-200"
              >
                <span>Find out more</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/explore"
                className="group flex items-center justify-center gap-3 px-10 py-4 bg-[#00439c] text-white hover:bg-[#003B8A] rounded-sm font-bold text-lg transition-all"
              >
                <span>Buy now</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10 text-gray-500 opacity-60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 
        =================
        UNICORN STUDIO SECTION 1
        =================
      */}
      <section className="relative w-full flex items-center justify-center bg-[#000512]">
        <div
          data-us-project="Q08uLbDwuIZIi41k8yaT"
          style={{ width: "100%", height: "900px", maxWidth: "1440px" }}
        ></div>
      </section>

      {/* 
        =================
        UNICORN STUDIO SECTION 2
        =================
      */}
      <section className="relative w-full flex items-center justify-center bg-[#000512]">
        <div
          data-us-project="rfJ35fDfOkuDi4qmaVMK"
          style={{ width: "100%", height: "900px", maxWidth: "1440px" }}
        ></div>
      </section>

      {/* 
        =================
        FEATURES SECTION
        =================
      */}
      <section className="relative py-24 px-6 md:px-12 bg-[#00081c] z-10 border-t border-blue-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00f3ff]">
              Everything in one Hub
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We provide all the tools you need to organize your team,
              communicate in real-time, and discover what's next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#000512] p-8 rounded-2xl border border-blue-900/50 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                <Gamepad2 className="text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                PSN Dashboard
              </h3>
              <p className="text-gray-400 leading-relaxed font-sans text-sm">
                View active lobbies, see which games your friends are crushing,
                and jump directly into the action.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#000512] p-8 rounded-2xl border border-blue-900/50 hover:border-purple-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
                <Mic className="text-purple-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Party Chat</h3>
              <p className="text-gray-400 leading-relaxed font-sans text-sm">
                Crystal clear voice comms directly in browser. Create custom
                channels or join existing rooms instantly.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#000512] p-8 rounded-2xl border border-blue-900/50 hover:border-green-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all">
                <MessageSquare className="text-green-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Squad Messaging
              </h3>
              <p className="text-gray-400 leading-relaxed font-sans text-sm">
                Coordinate drop locations, share strats, or just meme with your
                friends in dedicated chat channels.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#000512] p-8 rounded-2xl border border-blue-900/50 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-all">
                <Globe className="text-orange-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Community Hub
              </h3>
              <p className="text-gray-400 leading-relaxed font-sans text-sm">
                Find new friends, check leaderboards, and discover the
                community's top clips and achievements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        =================
        CALL TO ACTION 
        =================
      */}
      <section className="relative py-24 px-6 bg-blue-900/10 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#000512]/80 to-[#000512] pointer-events-none" />

        <div className="z-10 max-w-3xl">
          <SiPlaystation className="w-16 h-16 text-blue-500/50 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Ready to drop in?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of players already organizing their sessions through
            SquadSync.
          </p>
          <Link
            to="/squadsync"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#00f3ff] text-black hover:bg-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
          >
            <Gamepad2 className="w-6 h-6" />
            <span>Launch Dashboard</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-900 bg-[#000208] text-center text-gray-500 font-sans text-sm">
        <p>&copy; 2026 PlayStation SquadHub. Concept Design.</p>
      </footer>
    </div>
  );
}

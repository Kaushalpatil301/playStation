import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Users,
  BarChart2,
  Calendar,
  Play,
  Trophy,
  Zap,
  ChevronRight,
  Gamepad2,
} from "lucide-react";

const NEWS_HIGHLIGHTS = [
  {
    id: "n1",
    title: "Ghost of Yōtei: The Next Journey Revealed",
    tag: "PS5 Exclusive",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "n2",
    title: "State of Play: March 2026 Full Recap",
    tag: "Live Event",
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=400",
  },
];

const FEED_ITEMS = [
  {
    id: 1,
    user: "Phantom_Striker",
    action: "joined your Game Base Party",
    time: "10m ago",
    icon: Users,
    color: "text-[#0070D1]",
    bgColor: "bg-[#0070D1]/20",
  },
  {
    id: 2,
    user: "X_QUANTUM_LEAP_X",
    action: "voted for 'Marvel's Wolverine' in Party Polls",
    time: "25m ago",
    icon: BarChart2,
    color: "text-blue-300",
    bgColor: "bg-blue-500/20",
  },
  {
    id: 3,
    user: "NeonNinja",
    action: "shared a PS5 Media Capture",
    time: "2h ago",
    icon: Play,
    color: "text-white",
    bgColor: "bg-white/20",
  },
];

export default function PlayStationCommunity() {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto bg-transparent text-white p-4 md:p-8 font-sans relative pb-20">
      {/* AMBIENT PS5 GLOWS */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0070D1]/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-white/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* LEFT & CENTER: EXPLORE & FEED */}
        <div className="lg:col-span-2 space-y-12">
          {/* BRAND HEADER */}
          <header className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-3 bg-[#000512]/60 backdrop-blur-md hover:bg-[#003791]/40 rounded-full transition-colors border border-gray-700/50 shadow-[0_0_10px_rgba(0,112,209,0.2)]"
                title="Return Home"
              >
                <ArrowLeft className="text-gray-200" size={20} />
              </button>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 md:gap-3 text-[#0070D1] drop-shadow-[0_0_5px_rgba(0,112,209,0.5)]"
              >
                <Globe size={24} />
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-white">
                  PlayStation™Network
                </span>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              Explore
            </h1>
          </header>

          {/* FEATURED NEWS: BRAND STORYTELLING */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS_HIGHLIGHTS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer border border-[#0070D1]/30 shadow-[0_0_15px_rgba(0,30,100,0.4)]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000512] via-[#000512]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 p-1 z-10 pr-6">
                  <span className="px-3 py-1 bg-white text-[#000512] text-[10px] font-black uppercase rounded-sm mb-3 inline-block shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold leading-tight text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </section>

          {/* SOCIAL FEED: RECENT ACTIVITY  */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black tracking-widest text-blue-100/60 uppercase">
                Friends Activity
              </h2>
              <button className="text-xs font-bold text-[#0070D1] flex items-center gap-1 hover:text-blue-400 transition-colors drop-shadow-[0_0_5px_rgba(0,112,209,0.4)]">
                VIEW ALL <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {FEED_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.id}
                    className="flex items-center justify-between p-5 bg-[#000512]/60 backdrop-blur-md border border-[#0070D1]/20 rounded-2xl hover:border-[#0070D1]/50 hover:bg-[#003791]/20 transition-all shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl border border-white/10 ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-50/80">
                          <span className="font-bold text-white">
                            {item.user}
                          </span>{" "}
                          {item.action}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR: GAMIFIED CONTENT */}
        <aside className="space-y-8 mt-2 lg:mt-0">
          {/* GLOBAL COMMUNITY GOAL */}
          <div className="bg-gradient-to-br from-[#003791]/40 to-[#000512]/80 border border-[#0070D1]/40 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_20px_rgba(0,112,209,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={100} />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Gamepad2 className="text-[#0070D1]" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-100">
                Major Order Active
              </h3>
            </div>
            <p className="text-3xl font-black mb-1 relative z-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              2,500,000
            </p>
            <p className="text-xs text-blue-200/60 mb-6 font-bold uppercase tracking-widest relative z-10">
              Automatons Scrapped
            </p>

            <div className="h-2 bg-black/50 rounded-full overflow-hidden mb-2 relative z-10 border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "82%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-white shadow-[0_0_10px_#ffffff]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-black text-blue-300 uppercase tracking-widest relative z-10">
              <span>Super Earth Progress</span>
              <span className="text-white">82%</span>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="p-6 bg-[#000512]/60 backdrop-blur-md border border-[#0070D1]/20 rounded-3xl shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-100/60 mb-6 flex items-center gap-2">
              <Calendar size={14} className="text-[#0070D1]" /> PlayStation
              Tournaments
            </h3>
            <div className="space-y-6">
              {[
                {
                  game: "EA SPORTS FC™ 26",
                  time: "In 2 Hours",
                  type: "Open Qualifier",
                },
                {
                  game: "Gran Turismo 7",
                  time: "Tomorrow",
                  type: "Daily Race C",
                },
              ].map((ev, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-1 bg-[#0070D1] rounded-full group-hover:scale-y-125 transition-transform shadow-[0_0_5px_rgba(0,112,209,0.8)]" />
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                      {ev.game}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">
                      {ev.time} •{" "}
                      <span className="text-[#0070D1]">{ev.type}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENT SHOUTOUT */}
          <div className="p-6 bg-[#000512]/60 backdrop-blur-md border border-[#0070D1]/20 rounded-3xl flex items-center gap-4 shadow-lg cursor-pointer hover:bg-[#003791]/20 transition-colors">
            <div className="bg-gradient-to-br from-blue-300 to-blue-100 p-3 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Trophy className="text-[#000512]" size={24} />
            </div>
            <div>
              <p className="text-[10px] text-[#0070D1] font-black uppercase tracking-widest drop-shadow-[0_0_2px_rgba(0,112,209,0.4)]">
                Platinum Earned
              </p>
              <p className="text-sm font-bold text-white">Ghost of Tsushima</p>
              <p className="text-xs text-gray-400 font-medium">
                by Phantom_Striker
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

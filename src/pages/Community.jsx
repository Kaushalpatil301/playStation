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
} from "lucide-react";

const NEWS_HIGHLIGHTS = [
  {
    id: "n1",
    title: "Ghost of Yotei: New Journey Begins",
    tag: "Exclusive",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "n2",
    title: "State of Play: March 2026 Recap",
    tag: "Event",
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=400",
  },
];

const FEED_ITEMS = [
  {
    id: 1,
    user: "Phantom_Striker",
    action: "joined your Squad Lobby",
    time: "10m ago",
    icon: Users,
    color: "text-blue-400",
  },
  {
    id: 2,
    user: "X_QUANTUM_LEAP_X",
    action: "voted for 'Modern Warfare III' in Polls",
    time: "25m ago",
    icon: BarChart2,
    color: "text-purple-400",
  },
  {
    id: 3,
    user: "NeonNinja",
    action: "shared a Quad-Kill clip",
    time: "2h ago",
    icon: Play,
    color: "text-emerald-400",
  },
];

export default function CommunityRedesign() {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto bg-transparent text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT & CENTER: NEWS & FEED */}
        <div className="lg:col-span-2 space-y-12">
          {/* BRAND HEADER */}
          <header className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
                title="Return Home"
              >
                <ArrowLeft className="text-gray-300" size={20} />
              </button>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-blue-500"
              >
                <Globe size={24} />
                <span className="text-xs font-black tracking-[0.4em] uppercase">
                  PlayStation Network
                </span>
              </motion.div>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">
              COMMUNITY PULSE
            </h1>
          </header>

          {/* FEATURED NEWS: BRAND STORYTELLING [cite: 41] */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS_HIGHLIGHTS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
              >
                <img
                  src={item.img}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 p-1">
                  <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase rounded-full mb-3 inline-block">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </section>

          {/* SOCIAL FEED: RECENT ACTIVITY  */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black tracking-widest text-gray-500 uppercase">
                Live Activity
              </h2>
              <button className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:underline">
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
                    className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-black text-blue-400">
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

        {/* RIGHT SIDEBAR: GAMIFIED CONTENT [cite: 24, 25] */}
        <aside className="space-y-8">
          {/* GLOBAL COMMUNITY GOAL [cite: 38] */}
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-900/20 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-blue-400" fill="currentColor" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">
                Global Raid
              </h3>
            </div>
            <p className="text-2xl font-black mb-2">1,000,000</p>
            <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest">
              Enemies Defeated
            </p>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "75%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <span>Progress</span>
              <span>75%</span>
            </div>
          </div>

          {/* UPCOMING EVENTS [cite: 8] */}
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <Calendar size={14} /> Esports Schedule
            </h3>
            <div className="space-y-6">
              {[
                {
                  game: "Valorant Pro Series",
                  time: "In 2 Hours",
                  type: "Competitive",
                },
                {
                  game: "Grand Turismo Cup",
                  time: "Tomorrow",
                  type: "Tournament",
                },
              ].map((ev, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-1 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform" />
                  <div>
                    <p className="text-sm font-bold">{ev.game}</p>
                    <p className="text-[10px] text-blue-400 font-black uppercase mt-1">
                      {ev.time} • {ev.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENT SHOUTOUT [cite: 25] */}
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-2xl border border-yellow-500/20">
              <Trophy className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Top Contributor
              </p>
              <p className="text-sm font-black uppercase">Phantom_Striker</p>
            </div>
          </div>
        </aside>
      </div>

      {/* AMBIENT GLOWS */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-900/5 blur-[120px] pointer-events-none" />
    </div>
  );
}

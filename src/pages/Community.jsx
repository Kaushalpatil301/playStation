import React from "react";
import { motion } from "framer-motion";
import { Globe, Video, Users, BarChart2, Calendar } from "lucide-react";

const FEED_ITEMS = [
  {
    id: 1,
    type: "join",
    user: "Phantom_Striker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phantom",
    action: "joined the squad",
    timestamp: "10 mins ago",
    icon: Users,
    iconColor: "text-green-400",
  },
  {
    id: 2,
    type: "vote",
    user: "X_QUANTUM_LEAP_X",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quantum",
    action: "started a new vote: 'What are we playing next?'",
    timestamp: "25 mins ago",
    icon: BarChart2,
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    type: "clip",
    user: "NeonNinja",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neon",
    action: "shared a game clip from Valorant",
    timestamp: "2 hours ago",
    icon: Video,
    iconColor: "text-purple-400",
  },
  {
    id: 4,
    type: "event",
    user: "System",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
    action: "created an event: 'Weekend Tournament'",
    timestamp: "1 day ago",
    icon: Calendar,
    iconColor: "text-orange-400",
  },
];

export default function Community() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="mb-2">
        <h1 className="text-3xl font-black tracking-widest text-[#e0e6ed] font-mono mb-2 flex items-center gap-3">
          <Globe className="text-blue-400" />
          COMMUNITY FEED
        </h1>
        <p className="text-[#8b9bb4]">
          Recent activity from your squads and friends.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {FEED_ITEMS.map((item, i) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 p-5 bg-[#111827] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
            >
              <div className="relative shrink-0">
                <img
                  src={item.avatar}
                  alt={item.user}
                  className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#111827] p-1 rounded-full border border-gray-800">
                  <Icon size={12} className={item.iconColor} />
                </div>
              </div>

              <div className="flex flex-col flex-1 pt-1 text-sm md:text-base">
                <div className="text-gray-300">
                  <span className="font-bold text-gray-200 font-mono tracking-tight mr-2">
                    {item.user}
                  </span>
                  {item.action}
                </div>
                <div className="mt-1 text-xs text-gray-500 font-medium">
                  {item.timestamp}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, CheckCircle2 } from "lucide-react";

export default function Voting() {
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, label: "Play Valorant", votes: 3 },
    { id: 2, label: "Switch to Apex Legends", votes: 1 },
    { id: 3, label: "Play Call of Duty", votes: 0 },
  ]);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = (id) => {
    if (hasVoted) return;

    setOptions(
      options.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt,
      ),
    );
    setHasVoted(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="mb-2">
        <h1 className="text-3xl font-black tracking-widest text-[#e0e6ed] font-mono mb-2 flex items-center gap-3">
          <BarChart2 className="text-blue-400" />
          SQUAD VOTING
        </h1>
        <p className="text-[#8b9bb4]">Decide the next move for the squad.</p>
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8 bg-[#0B1220]/50 border-b border-gray-800">
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">
            What are we playing next?
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-mono">
            {totalVotes} TOTAL VOTES
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {options.map((option) => {
            const percentage =
              totalVotes === 0
                ? 0
                : Math.round((option.votes / totalVotes) * 100);

            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`relative w-full text-left rounded-xl border p-4 transition-all duration-300 overflow-hidden ${
                  hasVoted
                    ? "border-gray-700 bg-gray-800/20 cursor-default"
                    : "border-gray-700 bg-gray-800/40 hover:bg-gray-800 hover:border-blue-500/50 cursor-pointer"
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 bg-blue-600/10 pointer-events-none"
                />

                <div className="relative flex items-center justify-between z-10">
                  <span
                    className={`font-medium ${hasVoted ? "text-gray-300" : "text-gray-200"}`}
                  >
                    {option.label}
                  </span>

                  {hasVoted && (
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-blue-400 font-bold">
                        {percentage}%
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({option.votes} {option.votes === 1 ? "vote" : "votes"})
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {hasVoted && (
          <div className="p-4 bg-green-500/10 border-t border-green-500/20 flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
            <CheckCircle2 size={16} />
            Your vote has been recorded.
          </div>
        )}
      </div>
    </div>
  );
}

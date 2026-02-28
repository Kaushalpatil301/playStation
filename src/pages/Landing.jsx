import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8">Welcome to PlayStation Hub</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/squadsync"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition"
        >
          Syntax Squad
        </Link>
        <Link
          to="/explore"
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-full font-semibold transition"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}

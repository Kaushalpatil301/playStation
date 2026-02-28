import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import LandingPage from "./pages/Landing";
import SquadSync from "./pages/SquadSync";
import VoiceChat from "./pages/VoiceChat";
import ChatRoom from "./pages/ChatRoom";
import Voting from "./pages/Voting";
import Community from "./pages/Community";
import ExplorePage from "./Exploreproducts/ExplorePage";
import { Moon, Sun } from "lucide-react";

function App() {
  const [isAfk, setIsAfk] = useState(false);
  const [isBlueLightFilter, setIsBlueLightFilter] = useState(false);

  useEffect(() => {
    let timeout;
    const AFK_TIME = 50000; // 5 seconds for testing

    const handleMouseMove = () => {
      setIsAfk(false); // Wake up
      clearTimeout(timeout); // Clear old timer
      timeout = setTimeout(() => setIsAfk(true), AFK_TIME); // Start new timer
    };

    // Listen ONLY for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Start the very first timer when the app loads
    timeout = setTimeout(() => setIsAfk(true), AFK_TIME);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []); // Empty array ensures this setup only runs once

  return (
    <>
      {/* AFK Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(5, 5, 5, 0.7)",
          backdropFilter: isAfk
            ? "blur(8px) brightness(60%)"
            : "blur(0px) brightness(100%)",
          WebkitBackdropFilter: isAfk
            ? "blur(8px) brightness(60%)"
            : "blur(0px) brightness(100%)",
          opacity: isAfk ? 1 : 0,
          transition: "all 1.5s ease-in-out",
          pointerEvents: "none",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Moon
          color="#3b82f6"
          size={48}
          style={{ opacity: 0.8, marginBottom: "1rem" }}
        />
        <h2
          style={{
            color: "white",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Rest Mode
        </h2>
      </div>

      {/* Main App Background & Router */}
      <div style={{ minHeight: "100vh", backgroundColor: "#050505" }}>
        {/* Blue Light Filter Overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 140, 0, 0.35)", // Stronger amber/orange tint
            mixBlendMode: "multiply",
            opacity: isBlueLightFilter ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            pointerEvents: "none",
            zIndex: 99998,
          }}
        />

        {/* Global Blue Light Toggle Button */}
        <button
          onClick={() => setIsBlueLightFilter(!isBlueLightFilter)}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 99999,
            backgroundColor: isBlueLightFilter
              ? "rgba(255, 165, 0, 0.2)"
              : "rgba(26, 111, 255, 0.1)",
            border: isBlueLightFilter
              ? "1px solid rgba(255, 165, 0, 0.5)"
              : "1px solid rgba(26, 111, 255, 0.3)",
            color: isBlueLightFilter ? "#fbbf24" : "#4d9fff",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            boxShadow: isBlueLightFilter
              ? "0 0 15px rgba(255, 165, 0, 0.3)"
              : "0 0 15px rgba(26, 111, 255, 0.1)",
          }}
          title="Toggle Blue Light Filter"
        >
          <Sun size={24} />
        </button>

        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/squadsync" element={<SquadSync />} />
              <Route path="/voice" element={<VoiceChat />} />
              <Route path="/voice/:lobbyId" element={<VoiceChat />} />
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/community" element={<Community />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </>
  );
}

export default App;

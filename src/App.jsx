import React from "react";
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

function App() {
  return (
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
  );
}

export default App;

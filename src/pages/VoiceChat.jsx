import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  LogOut,
  ArrowLeft,
  Users,
  Gamepad2,
  Plus,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const ACTIVE_PARTIES = [
  {
    id: "warzone-ranked",
    name: "Warzone Resurgence",
    game: "Call of Duty: Warzone",
    players: 3,
    maxPlayers: 4,
    description: "Sweaty lobbies, need one more with a mic. Comms only.",
  },
  {
    id: "ghosts-survival",
    name: "Nightmare Survival",
    game: "Ghost of Tsushima: Legends",
    players: 4,
    maxPlayers: 4,
    description: "Need a Ronin for heals. Running the weekly.",
  },
  {
    id: "helldivers-democracy",
    name: "Spreading Democracy",
    game: "Helldivers 2",
    players: 3,
    maxPlayers: 4,
    description: "Helldive difficulty, bring orbital lasers.",
  },
  {
    id: "r6-ranked",
    name: "Ranked Push to Champ",
    game: "Rainbow Six Siege",
    players: 5,
    maxPlayers: 5,
    description: "Full squad running strats in party chat.",
  },
];

export default function PartyVoiceChat() {
  // Assuming the route parameter is updated to :partyId in your router
  const { partyId } = useParams();
  const navigate = useNavigate();

  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  // ===============================
  // INIT JITSI (SHARE PLAY / VOICE)
  // ===============================
  useEffect(() => {
    if (!partyId || apiRef.current) return;

    const domain = "meet.jit.si";
    const options = {
      roomName: `PSN_Party_${partyId}_2026`,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      },
      userInfo: {
        displayName: "PSN User",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    apiRef.current = api;
    const iframe = api.getIFrame();
    iframe.allow =
      "camera *; microphone *; autoplay; fullscreen; display-capture";

    api.addListener("videoConferenceJoined", () => setConnected(true));
    api.addListener("audioMuteStatusChanged", ({ muted }) =>
      setMicEnabled(!muted),
    );
    api.addListener("videoMuteStatusChanged", ({ muted }) =>
      setCamEnabled(!muted),
    );

    return () => {
      api.dispose();
      apiRef.current = null;
    };
  }, [partyId]);

  const toggleMic = () => apiRef.current?.executeCommand("toggleAudio");
  const toggleCam = () => apiRef.current?.executeCommand("toggleVideo");
  const leaveParty = () => {
    apiRef.current?.executeCommand("hangup");
    apiRef.current?.dispose();
    navigate("/party-voice"); // Redirect to party hub
  };

  // ===============================
  // VIEW: PARTY SELECTION
  // ===============================
  if (!partyId) {
    return (
      <div className="h-full overflow-y-auto bg-transparent py-8 px-4 text-white font-sans flex flex-col relative">
        {/* Ambient PlayStation UI Glow */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0070D1]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-3 mr-2 bg-[#000512]/60 backdrop-blur-md hover:bg-[#003791]/40 rounded-full transition-colors border border-gray-700/50 shadow-[0_0_10px_rgba(0,112,209,0.2)]"
                title="Return to Game Base"
              >
                <ArrowLeft className="text-gray-200" size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white font-sans flex items-center gap-3 drop-shadow-[0_0_8px_rgba(0,112,209,0.4)]">
                  <Headphones className="text-[#0070D1]" size={28} />
                  Party Chat
                </h1>
                <p className="text-blue-100/60 font-medium">
                  Select a live session or start your own party.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const roomName = prompt(
                  "Enter a name for your new PlayStation Party:",
                );
                if (roomName && roomName.trim() !== "") {
                  // Create a safe URL ID
                  const newId = roomName
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");
                  if (newId) navigate(`/party-voice/${newId}`);
                }
              }}
              className="flex items-center gap-2 bg-white text-[#000512] hover:bg-gray-200 px-6 py-3 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/50"
            >
              <Plus size={20} className="text-[#0070D1]" />
              START PARTY
            </button>
          </div>

          {/* Party Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVE_PARTIES.map((party, i) => (
              <motion.div
                key={party.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#000512]/80 backdrop-blur-md border border-[#0070D1]/20 rounded-3xl p-6 flex flex-col hover:border-[#0070D1]/60 hover:shadow-[0_0_20px_rgba(0,112,209,0.2)] transition-all shadow-lg cursor-pointer group"
                onClick={() => {
                  if (party.players < party.maxPlayers)
                    navigate(`/party-voice/${party.id}`);
                }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="bg-[#0070D1]/20 p-2.5 rounded-xl border border-[#0070D1]/30">
                    <Gamepad2 className="text-[#0070D1]" size={24} />
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                      party.players >= party.maxPlayers
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20"
                    }`}
                  >
                    {party.players}/{party.maxPlayers} IN PARTY
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {party.name}
                </h3>
                <p className="text-blue-200/80 text-sm font-bold tracking-wide uppercase mb-3">
                  {party.game}
                </p>
                <p className="text-gray-400 text-sm mb-6 flex-1 font-medium leading-relaxed">
                  {party.description}
                </p>

                <button
                  className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                    party.players >= party.maxPlayers
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                      : "bg-[#0070D1] text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(0,112,209,0.5)] border border-blue-400/30"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (party.players < party.maxPlayers)
                      navigate(`/party-voice/${party.id}`);
                  }}
                >
                  {party.players >= party.maxPlayers
                    ? "PARTY FULL"
                    : "JOIN PARTY CHAT"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // VIEW: ACTIVE PARTY SESSION
  // ===============================
  const activePartyDetails = ACTIVE_PARTIES.find((p) => p.id === partyId) || {
    name: partyId.replace(/-/g, " "),
  };

  return (
    <div className="flex flex-col h-full bg-[#000512] text-white">
      {/* HEADER (Control Center Style) */}
      <div className="flex justify-between items-center p-4 bg-[#000512]/90 backdrop-blur-xl border-b border-[#0070D1]/30 shadow-[0_5px_20px_rgba(0,30,100,0.5)] z-20">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] capitalize">
            {activePartyDetails.name}{" "}
            <span className="text-[10px] font-black tracking-widest bg-[#0070D1] text-white px-2 py-1 rounded-sm ml-2">
              PARTY LIVE
            </span>
          </h2>
          <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
            ></span>
            {connected
              ? "Connected to PlayStation™Network"
              : "Establishing connection..."}
          </div>
        </div>

        {/* DUALSENSE/PARTY CONTROLS */}
        <div className="flex items-center gap-3 bg-[#111827]/80 p-2 rounded-2xl border border-gray-700/50 backdrop-blur-md">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-xl transition-all shadow-inner ${
              micEnabled
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
            }`}
            title="Mute DualSense Mic"
          >
            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={toggleCam}
            className={`p-3 rounded-xl transition-all shadow-inner ${
              camEnabled
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
            }`}
            title="Toggle Share Screen/Camera"
          >
            {camEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <div className="w-px h-8 bg-gray-700/50 mx-1"></div>

          <button
            onClick={leaveParty}
            className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all font-bold text-sm shadow-[0_0_10px_rgba(220,38,38,0.4)]"
          >
            <LogOut size={18} /> LEAVE PARTY
          </button>
        </div>
      </div>

      {/* JITSI VIDEO/SCREEN SHARE CONTAINER */}
      <div className="flex-1 bg-[#000512] relative">
        {!connected && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 z-0 bg-[#000512]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#0070D1] border-t-transparent rounded-full animate-spin"></div>
              <Gamepad2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600" size={24} />
            </div>
            <p className="text-gray-400 font-bold tracking-[0.2em] text-sm">
              CONNECTING TO PSN...
            </p>
          </div>
        )}
        <div ref={jitsiContainerRef} className="w-full h-full relative z-10" />
      </div>
    </div>
  );
}
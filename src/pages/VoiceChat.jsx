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
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const LOBBIES = [
  {
    id: "valorant-ranked",
    name: "Valorant Ranked",
    game: "Valorant",
    players: 4,
    maxPlayers: 5,
    description: "Diamond push, need a smoker.",
  },
  {
    id: "apex-pubs",
    name: "Apex Chill Pubs",
    game: "Apex Legends",
    players: 2,
    maxPlayers: 3,
    description: "Just dropping hot and having fun.",
  },
  {
    id: "helldivers-democracy",
    name: "Spreading Democracy",
    game: "Helldivers 2",
    players: 3,
    maxPlayers: 4,
    description: "Suicide mission, bring railguns.",
  },
  {
    id: "cs2-premier",
    name: "CS2 Premier",
    game: "CS2",
    players: 5,
    maxPlayers: 5,
    description: "Full squad, just chatting between matches.",
  },
];

export default function VoiceChat() {
  const { lobbyId } = useParams();
  const navigate = useNavigate();

  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  // ===============================
  // INIT JITSI
  // ===============================
  useEffect(() => {
    if (!lobbyId || apiRef.current) return;

    const domain = "meet.jit.si";
    const options = {
      roomName: `SquadSync_${lobbyId}_Room_2026`,
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
        displayName: "Squad Member",
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
  }, [lobbyId]);

  const toggleMic = () => apiRef.current?.executeCommand("toggleAudio");
  const toggleCam = () => apiRef.current?.executeCommand("toggleVideo");
  const leaveLobby = () => {
    apiRef.current?.executeCommand("hangup");
    apiRef.current?.dispose();
    navigate("/voice");
  };

  // ===============================
  // VIEW: LOBBY SELECTION
  // ===============================
  if (!lobbyId) {
    return (
      <div className="h-full overflow-y-auto bg-transparent py-8 px-4 text-white font-sans flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/")}
              className="p-2 mr-2 bg-[#111827] hover:bg-[#1f2937] rounded-full transition-colors border border-gray-800"
              title="Return Home"
            >
              <ArrowLeft className="text-gray-300" size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-widest text-[#00f3ff] font-sans flex items-center gap-3">
                <Mic className="text-blue-400" />
                ACTIVE COMMS
              </h1>
              <p className="text-[#8b9bb4]">
                Select a voice channel to drop into.
              </p>
            </div>
          </div>

          {/* Lobby Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOBBIES.map((lobby, i) => (
              <motion.div
                key={lobby.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-blue-500/50 transition-colors shadow-lg cursor-pointer"
                onClick={() => {
                  if (lobby.players < lobby.maxPlayers)
                    navigate(`/voice/${lobby.id}`);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                    <Gamepad2 className="text-blue-400" size={24} />
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${lobby.players >= lobby.maxPlayers ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
                  >
                    {lobby.players}/{lobby.maxPlayers} PLAYERS
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {lobby.name}
                </h3>
                <p className="text-blue-400 text-sm font-semibold mb-3">
                  {lobby.game}
                </p>
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  {lobby.description}
                </p>

                <button
                  className={`w-full py-3 rounded-xl font-bold transition-all ${lobby.players >= lobby.maxPlayers ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (lobby.players < lobby.maxPlayers)
                      navigate(`/voice/${lobby.id}`);
                  }}
                >
                  {lobby.players >= lobby.maxPlayers
                    ? "LOBBY FULL"
                    : "JOIN VOICE"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // VIEW: ACTIVE JITSI ROOM
  // ===============================
  const activeLobbyDetails = LOBBIES.find((l) => l.id === lobbyId) || {
    name: lobbyId,
  };

  return (
    <div className="flex flex-col h-full bg-transparent text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 bg-[#000512]/60 backdrop-blur-md border-b border-blue-900/50 shadow-[0_5px_15px_rgba(0,30,100,0.4)]">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#00f3ff] flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
            {activeLobbyDetails.name}{" "}
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full ml-2">
              LIVE
            </span>
          </h2>
          <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
            ></span>
            {connected
              ? "Connected to secure channel"
              : "Establishing connection..."}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-4 bg-[#111827] p-2 rounded-2xl border border-gray-800">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-xl transition ${micEnabled ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-red-500/20 text-red-500 hover:bg-red-500/30"}`}
          >
            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={toggleCam}
            className={`p-3 rounded-xl transition ${camEnabled ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-red-500/20 text-red-500 hover:bg-red-500/30"}`}
          >
            {camEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <div className="w-px h-8 bg-gray-700 mx-2"></div>

          <button
            onClick={leaveLobby}
            className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition font-bold text-sm"
          >
            <LogOut size={18} /> DISCONNECT
          </button>
        </div>
      </div>

      {/* JITSI VIDEO CONTAINER */}
      <div className="flex-1 bg-black relative">
        {!connected && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 z-0">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium tracking-widest text-sm">
              INITIALIZING PROTOCOLS...
            </p>
          </div>
        )}
        <div ref={jitsiContainerRef} className="w-full h-full relative z-10" />
      </div>
    </div>
  );
}

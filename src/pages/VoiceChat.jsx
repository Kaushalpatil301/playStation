import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff, LogOut } from "lucide-react";

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
    if (apiRef.current) return;

    const domain = "meet.jit.si";

    const options = {
      roomName: `Lobby_${lobbyId}`,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",

      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: true, // IMPORTANT
      },

      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      },

      userInfo: {
        displayName: "Player",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    apiRef.current = api;

    // allow permissions
    const iframe = api.getIFrame();
    iframe.allow =
      "camera *; microphone *; autoplay; fullscreen; display-capture";

    // ===== EVENTS =====
    api.addListener("videoConferenceJoined", () => {
      setConnected(true);
    });

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

  // ===============================
  // CONTROLS
  // ===============================
  const toggleMic = () => {
    apiRef.current?.executeCommand("toggleAudio");
  };

  const toggleCam = () => {
    apiRef.current?.executeCommand("toggleVideo");
  };

  const leaveLobby = () => {
    apiRef.current?.executeCommand("hangup");
    apiRef.current?.dispose();
    navigate("/");
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <div
        style={{
          padding: 12,
          background: "#111",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          Voice Chat: <b>{lobbyId}</b>
        </div>

        <div>Status: {connected ? "✅ Connected" : "Connecting..."}</div>
      </div>

      {/* JITSI VIDEO */}
      <div
        ref={jitsiContainerRef}
        style={{
          flex: 1,
          background: "black",
        }}
      />

      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          padding: 15,
          background: "#111",
        }}
      >
        <button onClick={toggleMic}>{micEnabled ? <Mic /> : <MicOff />}</button>

        <button onClick={toggleCam}>
          {camEnabled ? <Video /> : <VideoOff />}
        </button>

        <button onClick={leaveLobby}>
          <LogOut />
        </button>
      </div>
    </div>
  );
}

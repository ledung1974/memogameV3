import React from "react";
import StatusProvider from "./contexts/StatusProvider";
import PlayerProvider from "./contexts/PlayerProvider";
import GameProvider from "./contexts/GameProvider";
import Pages from "./pages";
import AlertMemo from "./pages/AlertMemo";
import AudioMemo from "./components/AudioMemo";
import "./css/app.css";

export default function App() {
  return (
    <>
      <StatusProvider>
        <GameProvider>
          <PlayerProvider>
            <Pages />
            <AlertMemo />
          </PlayerProvider>
        </GameProvider>
      </StatusProvider>
      <AudioMemo />
    </>
  );
}

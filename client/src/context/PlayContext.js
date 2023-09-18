import React, { useState, useContext } from "react";

const PlayContext = React.createContext();

function PlayProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");

  return (
    <PlayContext.Provider
      value={{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }}
    >
      {children}
    </PlayContext.Provider>
  );
}

export function usePlay() {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlay must be used within a PlayProvider");
  }
  return context;
}

export default PlayProvider;

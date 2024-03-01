import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import AudioPlayer from "./components/AudioPlayer";

// Read backend host from environment variable,
// but default to localhost
const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    fetch(`${BACKEND_HOST}/tracks/`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a href="#" className={styles.active}>
                Tracks
              </a>
            </li>
            <li>
              <a href="#">Playlists</a>
            </li>
          </ul>
        </nav>
        {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;

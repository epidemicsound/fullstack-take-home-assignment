import React, { useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import AudioPlayer from "./components/AudioPlayer";
import TracksContainer from "./tracks/TracksContainer";
import PlaylistsPage from "./playlists/PlaylistsPage";

function App() {
  const [currentTrack, setCurrentTrack] = useState();
  const [tab, setTab] = useState("tracks");

  const handlePlay = (track) => setCurrentTrack(track);

  const changeTab = (newTab) => setTab(newTab);

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <button
                onClick={() => changeTab("tracks")}
                className={tab === "tracks" ? styles.active : ""}
              >
                Tracks
              </button>
            </li>
            <li>
              <button
                onClick={() => changeTab("playlists")}
                className={tab === "playlists" ? styles.active : ""}
              >
                Playlists
              </button>
            </li>
          </ul>
        </nav>
        {tab === "tracks" && <TracksContainer handlePlay={handlePlay} />}
        {tab === "playlists" && <PlaylistsPage />}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;

import React, { useState, useMemo } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import AudioPlayer from "./components/AudioPlayer";
import TracksTab from "./components/tabs/TracksTab";
import PlaylistsTab from "./components/tabs/PlaylistsTab";
import { usePlay } from "./context/PlayContext";

const TABS = {
  tracks: "tracks",
  playlists: "playlists",
};

function App() {
  const { currentTrack } = usePlay();
  const [activeTab, setActiveTab] = useState(TABS.tracks);

  const Component = useMemo(() => {
    const tabComponents = {
      [TABS.tracks]: TracksTab,
      [TABS.playlists]: PlaylistsTab,
    };

    return tabComponents[activeTab];
  }, [activeTab]);

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a
                href="#"
                className={activeTab === TABS.tracks ? styles.active : ""}
                onClick={() => setActiveTab(TABS.tracks)}
              >
                Tracks
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeTab === TABS.playlists ? styles.active : ""}
                onClick={() => setActiveTab(TABS.playlists)}
              >
                Playlists
              </a>
            </li>
          </ul>
        </nav>
      </main>
      <Component />
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;

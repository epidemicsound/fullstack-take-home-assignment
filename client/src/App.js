import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import AudioPlayer from "./components/AudioPlayer";
import Tracks from "./views/Tracks";
import Playlists from "./views/Playlists";

const VIEW_STATES = {
  TRACKS: 0,
  PLAYLISTS: 1,
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [viewState, setViewState] = useState(VIEW_STATES.TRACKS);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const Views = () => {
    switch(viewState) {
      case VIEW_STATES.PLAYLISTS:
        return <Playlists />
      case VIEW_STATES.TRACKS:
      default:
        return <Tracks tracks={tracks} setCurrentTrack={setCurrentTrack} />
    }
  }

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a href='#' className={viewState === VIEW_STATES.TRACKS && styles.active} onClick={() => setViewState(VIEW_STATES.TRACKS)}>
                Tracks
              </a>
            </li>
            <li>
              <a href='#' className={viewState === VIEW_STATES.PLAYLISTS && styles.active} onClick={() => setViewState(VIEW_STATES.PLAYLISTS)}>Playlists</a>
            </li>
          </ul>
        </nav>
        {Views()}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;

import React, {useEffect, useState} from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import AudioPlayer from "./components/AudioPlayer";
import MainView from "./components/MainView";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [active, setActive] = useState("Tracks")

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
    refreshPlaylists();
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  const refreshPlaylists = (then) => {
    fetch("http://localhost:8000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }
  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo"/>
          <ul className={styles.menu}>
            <li>
              <a href="#" className={active === "Tracks" ? styles.active : ""}
                 onClick={() => setActive("Tracks")}>
                Tracks
              </a>
            </li>
            <li>
              <a href="#" className={active === "Playlists" ? styles.active : ""}
                 onClick={() => setActive("Playlists")}>
                Playlists
              </a>
            </li>
          </ul>
        </nav>
        <MainView active={active} tracks={tracks} playlists={playlists} handlePlay={handlePlay}
                  refreshPlaylists={refreshPlaylists}/>
      </main>
      {currentTrack && <AudioPlayer track={currentTrack}/>}
    </>
  );
}

export default App;

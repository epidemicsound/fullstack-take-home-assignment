import React, { useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import AudioPlayer from "./components/AudioPlayer";
import PlayList from "./components/PlayList";
import { useQueries } from "react-query";
import { fetchPlaylist, fetchTracks } from "./lib/playlist";
import Modal from "./components/createPlaylist";

function App() {
  const [currentTrack, setCurrentTrack] = useState();
  const [activeTab, setActiveTab] = useState("tracks");
  const [showModal, setShowModal] = useState(false);

  const queries = useQueries([
    { queryKey: "tracksData", queryFn: fetchTracks },
    { queryKey: "playlistsData", queryFn: fetchPlaylist },
  ]);

  const tracks = queries[0].data;
  const playlists = queries[1].data;

  const handlePlay = (track) => setCurrentTrack(track);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a
                href="#"
                className={activeTab === "tracks" ? styles.active : undefined}
                onClick={() => handleTabClick("tracks")}
              >
                Tracks
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeTab === "playlist" ? styles.active : undefined}
                onClick={() => handleTabClick("playlist")}
              >
                Playlists
              </a>
            </li>
          </ul>
          <p onClick={() => setShowModal(true)}>create Playlist</p>
        </nav>
        {activeTab === "tracks" &&
          tracks?.map((track, ix) => (
            <TrackRow
              key={ix}
              track={track}
              handlePlay={handlePlay}
              type={"tracks"}
            />
          ))}
        {activeTab === "playlist" && (
          <PlayList handlePlay={handlePlay} playlists={playlists} />
        )}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
      {showModal && <Modal onClose={handleModalClose} />}
    </>
  );
}

export default App;

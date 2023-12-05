import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tracks, setTracks] = useState([{id: 1, title: "song 1", main_artists:[":)", ":("]},
    {id: 2, title: "song 2", main_artists:["Yeayea"]},
    {id: 3, title: "wohooo!", main_artists:["Mmm"]}]);
  const [currentTrack, setCurrentTrack] = useState();
  const [playlists, setPlaylists] = useState([{id: 1, name: "wow a playlist"},{id: 2, name: "another one??"},{id: 3, name: "escheschesche"}]);
  const [selectedTrack, setSelectedTrack] = useState(-1);
  const [selectedPlaylist, setSelectedPlaylist] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  const addToPlaylist = (track) => {
    setSelectedTrack(track.id);
    showPlaylists()
    console.log("Adding a track!", track);
    fetch("http://0.0.0.0:8000/playlists/" + selectedPlaylist, {
      method: 'post',
      body: track.id,
      mode: "cors"
    })
    .then((res) => console.log("Got following response:", res));
  };

  const showPlaylists = () => {
    console.log("showing available playlists")
    // setShowModal(true); Show a modal with the playlists, select one to add the selected song to that list
    setSelectedPlaylist(1);
  }

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a href="tracks" className={styles.active}>
                Tracks
              </a>
            </li>
            <li>
              <a href="playlists">Playlists</a>
            </li>
          </ul>
        </nav>
        {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} addToPlaylist={addToPlaylist}/>
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;

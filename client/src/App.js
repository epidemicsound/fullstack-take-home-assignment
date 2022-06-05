import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TrackRow from "./components/TrackRow";
import AudioPlayer from "./components/AudioPlayer";
import PlaylistsView from "./views/PlaylistsView";
import NavLink from "./components/NavLink"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [tracks, setTracks] = useState({});
  const [currentTrack, setCurrentTrack] = useState();

  const idToTrack = function (trackArray) {
    return Object.fromEntries(
      trackArray.map(track => [track.id, track])
    )
  }

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(idToTrack(data)));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <main className={styles.app}>
          <nav>
            <img src={logo} className={styles.logo} alt="Logo" />
            <ul className={styles.menu}>
              <NavLink to="/">Tracks</NavLink>
              <NavLink to="/playlists">Playlists</NavLink>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={
              Object.entries(tracks).map(([id, track]) =>
                <TrackRow key={id} track={track} handlePlay={handlePlay} />
              )
            }/>
            <Route path="/playlists" element={ <PlaylistsView idToTrack={tracks}/> }/>
          </Routes>
        </main>
        {currentTrack && <AudioPlayer track={currentTrack} />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import AudioPlayer from "./components/AudioPlayer";
import TrackList from "./features/Track/TrackList";
import PlaylistList from "./features/Playlist/Playlist";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { AppBar, Tab, Tabs } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {  ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme";



function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  
  const handleSelectPlaylist = (playlistTitle) => {
    if (selectedPlaylists.includes(playlistTitle)) {
      setSelectedPlaylists(selectedPlaylists.filter((title) => title !== playlistTitle));
      setToastMessage("Removed Track from playlist");
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistTitle]);
      setToastMessage("Track added to playlist");
    }
    setOpenSnackbar(true);
  };

  const [activeTab, setActiveTab] = useState("/");

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };


  const playLists = [{ title: "Romantic" }, { title: "Party" }];
  useEffect(() => {
    setActiveTab(window.location.pathname);
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);
  const TabsList = [
    {
      lable: "Tracks",
      route: "/"
    },
    {
      lable: "Playlists",
      route: "/playlists"
    },

  ]
  return (
    <Router>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <AppBar color="transparent" position="static">
            <Tabs value={activeTab} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: "lightblue" } }}>
              {TabsList.map((item, ix) => (
                <Tab key={ix} label={item.lable} value={item.route} component={NavLink} to={item.route} style={{ color: activeTab == item.route ? "lightblue" : "#fff" }} />

              ))}
            </Tabs>
          </AppBar>
        </nav>

        <Routes>
          <Route path="/" element={<TrackList tracks={tracks} playLists={playLists} handleSelectPlaylist={handleSelectPlaylist} selectedPlaylists={selectedPlaylists} handlePlay={handlePlay} />} />
          <Route path="/playlists" element={<PlaylistList playLists={playLists} />} />
        </Routes>

      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
      <ThemeProvider theme={darkTheme}>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="success">
            {toastMessage}
          </MuiAlert>
        </Snackbar>
      </ThemeProvider>

    </Router>
  );
}

export default App;

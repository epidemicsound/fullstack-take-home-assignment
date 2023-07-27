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
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme";
import PlaylistDetail from "./features/Playlist/PlaylistTrack"


function App() {
  const [tracks, setTracks] = useState([]);
  const [playLists, setPlayLists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isTracksFetched, setIsTrackFetched] = useState(false);
  const [isPlaylistFetched, setIsPlaylistFetched] = useState(false)

  const showToast = (message, type = 'success') => {
    setOpenSnackbar(true);
    setToastMessage(message);
    setToastType(type)

  }

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

  const fetchPlaylist = (sort="name") => {
    fetch("http://0.0.0.0:8000/playlists/?sort="+sort, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      setPlayLists(data)
      setIsPlaylistFetched(true)
    })
    .catch((err) => { 
      showToast("Something went wrong", "error");
      setIsPlaylistFetched(true) });
  }


  const fetchTracks = () => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setTracks(data)
        setIsTrackFetched(true)
      }
      )
      .catch((err) => {
        showToast("Something went wrong", "error")
        setIsTrackFetched(true)
      });


  }
  useEffect(() => {
    setActiveTab(window.location.pathname);
    fetchPlaylist();
    fetchTracks();    
    

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
                <Tab key={ix} label={item.lable} value={item.route} component={NavLink} to={item.route} style={{ color: activeTab === item.route ? "lightblue" : "#fff" }} />

              ))}
            </Tabs>
          </AppBar>
        </nav>

        <Routes>
          <Route path="/" element={!isTracksFetched ? "Loading..." : <TrackList tracks={tracks} playLists={playLists} showToast={showToast} handlePlay={handlePlay} />} />
          <Route path="/playlists" element={!isPlaylistFetched ? "Loading..." : <PlaylistList playLists={playLists}  fetchPlaylist={fetchPlaylist} showToast={showToast}   />} />
          <Route
        path="/playlists/:id"
        element={<PlaylistDetail handlePlay={handlePlay} fetchPlaylist={fetchPlaylist}  showToast={showToast} playLists={playLists} />} // Replace 'PlaylistDetail' with the component for displaying playlist detail
      />
        
        </Routes>

      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
      <ThemeProvider theme={darkTheme}>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity={toastType}>
            {toastMessage}
          </MuiAlert>
        </Snackbar>
      </ThemeProvider>

    </Router>
  );
}

export default App;

import { Box, Tab, Tabs, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import Playlist from "./components/Playlists";
import Tracklist from "./components/Tracklist";
import { theme } from "./context/theme";
import playlistData from "./data/playlists.json";

export interface Track {
  id: string;
  title: string;
  bpm: number;
  coverArt: string;
  audio: string;
  artists: string;
  duration: number;
  genres: string;
  moods: string;
  waveform: string;
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [activeTab, setActiveTab] = useState("tracks");

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) =>
        setTracks(
          data.map((t) => ({
            id: t.id,
            title: t.title,
            bpm: t.bpm,
            coverArt: t.cover_art,
            audio: t.audio,
            artists: t.main_artists.join(", "),
            duration: t.length,
            genres: t.genres.join(", "),
            moods: t.moods.join(", "),
            waveform: t.waveform,
          }))
        )
      );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt='Logo' />
        </nav>
        <Tabs
          className={styles.navtabs}
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
        >
          <Tab
            className={activeTab === "tracks" ? styles.active : ""}
            label='Tracks'
            value='tracks'
          />
          <Tab
            className={activeTab === "playlists" ? styles.active : ""}
            label='Playlists'
            value='playlists'
          />
        </Tabs>
        {activeTab === "tracks" ? (
          <Tracklist tracks={tracks} />
        ) : (
          <Playlist playlists={playlistData} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;

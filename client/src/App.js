// App.js
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import PlaylistRow from "./components/PlaylistRow";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [activeTab, setActiveTab] = useState("tracks");
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const fetchPlaylists = () => {
    fetch("http://localhost:8000/playlists/", { mode: "cors" })
        .then((res) => res.json())
        .then((data) => setPlaylists(data))
        .catch((error) => console.error("Error fetching playlists:", error));
  };

  useEffect(() => {
    // Fetch tracks
    fetch("http://localhost:8000/tracks/", { mode: "cors" })
        .then((res) => res.json())
        .then((data) => setTracks(data));

    // Fetch playlists
    fetchPlaylists();
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  const handleAddPlaylist = () => {
    fetch("http://localhost:8000/playlists/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newPlaylistName }),
    })
        .then((res) => {
          if (res.ok) {
            // Clear the input field
            setNewPlaylistName("");
            // Fetch playlists again to update the state
            fetchPlaylists();
          } else {
            throw new Error("Failed to add playlist");
          }
        })
        .catch((error) => console.error("Error adding playlist:", error));
  };

  const renderContent = () => {
    if (activeTab === "tracks") {
      return (
          <>
            <h2>Tracks</h2>
            {tracks.map((track, ix) => (
                <TrackRow key={ix} track={track} handlePlay={handlePlay} />
            ))}
          </>
      );
    } else if (activeTab === "playlists") {
      return (
          <>
            <h2>Playlists</h2>
            <div className={styles.addPlaylist}>
              <input
                  type="text"
                  placeholder="Enter playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className={styles.playlistInput}
              />
              <button onClick={handleAddPlaylist} className={styles.playlistButton}>
                Add Playlist
              </button>
            </div>
            {playlists.map((playlist, ix) => (
                <PlaylistRow key={ix} playlist={playlist} handleDeletePlaylist={handleDeletePlaylist} />
            ))}
          </>
      );
    }
    return null;
  };

  const handleDeletePlaylist = (playlistId) => {
    fetch(`http://localhost:8000/playlists/${playlistId}/`, {
      method: "DELETE",
    })
        .then((res) => {
          if (res.ok) {
            // Fetch playlists again to update the state
            fetchPlaylists();
          } else {
            throw new Error("Failed to delete playlist");
          }
        })
        .catch((error) => console.error("Error deleting playlist:", error));
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
                    className={activeTab === "tracks" ? styles.active : ""}
                    onClick={() => setActiveTab("tracks")}
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                    href="#"
                    className={activeTab === "playlists" ? styles.active : ""}
                    onClick={() => setActiveTab("playlists")}
                >
                  Playlists
                </a>
              </li>
            </ul>
          </nav>
          <section>
            {renderContent()}
          </section>
        </main>
        {currentTrack && <AudioPlayer track={currentTrack} />}
      </>
  );
}

export default App;

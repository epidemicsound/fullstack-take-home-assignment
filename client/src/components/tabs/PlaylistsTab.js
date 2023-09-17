import React, { useEffect, useState } from "react";
import PlaylistRow from "../rows/PlaylistRow";
import styles from "./PlaylistsTab.module.css";

function PlaylistsTab() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handleCreatePlaylist = () => null;

  return (
    <div>
      <button className={styles.createButton} onClick={handleCreatePlaylist}>
        Create Playlist
      </button>
      {playlists.map((playlist, idx) => (
        <PlaylistRow key={idx} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistsTab;

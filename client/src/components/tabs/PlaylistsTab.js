import React, { useEffect, useState } from "react";
import PlaylistRow from "../rows/PlaylistRow";
import styles from "./PlaylistsTab.module.css";
import CreatePlaylistForm from "../form/CreatePlaylistForm";

function PlaylistsTab() {
  const [playlists, setPlaylists] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handleCreatePlaylist = () => setIsFormOpen(true);
  const handleCreatePlaylistFinish = (data) => {
    setIsFormOpen(false);
    if (data) {
      setPlaylists((prevState) => [...prevState, data]);
    }
  };

  return (
    <div>
      <button className={styles.createButton} onClick={handleCreatePlaylist}>
        Create Playlist
      </button>
      {isFormOpen && (
        <CreatePlaylistForm onFinish={handleCreatePlaylistFinish} />
      )}
      {playlists.map((playlist, idx) => (
        <PlaylistRow key={idx} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistsTab;

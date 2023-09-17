import React from "react";
import styles from "./PlaylistRow.module.css";

function PlaylistRow({ playlist, handleOpenPlaylist }) {
  const handleDeletePlaylist = () => null;
  return (
    <div className={styles.playlistRow}>
      <div className={styles.playlistTitle}>{playlist.title}</div>
      <button className={styles.deleteButton} onClick={handleDeletePlaylist}>
        Delete Playlist
      </button>
    </div>
  );
}

export default PlaylistRow;

import React from "react";
import styles from "./PlaylistRow.module.css";

function PlaylistRow({ playlist }) {
  return (
    <div className={styles.playlistRow}>
      <div className={styles.playlistInfo}>
        <div className={styles.playlistTitle}>{playlist.name}</div>
        <div className={styles.playlistSubtitle}>
          {playlist.created_at}
        </div>
      </div>
    </div>
  );
}

export default PlaylistRow;

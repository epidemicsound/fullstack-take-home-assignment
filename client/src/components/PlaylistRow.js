import React from "react";
import styles from "./PlaylistRow.module.css";

function PlaylistRow({ playlist, handleOpenPlaylist }) {
  return (
    <div className={styles.playlistRow}>
      <button
        className={styles.playlistOpen}
        onClick={() => handleOpenPlaylist(playlist)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="white" />
        </svg>
      </button>
      <div className={styles.playlistInfo}>
        <div className={styles.playlistTitle}>{playlist.title}</div>
        {/*<div className={styles.trackArtist}>*/}
        {/*  {track.main_artists.join(", ")}*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default PlaylistRow;

import React from "react";
import styles from "./Playlist.module.css";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

function PlaylistRow({ playList, handlePlay }) {
  return (
    <div className={styles.trackRow}>
      <QueueMusicIcon style={{ fontSize: 24, fill: "#fff" }} />
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{playList.title}</div>
      </div>
    </div>
  );
}

export default PlaylistRow;

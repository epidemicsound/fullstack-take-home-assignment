import React from "react";

import styles from "./PlaylistHeader.module.css";
import { secondsToHumanFriendlyDuration } from "../../util/timeFormatter";

function PlaylistHeader({ playlist, tracks, deletePlaylist }) {
  const { id, title } = playlist;

  const duration = tracks
    .map((track) => track.track.length)
    .reduce((prev, curr) => prev + curr, 0);

  const handleDelete = (event) => {
    event.preventDefault();
    deletePlaylist(id);
  };

  return (
    <>
      <div className={styles.playlistHeaderMetadata}>
        <h2>{title}</h2>
        <span>
          {tracks.length} songs • {secondsToHumanFriendlyDuration(duration)}
        </span>
      </div>
      <div className={styles.playlistHeaderButtons}>
        <button>Play</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

export default PlaylistHeader;

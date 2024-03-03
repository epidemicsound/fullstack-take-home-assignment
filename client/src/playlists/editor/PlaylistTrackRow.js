import React from "react";
import styles from "./PlaylistTrackRow.module.css";

function PlaylistTrackRow({ playlistTrack, addTrack, removeTrack }) {
  const showAdd = addTrack !== undefined;
  const showRemove = removeTrack !== undefined;

  const { title, main_artists, length } = playlistTrack.track;

  return (
    <div className={styles.trackRow}>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{title}</div>•
        <div className={styles.trackArtist}>{main_artists.join(", ")}</div>•
        <div className={styles.trackArtist}>
          {secondsToHumanFriendlyDuration(length)}
        </div>
      </div>
      <div className={styles.trackButtons}>
        {showAdd && <button onClick={() => addTrack(playlistTrack)}>+</button>}
        {showRemove && (
          <button onClick={() => removeTrack(playlistTrack)}>-</button>
        )}
      </div>
    </div>
  );
}

function secondsToHumanFriendlyDuration(length) {
  const minutes = Math.floor((length % 3600) / 60);
  const seconds = length % 60;
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");
  return `${minutesStr}:${secondsStr}`;
}

export default PlaylistTrackRow;

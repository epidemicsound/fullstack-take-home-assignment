import React from "react";
import styles from "./PlaylistTrackRow.module.css";

function PlaylistTrackRow({ track, addTrack, removeTrack }) {
  const showAdd = addTrack !== undefined;
  const showRemove = removeTrack !== undefined;

  return (
    <div className={styles.trackRow}>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>•
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
        •
        <div className={styles.trackArtist}>
          {secondsToHumanFriendlyDuration(track.length)}
        </div>
      </div>
      <div className={styles.trackButtons}>
        {showAdd && <button onClick={() => addTrack(track)}>+</button>}
        {showRemove && <button onClick={() => removeTrack(track)}>-</button>}
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

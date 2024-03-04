import React from "react";
import styles from "./PlaylistTrackRow.module.css";
import { secondsToHumanFriendlyDuration } from "../../util/timeFormatter";

function PlaylistTrackRow({ track, addTrack, removeTrack }) {
  const showAdd = addTrack !== undefined;
  const showRemove = removeTrack !== undefined;

  if (track === undefined) {
    return <></>;
  }

  const { title, main_artists, length } = track;

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
        {showAdd && <button onClick={() => addTrack(track)}>+</button>}
        {showRemove && <button onClick={() => removeTrack(track)}>-</button>}
      </div>
    </div>
  );
}

export default PlaylistTrackRow;

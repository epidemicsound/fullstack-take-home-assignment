import React, {useState} from "react";
import styles from "./TrackRow.module.css";

import TrackRow from "./TrackRow"

function Playlist({ playlist, deletePlaylist, addToPlaylist, removeFromPlaylist, handlePlay, trackLookup, trackCandidates }) {
  const [tracks, setTracks] = useState(playlist.ordered_tracks);
  const [hideAddition, setHideAddition] = useState(true);

  const addTrack =
    track_id =>
      addToPlaylist(playlist, track_id)
        .then(res => setTracks(tracks.concat([track_id])));

  const removeTrack =
    track_id =>
      removeFromPlaylist(playlist, track_id)
        .then(res => setTracks(tracks.filter(a => a !== track_id)));

  return (
    <div>
      <div className={styles.trackInfo}>
        <span className={styles.trackTitle}>{playlist.title}</span>
        <button onClick={() => deletePlaylist(playlist)}>X</button>
      </div>

      <div className="tracks">
        {tracks.map((track_id, ix) =>
          <div key={ix}>
            <TrackRow track={trackLookup(track_id)} handlePlay={handlePlay} />
            <button onClick={() => removeTrack(track_id)}>X</button>
          </div>
        )}
      </div>

      <div className="trackCandidates">
        <div className={`${!hideAddition ? "hidden" : ""}`}>
          <button onClick={() => setHideAddition(false)}>+</button>
        </div>

        <div className={`${hideAddition ? "hidden" : ""}`}>
          <button onClick={() => setHideAddition(true)}>-</button>

          <ul>
            {(trackCandidates(tracks)).map((t, ix) =>
              <li key={ix}>{t.title} <button onClick={() => addTrack(t.id)}>+</button></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Playlist;

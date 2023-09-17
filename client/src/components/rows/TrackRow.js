import React, { useState } from "react";
import styles from "./TrackRow.module.css";

function TrackRow({
  track,
  handlePlay,
  showAddToPlaylistButton = false,
  showDeleteButton = false,
  onButtonClick,
  playlists,
}) {
  const [showPlaylists, setShowPlaylists] = useState(false);

  const handleAddToPlaylist = (playlistId) => {
    fetch(`http://0.0.0.0:8000/playlists/${playlistId}/tracks/`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ track_id: track.id }]),
    });
  };

  return (
    <>
      <div className={styles.trackRow}>
        <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
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
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        {showAddToPlaylistButton && (
          <button
            className={styles.addButton}
            onClick={() => setShowPlaylists(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                fill="white"
              />
            </svg>
          </button>
        )}
        {showDeleteButton && (
          <button className={styles.deleteButton} onClick={onButtonClick}>
            Delete from Playlist
          </button>
        )}
      </div>
      {showPlaylists &&
        playlists.map((playlist) => (
          <div key={playlist.id}>
            <span>{playlist.title}</span>{" "}
            <button onClick={() => handleAddToPlaylist(playlist.id)}>
              Add
            </button>
          </div>
        ))}
    </>
  );
}

export default TrackRow;

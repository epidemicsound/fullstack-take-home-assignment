import React, { useState } from "react";
import styles from "./TrackRow.module.css";
import AddButton from "../buttons/AddButton";
import Button, { BUTTON_TYPES } from "../buttons/Button";
import PlayButton from "../buttons/PlayButton";

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
        <PlayButton onClick={() => handlePlay(track)} />
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        <div className={styles.actionButton}>
          {showAddToPlaylistButton && (
            <AddButton onClick={() => setShowPlaylists(true)} />
          )}
          {showDeleteButton && (
            <Button type={BUTTON_TYPES.delete} onClick={onButtonClick}>
              Delete from Playlist
            </Button>
          )}
        </div>
      </div>
      {showPlaylists &&
        playlists.map((playlist) => (
          <div className={styles.playlistRow} key={playlist.id}>
            <span>{playlist.title}</span>{" "}
            <AddButton onClick={() => handleAddToPlaylist(playlist.id)} />
          </div>
        ))}
    </>
  );
}

export default TrackRow;

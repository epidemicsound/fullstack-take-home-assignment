import React, { useMemo, useState } from "react";
import styles from "./TrackRow.module.css";
import AddButton from "../buttons/AddButton";
import Button, { BUTTON_TYPES } from "../buttons/Button";
import PlayButton from "../buttons/PlayButton";
import { usePlay } from "../../context/PlayContext";

function TrackRow({
  track,
  showAddToPlaylistButton = false,
  showDeleteButton = false,
  onButtonClick,
  playlists,
}) {
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = usePlay();
  const [showPlaylists, setShowPlaylists] = useState(false);
  const isCurrentPlaying = useMemo(
    () => currentTrack.id === track.id && isPlaying,
    [currentTrack, isPlaying],
  );

  const handlePlayButtonClick = () => {
    setCurrentTrack(track);
    setIsPlaying(!isCurrentPlaying);
  };

  const handleAddToPlaylist = (playlistId) => {
    fetch(`${process.env.REACT_APP_API_HOST}/playlists/${playlistId}/tracks/`, {
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
        <PlayButton
          isPlaying={isCurrentPlaying}
          onClick={handlePlayButtonClick}
        />
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

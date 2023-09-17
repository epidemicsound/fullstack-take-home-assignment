import React, { useEffect, useMemo, useState } from "react";
import styles from "./PlaylistRow.module.css";
import TrackRow from "./TrackRow";
import Button, { BUTTON_TYPES } from "../buttons/Button";

function PlaylistRow({ playlist, onDelete }) {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [tracksData, setTracksData] = useState({ isLoaded: false, data: [] });
  const handleDeletePlaylist = () => onDelete(playlist.id);
  const handleTogglePlaylist = () => setIsPlaylistOpen((prev) => !prev);

  const handleDeleteTrack = (trackId) => {
    fetch(`http://0.0.0.0:8000/playlists/${playlist.id}/tracks/${trackId}/`, {
      mode: "cors",
      method: "DELETE",
    }).then(() =>
      setTracksData((prevState) => ({
        isLoaded: true,
        data: prevState.data.filter((track) => track.id !== trackId),
      })),
    );
  };

  useEffect(() => {
    if (!isPlaylistOpen || tracksData.isLoaded) return;
    fetch(`http://0.0.0.0:8000/playlists/${playlist.id}/`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setTracksData({ isLoaded: true, data: data.tracks });
      });
  }, [isPlaylistOpen, tracksData.isLoaded]);

  const playlistContent = useMemo(() => {
    if (!isPlaylistOpen) return null;
    if (!tracksData.isLoaded) return <span>Loading...</span>;
    if (!tracksData.data.length) return <span>No tracks yet</span>;
    return tracksData.data.map((track, idx) => (
      <TrackRow
        key={idx}
        track={track}
        showDeleteButton
        onButtonClick={() => handleDeleteTrack(track.id)}
      />
    ));
  }, [tracksData, isPlaylistOpen]);

  return (
    <div className={isPlaylistOpen ? styles.playlistRowOpen : ""}>
      <div className={styles.playlistRow} onClick={handleTogglePlaylist}>
        <div className={styles.playlistTitle}>{playlist.title}</div>
        <Button type={BUTTON_TYPES.delete} onClick={handleDeletePlaylist}>
          Delete Playlist
        </Button>
      </div>
      {playlistContent}
    </div>
  );
}

export default PlaylistRow;

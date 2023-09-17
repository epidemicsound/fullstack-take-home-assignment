import React, { useEffect, useMemo, useState } from "react";
import styles from "./PlaylistRow.module.css";
import TrackRow from "./TrackRow";

function PlaylistRow({ playlist, onDelete }) {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [tracksData, setTracksData] = useState({ isLoaded: false, data: [] });
  const handleDeletePlaylist = () => onDelete(playlist.id);
  const handleTogglePlaylist = () => setIsPlaylistOpen((prev) => !prev);

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
      <TrackRow key={idx} track={track} />
    ));
  }, [tracksData, isPlaylistOpen]);

  return (
    <>
      <div className={styles.playlistRow} onClick={handleTogglePlaylist}>
        <div className={styles.playlistTitle}>{playlist.title}</div>
        <button className={styles.deleteButton} onClick={handleDeletePlaylist}>
          Delete Playlist
        </button>
      </div>
      {playlistContent}
    </>
  );
}

export default PlaylistRow;

import React, { useEffect, useState } from "react";
import PlaylistRow from "./PlaylistRow";
import styles from "../css/PlaylistRow.module.css";
import { getPlaylists, deletePlaylist } from "../api/PlaylistApi";

const PlaylistsList = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      const playlists = await getPlaylists();
      setPlaylists(playlists);
    }
    fetchPlaylists();
  }, []);

  const handlePlaylistDelete = async (playlistId) => {
    await deletePlaylist(playlistId);
    const remainingPlaylists = playlists.filter(
      (playlist) => playlist.id !== playlistId
    );
    setPlaylists(remainingPlaylists);
  };

  return (
    <table className={styles.playlistTable}>
      {playlists.map((playlist, ix) => (
        <PlaylistRow
          key={ix}
          playlist={playlist}
          handlePlaylistDelete={handlePlaylistDelete}
        />
      ))}
    </table>
  );
};

export default PlaylistsList;

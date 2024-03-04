import React, { useEffect, useState } from "react";

import PlaylistTrackRow from "./PlaylistTrackRow";

import { usePlaylistTracks } from "../../hooks/usePlaylists";
import { savePlaylistChanges } from "../../services/PlaylistService";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistEditorAddSongs from "./PlaylistEditorAddSongs";

import styles from "./PlaylistEditor.module.css";

function PlaylistEditor({ playlist, allTracks, deletePlaylist }) {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const { tracks } = usePlaylistTracks(playlist?.id);

  useEffect(() => {
    const sortedTracks = tracks.sort((t1, t2) => t1.order - t2.order);
    setPlaylistTracks(sortedTracks);
  }, [tracks]);

  if (playlist === undefined) {
    return <div className={styles.playlistTracks}></div>;
  }

  const addToPlaylist = (track) => {
    const oldTracks = [...playlistTracks];
    const newPlaylistTrack = { track };
    const newTracks = [...playlistTracks, newPlaylistTrack];
    setPlaylistTracks(newTracks);

    savePlaylistChanges(playlist.id, playlist.title, newTracks)
      .then((updatedTracks) => setPlaylistTracks(updatedTracks))
      .catch((err) => {
        // Revert changes if post fails
        console.error(err);
        setPlaylistTracks(oldTracks);
      });
  };

  const removeFromPlaylist = (trackToDelete) => {
    const oldTracks = [...playlistTracks];
    const newTracks = playlistTracks.filter(
      ({ track }) => track.id !== trackToDelete.id,
    );
    setPlaylistTracks(newTracks);

    savePlaylistChanges(playlist.id, playlist.title, newTracks).catch((err) => {
      // Revert changes if post fails
      console.error(err);
      setPlaylistTracks(oldTracks);
    });
  };

  return (
    <div className={styles.playlistTracks}>
      <div className={styles.playlistHeader}>
        <PlaylistHeader
          playlist={playlist}
          tracks={playlistTracks}
          deletePlaylist={deletePlaylist}
        />
      </div>

      <div className={styles.addedTracksContainer}>
        {playlistTracks.map(({ track }) => (
          <PlaylistTrackRow
            key={track.id}
            track={track}
            removeTrack={removeFromPlaylist}
          />
        ))}
      </div>

      <div className={styles.addSongsContainer}>
        <PlaylistEditorAddSongs
          playlistTracks={playlistTracks}
          allTracks={allTracks}
          addTrack={addToPlaylist}
        />
      </div>
    </div>
  );
}

export default PlaylistEditor;

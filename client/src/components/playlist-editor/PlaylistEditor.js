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

  const moveTrackUp = (track) => {
    const oldTracks = [...playlistTracks];
    const trackToMoveUp = oldTracks.find(
      (playlistTrack) => playlistTrack.track.id === track.id,
    );
    if (trackToMoveUp.order === 0) {
      return;
    }

    const newOrder = trackToMoveUp.order - 1;
    const newPlaylistTracks = oldTracks
      .map((playlistTrack) => {
        if (playlistTrack.id === trackToMoveUp.id) {
          return { ...playlistTrack, order: newOrder };
        }
        // Move down the old track in that position
        if (playlistTrack.order === newOrder) {
          return { ...playlistTrack, order: newOrder + 1 };
        }
        return playlistTrack;
      })
      .sort((t1, t2) => t1.order - t2.order);
    setPlaylistTracks(newPlaylistTracks);

    savePlaylistChanges(playlist.id, playlist.title, newPlaylistTracks).catch(
      (err) => {
        // Revert changes if post fails
        console.error(err);
        setPlaylistTracks(oldTracks);
      },
    );
  };

  const moveTrackDown = (track) => {
    const oldTracks = [...playlistTracks];
    const trackToMoveUp = oldTracks.find(
      (playlistTrack) => playlistTrack.track.id === track.id,
    );
    if (trackToMoveUp.order === oldTracks.length - 1) {
      return;
    }

    const newOrder = trackToMoveUp.order + 1;
    const newPlaylistTracks = oldTracks
      .map((playlistTrack) => {
        if (playlistTrack.id === trackToMoveUp.id) {
          return { ...playlistTrack, order: newOrder };
        }
        // Move up the old track in that position
        if (playlistTrack.order === newOrder) {
          return { ...playlistTrack, order: newOrder - 1 };
        }
        return playlistTrack;
      })
      .sort((t1, t2) => t1.order - t2.order);
    setPlaylistTracks(newPlaylistTracks);

    savePlaylistChanges(playlist.id, playlist.title, newPlaylistTracks).catch(
      (err) => {
        // Revert changes if post fails
        console.error(err);
        setPlaylistTracks(oldTracks);
      },
    );
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
            moveUp={moveTrackUp}
            moveDown={moveTrackDown}
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
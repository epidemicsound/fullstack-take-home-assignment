import React, { useEffect, useState } from "react";

import PlaylistTrackRow from "./PlaylistTrackRow";

import styles from "./PlaylistEditor.module.css";
import { usePlaylistTracks } from "../usePlaylists";
import { savePlaylistChanges } from "./PlaylistService";

function PlaylistEditor({ playlist, allTracks }) {
  const [trackSearch, setTrackSearch] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const { tracks } = usePlaylistTracks(playlist?.id);

  useEffect(() => {
    setPlaylistTracks(tracks);
  }, [tracks]);

  if (playlist === undefined) {
    return <div className={styles.playlistTracks}></div>;
  }

  const addToPlaylist = (playlistTrack) => {
    const oldTracks = [...playlistTracks];
    const newTracks = [...playlistTracks, playlistTrack];
    setPlaylistTracks(newTracks);

    savePlaylistChanges(playlist.id, playlist.title, newTracks)
      .then((updatedTracks) => setPlaylistTracks(updatedTracks))
      .catch((err) => {
        // Revert changes if post fails
        console.error(err);
        setPlaylistTracks(oldTracks);
      });
  };

  const removeFromPlaylist = (playlistTrack) => {
    const oldTracks = [...playlistTracks];
    const newTracks = playlistTracks.filter(
      ({ id }) => id !== playlistTrack?.id,
    );
    setPlaylistTracks(newTracks);

    savePlaylistChanges(playlist.id, playlist.title, newTracks).catch((err) => {
      // Revert changes if post fails
      console.error(err);
      setPlaylistTracks(oldTracks);
    });
  };

  const includeInResult = (track) => {
    const { id, title, genres, main_artists } = track;

    // do not show if track is already in playlist
    const trackIdsInPlaylist = playlistTracks.map(({ track }) => track.id);
    if (trackIdsInPlaylist.find((trackId) => trackId === id)) {
      return false;
    }

    if (trackSearch === "") return true;

    if (title.toLocaleLowerCase().includes(trackSearch)) {
      return true;
    }

    const artists = main_artists.join(", ").toLocaleLowerCase();
    if (artists.includes(trackSearch)) {
      return true;
    }

    const genresLower = genres.join(", ").toLocaleLowerCase();
    if (genresLower.includes(trackSearch)) {
      return true;
    }

    return false;
  };

  const filteredTracks = allTracks
    .filter(includeInResult)
    .map((track) => ({ track }));

  return (
    <div className={styles.playlistTracks}>
      <div className={styles.playlistHeader}>
        <h2>{playlist.title}</h2>
      </div>

      <div className={styles.addedTracksContainer}>
        {playlistTracks.map((playlistTrack) => (
          <PlaylistTrackRow
            key={playlistTrack.track.id}
            playlistTrack={playlistTrack}
            removeTrack={removeFromPlaylist}
          />
        ))}
      </div>

      <hr />

      <p>Add more tracks:</p>
      <input
        type="text"
        value={trackSearch}
        onChange={(e) => setTrackSearch(e.target.value)}
      />
      <div className={styles.trackResultsContainer}>
        {filteredTracks.map((track) => (
          <PlaylistTrackRow
            key={track.track.id}
            playlistTrack={track}
            addTrack={addToPlaylist}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistEditor;

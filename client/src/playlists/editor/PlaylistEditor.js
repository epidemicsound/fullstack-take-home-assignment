import React, { useEffect, useState } from "react";

import PlaylistTrackRow from "./PlaylistTrackRow";

import styles from "./PlaylistEditor.module.css";
import { usePlaylistTracks } from "../usePlaylists";

function PlaylistEditor({ playlist, allTracks }) {
  const [trackSearch, setTrackSearch] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const { tracks } = usePlaylistTracks(playlist?.id);

  const filteredTracks = allTracks.filter((track) =>
    includeInResult(track, trackSearch, playlistTracks),
  );

  useEffect(() => {
    setPlaylistTracks(tracks);
  }, [tracks]);

  const addToPlaylist = (track) => {
    setPlaylistTracks([...playlistTracks, track]);
    //TODO: send change to backend
  };

  const removeFromPlaylist = (track) => {
    const newTracks = playlistTracks.filter(({ id }) => id !== track?.id);
    setPlaylistTracks(newTracks);
    //TODO: send change to backend
  };

  if (playlist === undefined) {
    return <div className={styles.playlistTracks}></div>;
  }

  return (
    <div className={styles.playlistTracks}>
      <div className={styles.playlistHeader}>
        <h2>{playlist.title}</h2>
      </div>

      <div className={styles.addedTracksContainer}>
        {playlistTracks.map((track) => (
          <PlaylistTrackRow
            key={track.id}
            track={track}
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
            key={track.id}
            track={track}
            addTrack={addToPlaylist}
          />
        ))}
      </div>
    </div>
  );
}

function includeInResult(track, searchQuery, playlistTracks) {
  if (searchQuery === "") return false;

  if (playlistTracks.find(({ id }) => id === track.id)) {
    // track already in playlist
    return false;
  }

  const title = track.title.toLocaleLowerCase();
  if (title.includes(searchQuery)) {
    return true;
  }

  const artists = track.main_artists.join(", ").toLocaleLowerCase();
  if (artists.includes(searchQuery)) {
    return true;
  }

  const genres = track.genres.join(", ").toLocaleLowerCase();
  if (genres.includes(searchQuery)) {
    return true;
  }

  return false;
}

export default PlaylistEditor;

import React, { useState } from "react";
import PlaylistTrackRow from "./PlaylistTrackRow";

import styles from "./PlaylistEditorAddSongs.module.css";

function PlaylistEditorAddSongs({ playlistTracks, allTracks, addTrack }) {
  const [trackSearch, setTrackSearch] = useState("");

  const isTrackInSearchResults = (track) => {
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

  const filteredTracks = allTracks.filter(isTrackInSearchResults);

  return (
    <>
      <p>Add more tracks:</p>
      <input
        type="text"
        value={trackSearch}
        onChange={(e) => setTrackSearch(e.target.value)}
      />
      <div className={styles.trackResultsContainer}>
        {filteredTracks.map((track) => (
          <PlaylistTrackRow key={track.id} track={track} addTrack={addTrack} />
        ))}
      </div>
    </>
  );
}

export default PlaylistEditorAddSongs;

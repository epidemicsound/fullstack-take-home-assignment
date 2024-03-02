import React, { useState } from "react";
import PlaylistEditor from "./editor/PlaylistEditor";

import useTracks from "../tracks/useTracks";

import styles from "./PlaylistsContainer.module.css";

function PlaylistsContainer({ playlists }) {
  const [activePlaylistId, setActivePlaylistId] = useState("1");

  const activePlaylist = playlists.find(({ id }) => id === activePlaylistId);

  const allTracks = useTracks().tracks;

  const playlistHeaderClasses = (playlistId) => {
    if (playlistId === activePlaylistId) {
      return `${styles.playlistHeader} ${styles.active}`;
    }
    return styles.playlistHeader;
  };

  return (
    <div className={styles.playlistsEditor}>
      <div className={styles.playlistsList}>
        {playlists.map((playlist) => {
          return (
            <button
              key={playlist.id}
              className={playlistHeaderClasses(playlist.id)}
              onClick={() => setActivePlaylistId(playlist.id)}
            >
              {playlist.title}
            </button>
          );
        })}
      </div>
      <div className={styles.playlistTracks}>
        <PlaylistEditor playlist={activePlaylist} allTracks={allTracks} />
      </div>
    </div>
  );
}

export default PlaylistsContainer;

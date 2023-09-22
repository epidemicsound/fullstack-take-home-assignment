import React, { useState } from 'react';
import styles from './Playlists.module.css';
import { formatDate } from '../util/formatter';
import Tracks from './Tracks';
import { useSelector } from 'react-redux';

const Playlists = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { playlists } = useSelector(state => state.player);

  const handleSelectPlaylist = playlist => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className={styles.playlistContainer}>
      <ul className={styles.playlistMenu}>
        {playlists.map((playlist, ix) => (
          <div
            key={`playlist-${ix}`}
            className={styles.playlistItem__container}
            onClick={() => handleSelectPlaylist(playlist)}
          >
            <li
              className={`${styles.playlistItem__title} ${
                playlist.id === selectedPlaylist?.id &&
                styles.playlistItem__active
              }`}
            >
              {playlist.name}
            </li>
            <span className={styles.playlistItem__subtitle}>
              {formatDate(playlist.created_at)}
            </span>
          </div>
        ))}
      </ul>
      {selectedPlaylist && (
        <div>
          <Tracks
            className={styles.playlistTracks}
            tracks={selectedPlaylist.tracks}
            playlistId={selectedPlaylist.id}
          />
        </div>
      )}
    </div>
  );
};

export default Playlists;

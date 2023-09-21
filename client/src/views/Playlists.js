import React, { useEffect, useState } from 'react';
import styles from './Playlists.module.css'
import { formatDate } from '../util/formatter';
import Tracks from './Tracks';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  }

  return (
    <div className={styles.playlistContainer}>
      <ul className={styles.playlistMenu}>
        {playlists.map((playlist, ix) => (
          <div key={`playlist-${ix}`} className={styles.playlistItem__container} onClick={() => handleSelectPlaylist(playlist)}>
            <li className={`${styles.playlistItem__title} ${playlist.id === selectedPlaylist?.id && styles.playlistItem__active}`}>{playlist.name}</li>
            <span className={styles.playlistItem__subtitle}>{formatDate(playlist.created_at)}</span>
          </div>
        ))}
      </ul>
      {selectedPlaylist && <Tracks className={styles.playlistTracks} tracks={selectedPlaylist.tracks} />}
    </div>
  )
}

export default Playlists;

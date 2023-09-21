import React, { useEffect, useState } from 'react';
import styles from './Playlists.module.css'
import { formatDate } from '../util/formatter';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

    return (
      <div className={styles.playlistContainer}>
        <ul className={styles.playlistMenu}>
          {playlists.map((playlist, ix) => (
            <div key={`playlist-${ix}`} className={styles.playlistItem__container}>
              <li className={styles.playlistItem__title}>{playlist.name}</li>
              <span className={styles.playlistItem__subtitle}>{formatDate(playlist.created_at)}</span>
            </div>
          ))}
        </ul>
      </div>
    )
}

export default Playlists;

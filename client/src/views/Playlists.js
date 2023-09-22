import React, { useState } from 'react';
import styles from './Playlists.module.css';
import { formatDate } from '../util/formatter';
import Tracks from './Tracks';
import { useSelector } from 'react-redux';
import plus from '../assets/plus.svg';
import CreatePlaylistModal from '../components/CreatePlaylistModal';

const Playlists = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const { playlists } = useSelector(state => state.player);

  const handleSelectPlaylist = playlist => {
    setSelectedPlaylist(playlist);
  };

  const handleCreatePlaylist = () => {
    setShowCreatePlaylistModal(true);
  };

  return (
    <>
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
          <div
            className={styles.playlistItem__container}
            onClick={handleCreatePlaylist}
          >
            <li className={styles.playlistItem__title}>
              <img
                width='15'
                height='15'
                src={plus}
                style={{ marginRight: '5px' }}
              />
              New playlist
            </li>
          </div>
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
      <CreatePlaylistModal
        show={showCreatePlaylistModal}
        setShowCreatePlaylistModal={setShowCreatePlaylistModal}
      />
    </>
  );
};

export default Playlists;

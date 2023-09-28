import React, { useState } from 'react';
import Modal from './Modal/Modal';

import styles from './CreatePlaylistModal.module.css';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../store/actions';

const CreatePlaylistModal = props => {
  const dispatch = useDispatch();
  const { show, setShowCreatePlaylistModal } = props;
  const [playlistName, setPlaylistName] = useState('');

  const onCreatePlaylist = () => {
    if (!playlistName) return;

    dispatch(createPlaylist({ name: playlistName }));
    setShowCreatePlaylistModal(false);
  };

  return (
    <Modal show={show}>
      <h2>Create new playlist</h2>
      <input
        value={playlistName}
        type='text'
        placeholder='Playlist name'
        onChange={e => setPlaylistName(e.target.value)}
      />
      <div className={styles.modalActions}>
        <button onClick={onCreatePlaylist}>Create</button>
        <button onClick={() => setShowCreatePlaylistModal(false)}>Close</button>
      </div>
    </Modal>
  );
};

export default CreatePlaylistModal;

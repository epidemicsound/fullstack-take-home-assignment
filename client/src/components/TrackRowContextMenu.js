import React, { useState } from 'react';
import { ContextMenu } from './ContextMenu/ContextMenu';
import Modal from './Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';

import styles from './TrackRowContextMenu.module.css';
import { addTrackToPlaylist, removeTrackFromPlaylist } from '../store/actions';

const TrackRowContextMenu = props => {
  const dispatch = useDispatch();
  const { playlistId, trackId, clicked, points } = props;
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [selectedPlaylistToAdd, setSelectedPlaylistToAdd] = useState(null);

  const { playlists } = useSelector(state => state.player);

  const onAddTrackToPlaylist = async () => {
    dispatch(
      addTrackToPlaylist({ playlistId: selectedPlaylistToAdd, trackId })
    );
    setShowAddTrackModal(false);
  };

  const onRemoveTrackFromPlaylist = async () => {
    dispatch(removeTrackFromPlaylist({ playlistId: playlistId, trackId }));
  };

  const trackRowContextMenu = [
    {
      label: 'Add to playlist',
      value: 'add_to_playlist',
      onClick: () => {
        setShowAddTrackModal(true);
      }
    }
  ];

  if (playlistId) {
    trackRowContextMenu.push({
      label: 'Remove from playlist',
      value: 'remove_from_playlist',
      onClick: onRemoveTrackFromPlaylist
    });
  }

  return (
    <>
      {clicked && (
        <ContextMenu
          menuData={trackRowContextMenu}
          top={points.y}
          left={points.x}
        />
      )}
      <Modal show={showAddTrackModal}>
        <h2>Select playlist</h2>
        <select
          className={styles.selectPlaylistDropdown}
          value={selectedPlaylistToAdd}
          onChange={e => setSelectedPlaylistToAdd(e.target.value)}
        >
          <option disabled selected value>
            {' -- select an option -- '}
          </option>
          {playlists.map((playlist, ix) => (
            <option key={`playlist-${ix}`} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <div className={styles.modalActions}>
          <button
            className={styles.selectPlaylistButton}
            onClick={onAddTrackToPlaylist}
            disabled={!selectedPlaylistToAdd}
          >
            Okay
          </button>
          <button
            className={styles.closePlaylistButton}
            onClick={() => setShowAddTrackModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TrackRowContextMenu;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ContextMenu } from './ContextMenu/ContextMenu';
import Modal from './Modal/Modal';

const TrackRowContextMenu = props => {
  const { playlistId, trackId, clicked, points } = props;
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);

  useEffect(() => {
    console.log('lastOperation', lastOperation);
  }, [lastOperation]);

  const trackRowContextMenu = [
    {
      label: 'Add to playlist',
      value: 'add_to_playlist',
      onClick: () => {
        setShowAddTrackModal(true);
      }
      //   onClick: async () => {
      //     await fetch(
      //       `http://0.0.0.0:8000/playlists/${playlistId}/tracks/${trackId}`,
      //       {
      //         method: 'POST',
      //         mode: 'cors'
      //       }
      //     )
      //       .then(res => res.json())
      //       .then(data => setLastOperation(data));
      //   }
    },
    {
      label: 'Remove from playlist',
      value: 'remove_from_playlist',
      onClick: () => console.log('Remove from playlist')
    }
  ];
  if (!playlistId) {
    trackRowContextMenu.filter(item => item.value !== 'remove_from_playlist');
  }

  return (
    clicked && (
      <>
        <ContextMenu
          menuData={trackRowContextMenu}
          top={points.y}
          left={points.x}
        />
        <Modal show={showAddTrackModal}></Modal>
      </>
    )
  );
};

export default TrackRowContextMenu;

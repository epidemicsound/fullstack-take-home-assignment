import React from 'react';
import { ContextMenu } from './ContextMenu/ContextMenu';
import { useDispatch } from 'react-redux';
import { deletePlaylist } from '../store/actions';

const PlaylistRowContextMenu = props => {
  const dispatch = useDispatch();
  const { clicked, points, playlistId } = props;
  const menuData = [
    {
      label: 'Delete playlist',
      value: 'delete_playlist',
      onClick: () => {
        dispatch(deletePlaylist({ playlistId }));
      }
    }
  ];
  return (
    <>
      {clicked && (
        <ContextMenu menuData={menuData} top={points.y} left={points.x} />
      )}
    </>
  );
};

export default PlaylistRowContextMenu;

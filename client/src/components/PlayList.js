import React from "react";
import PlaylistTrack from "./PlaylistTrack";
import Modal from "./createPlaylist";

function PlayList({ handlePlay, playlists }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (playlists?.length === 0) {
    return (
      <div>
        <button onClick={handleModalOpen}>Open Modal</button>
        {showModal && <Modal onClose={handleModalClose} />}
      </div>
    );
  }
  return playlists?.map((playlist, ix) => (
    <PlaylistTrack key={ix} playlist={playlist} handlePlay={handlePlay} />
  ));
}

export default PlayList;

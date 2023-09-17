import React, { useEffect, useState } from "react";
import PlaylistRow from "../rows/PlaylistRow";
import CreatePlaylistForm from "../form/CreatePlaylistForm";
import Button, { BUTTON_TYPES } from "../buttons/Button";
import usePlaylists from "../../hooks/usePlaylists";

function PlaylistsTab() {
  const [playlists, setPlaylists] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { getAll, deletePlaylist } = usePlaylists();

  useEffect(() => {
    getAll().then((data) => setPlaylists(data));
  }, []);

  const handleCreatePlaylist = () => setIsFormOpen(true);
  const handleCreatePlaylistFinish = (data) => {
    setIsFormOpen(false);
    if (data) {
      setPlaylists((prevState) => [...prevState, data]);
    }
  };

  const handleDeletePlaylist = (id) => {
    deletePlaylist(id).then(() =>
      setPlaylists((prevState) =>
        prevState.filter((playlist) => playlist.id !== id),
      ),
    );
  };

  return (
    <div>
      <Button type={BUTTON_TYPES.button} onClick={handleCreatePlaylist}>
        Create Playlist
      </Button>
      {isFormOpen && (
        <CreatePlaylistForm onFinish={handleCreatePlaylistFinish} />
      )}
      {playlists.map((playlist, idx) => (
        <PlaylistRow
          key={idx}
          playlist={playlist}
          onDelete={handleDeletePlaylist}
        />
      ))}
    </div>
  );
}

export default PlaylistsTab;

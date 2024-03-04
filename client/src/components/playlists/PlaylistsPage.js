import React, { useEffect, useState } from "react";

import PlaylistsContainer from "./PlaylistsContainer";

import styles from "./PlaylistsPage.module.css";
import { usePlaylists } from "../../hooks/usePlaylists";
import { createPlaylist, deletePlaylist } from "../../services/PlaylistService";

function PlaylistsPage() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);

  const { playlists } = usePlaylists();

  useEffect(() => {
    setUserPlaylists(playlists);
  }, [playlists]);

  const createNewPlaylist = (event) => {
    event.preventDefault();
    if (newPlaylistName === "") {
      return;
    }

    createPlaylist(newPlaylistName)
      .then((newPlaylist) => {
        setUserPlaylists([...userPlaylists, newPlaylist]);
        setNewPlaylistName("");
      })
      .catch((error) =>
        console.error(
          `Error while creating playlist ${newPlaylistName}:"${error}`,
        ),
      );
    // const tempId = `temp-${playlists.length + 1}`;
    // const newPlaylist = { id: tempId, name: newPlaylistName, tracks: [] };
    // playlists.push(newPlaylist);
    // setNewPlaylistName("");
  };

  const deletePlaylistById = (playlistId) => {
    const newPlaylists = userPlaylists.filter(({ id }) => id !== playlistId);
    setUserPlaylists(newPlaylists);

    deletePlaylist(playlistId)
      .then(() => console.log(`Successfully deleted playlist ${playlistId}`))
      .catch((error) =>
        console.error(`Error deleting playlist ${playlistId}: ${error}`),
      );
  };

  return (
    <div className={styles.playlistsContainer}>
      <section>
        <h4>Create a playlist</h4>
        <form>
          <div className={styles.newPlaylistInputs}>
            <label htmlFor="new-playlist-input">Name:</label>
            <input
              name="new-playlist-input"
              id="new-playlist-input"
              type="text"
              onChange={(e) => setNewPlaylistName(e.target.value)}
              value={newPlaylistName}
            ></input>
            <button
              className={styles.createPlaylistButton}
              onClick={createNewPlaylist}
            >
              Create
            </button>
          </div>
        </form>
      </section>

      <section>
        <h4>Your playlists</h4>
        <PlaylistsContainer
          playlists={userPlaylists}
          deletePlaylist={deletePlaylistById}
        />
      </section>
    </div>
  );
}
export default PlaylistsPage;

import React, { useState } from "react";

import PlaylistsContainer from "./PlaylistsContainer";

import styles from "./PlaylistsPage.module.css";
import { usePlaylists } from "./usePlaylists";

function PlaylistsPage() {
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const { playlists } = usePlaylists();

  const createPlaylist = (event) => {
    const tempId = `temp-${playlists.length + 1}`;
    const newPlaylist = { id: tempId, name: newPlaylistName, tracks: [] };
    playlists.push(newPlaylist);
    setNewPlaylistName("");
    event.preventDefault();
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
              onClick={createPlaylist}
            >
              Create
            </button>
          </div>
        </form>
      </section>

      <section>
        <h4>Your playlists</h4>
        <PlaylistsContainer playlists={playlists} />
      </section>
    </div>
  );
}
export default PlaylistsPage;

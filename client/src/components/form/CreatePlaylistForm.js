import { useState } from "react";
import styles from "./CreatePlaylistForm.module.css";
import Button, { BUTTON_TYPES } from "../buttons/Button";
import usePlaylists from "../../hooks/usePlaylists";
function CreatePlaylistForm({ onFinish }) {
  const [title, setTitle] = useState("");
  const { createPlaylist } = usePlaylists();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist({ title }).then((data) => onFinish(data));
  };

  const handleCancel = () => onFinish();
  return (
    <div className={styles.createPlaylistForm}>
      <h2>New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="title">
          <span>Playlist Title</span>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className={styles.buttons}>
          <Button type={BUTTON_TYPES.submit}>Create</Button>
          <Button type={BUTTON_TYPES.button} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;

import { useState } from "react";
import styles from "./CreatePlaylistForm.module.css";
function CreatePlaylistForm({ onFinish }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://0.0.0.0:8000/playlists/", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => onFinish(data));
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
          <button className={styles.createButton} type="submit">
            Create
          </button>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;

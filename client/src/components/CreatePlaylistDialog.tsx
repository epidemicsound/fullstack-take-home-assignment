import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import data from "../data/playlists.json";
import { PlaylistType } from "./Playlist";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistDialog: FC<Props> = ({ open, onClose }) => {
  const [playlistName, setPlaylistName] = useState("");

  const createPlaylist = () => {
    const input: PlaylistType = {
      id: uuidv4(),
      name: playlistName,
      tracks: [],
    };
    data.push(input);
    handleClose();
  };

  const handleClose = () => {
    setPlaylistName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create Playlist</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin='dense'
          label='Playlist name'
          value={playlistName}
          type='text'
          fullWidth
          variant='standard'
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={createPlaylist}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreatePlaylistDialog;

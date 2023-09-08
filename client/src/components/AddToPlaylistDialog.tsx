import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { Track } from "~/App";
import data from "../data/playlists.json";

interface Props {
  open: boolean;
  onClose: () => void;
  track: Track;
}

export const AddToPlaylistDialog: FC<Props> = ({ open, onClose, track }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const playListsOptions: { label: string; id: string }[] = [
    { label: "Create New", id: "NEW_PLAYLIST" },
  ].concat(
    data.map((playlist) => ({
      label: playlist.name,
      id: playlist.id,
    }))
  );

  const addToPlaylist = (track) => {
    const filteredList = data.filter(
      (playlist) => playlist.id === selectedPlaylist
    );
    const trackExists: boolean =
      filteredList[0].tracks.filter((t) => t.id === track.id).length > 0
        ? true
        : false;
    trackExists && setShowErrorAlert(true);

    const updatedList = data.find((f) => f.id === selectedPlaylist);
    if (!trackExists) {
      updatedList.tracks.push(track);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedPlaylist(null);
    setShowErrorAlert(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ height: "500px" }}
    >
      <DialogTitle>Add to Playlist</DialogTitle>
      <DialogContent>
        {showErrorAlert && (
          <Box m={2}>
            <Alert severity='warning'>
              This track already exists in the selected playlist. Try with
              another playlist.
            </Alert>
          </Box>
        )}
        <Autocomplete
          fullWidth
          options={playListsOptions}
          renderInput={(params) => (
            <TextField {...params} label='Select playlist' />
          )}
          onChange={(_, newValue) => {
            setSelectedPlaylist(newValue.id);
          }}
        />
        {selectedPlaylist === "NEW_PLAYLIST" && (
          <TextField
            required
            autoFocus
            margin='dense'
            label='Playlist name'
            type='text'
            value={newPlaylistName}
            fullWidth
            variant='standard'
            onChange={(e) => {
              setNewPlaylistName(e.target.value);
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => addToPlaylist(track)}>
          {selectedPlaylist === "NEW_PLAYLIST" ? "Create and Add" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddToPlaylistDialog;

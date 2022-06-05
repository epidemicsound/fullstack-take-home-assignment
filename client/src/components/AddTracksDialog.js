import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {useState} from "react";

function AddTracksDialog({open, handleClose, options, handleAddTracks}) {
  const [selectedTracks, setSelectedTracks] = useState([]);

  const closeAndClear = () => {
    handleClose();
    setSelectedTracks([]);
  }

  const addTracksAndClear = () => {
    handleAddTracks(selectedTracks);
    closeAndClear();
  }

  return (
    <Dialog open={open} onClose={closeAndClear} fullWidth>
      <DialogTitle>Add tracks</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={options}
          getOptionLabel={(track) => track.title}
          value={selectedTracks}
          onChange={(e, v) => setSelectedTracks(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Select tracks"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={addTracksAndClear}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTracksDialog;
import React, { useState, useEffect } from "react";
import TrackRow from "./TrackRow";
import CreateNewPlaylistButton from "../../components/CreateNewPlaylistButton"
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox, List, ListItem, ListItemText, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

function TrackList({ tracks, playLists, handleSelectPlaylist, selectedPlaylists, handlePlay }) {


  const [PlayListName, setPlayListName] = useState("")
  const [showAddToPlayListPopup, setShowAddToPlayListPopup] = useState(false);
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(
    false
  );


  const handleNewPlayButtonClick = (track) => {
    setShowCreatePlaylistPopup(true);
  };

  const handleCloseNewPlaylistPopup = () => {
    setShowCreatePlaylistPopup(false);
  };


  const handleCreatePlayList = () => {
    // setPlatLists([...playLists, {title: PlayListName}])
    setShowCreatePlaylistPopup(false);
    setPlayListName("")

  }

  const handleAddToPlayButtonClick = (track) => {
    setShowAddToPlayListPopup(true);
  };

  const handleCloseAddToPlaylistPopup = () => {
    setShowAddToPlayListPopup(false);
  };

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow
          key={ix}
          track={track}
          handlePlay={handlePlay}
          handleAddButtonClick={handleAddToPlayButtonClick}
        />
      ))}
      <ThemeProvider theme={darkTheme}> {/* Apply the dark theme */}

        <Dialog
          open={showAddToPlayListPopup}
          onClose={handleCloseAddToPlaylistPopup}
          aria-labelledby="add-to-playlist-dialog-title"
          PaperComponent={Paper}
          PaperProps={{
            sx: { backgroundColor: "#333", p: 2 },
          }}
        >
          <DialogTitle id="add-to-playlist-dialog-title">Add Track to Playlist</DialogTitle>
          <DialogContent>
            <div>
              {playLists.map((playlist, index) => (
                <ListItem key={index}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedPlaylists.includes(playlist.title)} onChange={() => handleSelectPlaylist(playlist.title)} />}
                    label={playlist.title}
                  />
                </ListItem>
              ))}
              {!showCreatePlaylistPopup ? <ListItem>
                <CreateNewPlaylistButton onClick={handleNewPlayButtonClick} />
              </ListItem> : <TextField
                label="Enter playlist name"
                variant="outlined"
                fullWidth
                value={PlayListName}
                onChange={(e) => setPlayListName(e.target.value)}
              /> }

             

            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddToPlaylistPopup} color="primary">
              Cancel
            </Button>
           {showCreatePlaylistPopup && <Button onClick={handleCreatePlayList} color="primary">
              Create
            </Button>}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
   
    </>
  );
}

export default TrackList;

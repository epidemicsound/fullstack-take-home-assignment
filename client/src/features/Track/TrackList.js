import React, { useState } from "react";
import TrackRow from "./TrackRow";
import CreateNewPlaylistButton from "../../components/CreateNewPlaylistButton";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../../theme";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  ListItem,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TrackRow.module.css";
import { endpoints } from "../../services/apiConfig";

function TrackList({ tracks, playLists, showToast, handlePlay }) {
  const [playListName, setPlayListName] = useState("");
  const [showAddToPlayListPopup, setShowAddToPlayListPopup] = useState(false);
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const removeTrackFromPlayList = (playlistId, trackId) => {
    fetch(endpoints.removeTrack(playlistId, trackId), {
      method: "DELETE",
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(() => showToast("Removed Track from playlist"))
      .catch(() => showToast("Something went wrong!", "error"));
  };

  const addTrackToPlayList = (playlistId, trackId) => {
    fetch(endpoints.addTrack(playlistId, trackId), {
      method: "POST",
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(() => showToast("Track added to playlist"))
      .catch(() => showToast("Something went wrong!", "error"));
  };

  const handleSelectPlaylist = (playlist) => {
    if (playlist.tracks.includes(selectedTrack?.id)) {
      playlist.tracks = playlist.tracks.filter((id) => id !== selectedTrack.id);
      removeTrackFromPlayList(playlist.id, selectedTrack.id);
    } else {
      playlist.tracks.push(selectedTrack.id);
      addTrackToPlayList(playlist.id, selectedTrack.id);
    }
  };

  const handleNewPlayButtonClick = (track) => {
    setShowCreatePlaylistPopup(true);
  };

  const handleCreatePlayList = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        name: playListName,
        tracks: selectedTrack.id,
      }),
      redirect: "follow",
    };

    fetch(endpoints.playlists("name"), requestOptions)
      .then((response) => response.json())
      .then((result) => {
        playLists.push(result);
        setShowCreatePlaylistPopup(false);
        setPlayListName("");
        showToast("Playlist created successfully");
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddToPlaylist = (track) => {
    setShowAddToPlayListPopup(true);
    setSelectedTrack(track);
  };

  return (
    <>
      {tracks.length === 0 ? (
        <p>No Data</p>
      ) : (
        tracks.map((track, ix) => (
          <TrackRow
            key={ix}
            showAdd={true}
            track={track}
            handlePlay={handlePlay}
            handleAddButtonClick={handleAddToPlaylist}
          />
        ))
      )}
      <ThemeProvider theme={darkTheme}>
        <Dialog
          open={showAddToPlayListPopup}
          onClose={() => setShowAddToPlayListPopup(false)}
          aria-labelledby="add-to-playlist-dialog-title"
          PaperComponent={Paper}
          PaperProps={{
            sx: { backgroundColor: "#333", p: 2 },
          }}
        >
          <DialogTitle id="add-to-playlist-dialog-title">
            Add Track to Playlist
            <IconButton
              aria-label="close"
              sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
              onClick={() => setShowAddToPlayListPopup(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className={styles.ListView200}>
              {playLists.map((playlist, index) => (
                <ListItem key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={playlist.tracks.includes(selectedTrack?.id)}
                        onChange={() => handleSelectPlaylist(playlist)}
                      />
                    }
                    label={playlist.name}
                  />
                </ListItem>
              ))}
            </div>
            {!showCreatePlaylistPopup ? (
              <ListItem>
                <CreateNewPlaylistButton onClick={handleNewPlayButtonClick} />
              </ListItem>
            ) : (
              <TextField
                label="Enter playlist name"
                variant="outlined"
                fullWidth
                value={playListName}
                onChange={(e) => setPlayListName(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            {showCreatePlaylistPopup && (
              <Button onClick={handleCreatePlayList} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}

export default TrackList;

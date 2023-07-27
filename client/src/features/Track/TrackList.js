import React, { useState, } from "react";
import TrackRow from "./TrackRow";
import CreateNewPlaylistButton from "../../components/CreateNewPlaylistButton"
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../../theme";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox, ListItem, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./TrackRow.module.css";


function TrackList({ tracks, playLists, showToast, handlePlay }) {


  const [playListName, setPlayListName] = useState("");

  const [showAddToPlayListPopup, setShowAddToPlayListPopup] = useState(false);
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(
    false
  );
  const [selectedTrack, setSelectedTrack] = useState(null)


  const removeTrackFromPlayList = (playlistId, trackId) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(`http://127.0.0.1:8000/playlists/${playlistId}/remove_track/${trackId}/`, requestOptions)
      .then(response => response.text())
      .then(result => showToast("Removed Track from playlist"))
      .catch(error => showToast("Something went wrong!", "error"));
  }


  const addTrackToPlayList = (playlistId, trackId) => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(`http://127.0.0.1:8000/playlists/${playlistId}/add_track/${trackId}/`, requestOptions)
      .then(response => response.text())
      .then(result => showToast("Track added to playlist"))
      .catch(error => showToast("Something went wrong!", "error"));
  }

  const handleSelectPlaylist = (playlist, setSelectedTrack) => {

    if (playlist.tracks.includes(setSelectedTrack.id)) {

      playlist.tracks = playlist.tracks.filter((id) => id !== setSelectedTrack.id)
      removeTrackFromPlayList(playlist.id, setSelectedTrack.id)
    } else {
      playlist.tracks.push(setSelectedTrack.id)
      addTrackToPlayList(playlist.id, setSelectedTrack.id)
    }
  };

  const handleNewPlayButtonClick = (track) => {
    setShowCreatePlaylistPopup(true);

  };




  const handleCreatePlayList = () => {
    // setPlatLists([...playLists, {title: PlayListName}])

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", playListName);
    urlencoded.append("tracks", selectedTrack.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/playlists/", requestOptions)
      .then(response => response.json())
      .then(result => {
        playLists.push(result);
        setShowCreatePlaylistPopup(false);
        setPlayListName("")
        showToast("Playlist created successfully")
      })
      .catch(error => console.log('error', error));

    

  }

  const handleAddToPlayButtonClick = (track) => {
    console.log()
    setShowAddToPlayListPopup(true);
    setSelectedTrack(track)

  };

  const handleCloseAddToPlaylistPopup = () => {
    setShowAddToPlayListPopup(false);
  };


  return (
    <>
      {tracks.length === 0 ? <p>No Data</p> : tracks.map((track, ix) => (
        <TrackRow
          key={ix}
          showAdd={true}
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
          <DialogTitle id="add-to-playlist-dialog-title">Add Track to Playlist
            <IconButton aria-label="close" sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }} onClick={handleCloseAddToPlaylistPopup}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className={styles.ListView200}>
              {playLists.map((playlist, index) => (
                <ListItem key={index}>
                  <FormControlLabel
                    control={<Checkbox checked={playlist.tracks.includes(selectedTrack?.id)} onChange={() => handleSelectPlaylist(playlist, selectedTrack)} />}
                    label={playlist.name}
                  />
                </ListItem>
              ))}
              



            </div>
            {!showCreatePlaylistPopup ? <ListItem>
                <CreateNewPlaylistButton onClick={handleNewPlayButtonClick} />
              </ListItem> : <TextField
                label="Enter playlist name"
                variant="outlined"
                fullWidth
                value={playListName}
                onChange={(e) => setPlayListName(e.target.value)}
              />}
          </DialogContent>
          <DialogActions>

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

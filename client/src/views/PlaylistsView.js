import React, {useEffect, useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Chip, IconButton, Stack, TextField} from "@mui/material";
import styles from "./PlaylistsView.module.css";
import AddIcon from '@mui/icons-material/Add';
import TrackList from "../components/TrackList";
import AddTracksDialog from "../components/AddTracksDialog";

function PlaylistsView({idToTrack}) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [open, setOpen] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
  }, []);

  const onDelete = function (event, playlistId) {
    fetch("http://0.0.0.0:8000/playlists/" + playlistId + "/", {
      method: "DELETE",
      mode: "cors",
    }).then(() => setPlaylists(prevPlaylists => prevPlaylists.filter(p => p.id !== playlistId)))
    event.stopPropagation();
  }

  const onCreate = function() {
    fetch("http://0.0.0.0:8000/playlists/", {
      method: "POST",
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: playlistName})
    }).then((res) => res.json())
      .then((playlist) => setPlaylists(prevPlaylists => prevPlaylists.concat(playlist)))
      .then(() => setPlaylistName(""))
  }

  const handleClickOpen = (event, playlist) => {
    setOpen(true);
    setPlaylist(playlist);
    event.stopPropagation();
  };

  const handleClose = () => {
    setOpen(false);
    setPlaylist(null);
  }

  const updatePlaylist = (playlistData) => {
    const playlistId = playlistData.id
    setPlaylists(oldPlaylists =>
      oldPlaylists.map((p) => {
        if (p.id === playlistId) {
          return playlistData
        } else {
          return p
        }
      })
    )
  }

  const handleAddTracks = (selectedTracks) => {
    const newIds = selectedTracks.map((track) => track.id);
    const updated = {...playlist};
    updated.tracks = playlist.tracks.concat(newIds)
    fetch("http://0.0.0.0:8000/playlists/" + updated.id + "/", {
      method: "PUT",
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updated)
    }).then((res) => res.json())
      .then((playlist) => updatePlaylist(playlist))
  }

  const handleRemoveTrack = (playlist, trackId) => {
    const updated = {...playlist};
    updated.tracks = playlist.tracks.filter((t) => t !== trackId)
    fetch("http://0.0.0.0:8000/playlists/" + updated.id + "/", {
      method: "PUT",
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updated)
    }).then((res) => res.json())
      .then((playlist) => updatePlaylist(playlist))
  }

  const remainingTracks = () => {
    const included = new Set(playlist == null ? [] : playlist.tracks)
    return Object.values(idToTrack).filter((track) => !included.has(track.id))
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <TextField
          label="Playlist Name"
          variant="outlined"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <Button variant="outlined" disabled={playlistName === ""} onClick={onCreate}>Create</Button>
      </Stack>
      <div>
        <AddTracksDialog
          handleAddTracks={handleAddTracks}
          handleClose={handleClose}
          open={open}
          options={remainingTracks()}
        />
        {playlists.map((playlist, ix) => (
          <Accordion key={ix}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={2} alignItems="center">
                <div>
                  {playlist.name}
                  &nbsp;
                  <Chip label={playlist.tracks.length} icon={<AudiotrackIcon/>} size="small" variant="outlined"/>
                </div>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon/>}
                  onClick={(e) => handleClickOpen(e, playlist)}
                >
                  Add tracks
                </Button>
                <IconButton aria-label="delete" onClick={(e) => onDelete(e, playlist.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </AccordionSummary>
            <AccordionDetails className={styles.trackList}>
              <TrackList idToTrack={idToTrack} playlist={playlist} handleRemoveTrack={handleRemoveTrack}/>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Stack>
  );
}

export default PlaylistsView;

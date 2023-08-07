import React, { useState } from "react";
import PlaylistRow from "./PlaylistRow";
import SortButton from "../../components/SortButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../services/apiConfig";

const PlaylistList = ({ playLists, showToast, fetchPlaylist }) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);

  const navigate = useNavigate();

  const handleRowClick = (playlist) => {
    navigate(`/playlists/${playlist.id}`);
  };

  const handleOpenEditDialog = (playlist) => {
    setShowEditDialog(true);
    setSelectedPlaylist(playlist);
    setPlaylistName(playlist.name);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
  };

  const handleSaveChanges = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name: playlistName }),
      redirect: "follow",
    };

    fetch(endpoints.playlistById(selectedPlaylist.id), requestOptions)
      .then((response) => response.text())
      .then((result) => {
        showToast("Playlist updated successfully");
        fetchPlaylist();
      })
      .catch((error) => console.log("error", error));

    setShowEditDialog(false);
  };

  const handleDeletePlaylist = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(endpoints.playlistById(selectedPlaylist.id), requestOptions)
      .then((response) => response.text())
      .then((result) => {
        showToast("Playlist deleted");
        fetchPlaylist();
      })
      .catch((error) => console.log("error", error));

    setShowConfirmationDialog(false);
  };

  const sortOptions = [
    { label: "Sort by Name", value: "name" },
    { label: "Sort by Date", value: "date" },
  ];


  const handleDeletePlaylistPopup = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setShowConfirmationDialog(true);
  };

  return (
    <>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <p>Created Playlists</p>
        <SortButton options={sortOptions} handleSort={fetchPlaylist} />
      </div>
      {playLists.length === 0 ? (
        <p>No Data</p>
      ) : (
        playLists.map((playlist, ix) => (
          <PlaylistRow
            key={ix}
            playList={playlist}
            handleRowClick={handleRowClick}
            handleDeletePlaylistPopup={handleDeletePlaylistPopup}
            handleOpenEditDialog={handleOpenEditDialog}
          />
        ))
      )}

      <Dialog
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
      >
        <DialogTitle>Are you sure you want to delete the playlist?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowConfirmationDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePlaylist} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Playlist</DialogTitle>
        <DialogContent>
          <TextField
            label="Playlist Name"
            variant="outlined"
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlaylistList;

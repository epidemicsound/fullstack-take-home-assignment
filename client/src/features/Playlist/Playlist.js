import React, { useState } from "react";
import PlaylistRow from "./PlaylistRow";
import SortButton from "../../components/SortButton";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function PlaylistList({ playLists, showToast, fetchPlaylist }) {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedPlayList, setSeletectedPlaylist] = useState(null);
    const [playlistName, setPlaylistName] = useState(null);

    const navigate = useNavigate();


  const handleRowClick = (playlist) => {
    navigate(`/playlists/${playlist.id}`);
  };

    const handleOpenEditDialog = (playlist) => {
        setShowEditDialog(true);
        setSeletectedPlaylist(playlist)
        setPlaylistName(playlist.name)

    };

    const handleCloseEditDialog = () => {
        setShowEditDialog(false);
    };

    const handleSaveChanges = () => {
        // Implement the logic to save the edited playlist name here
        // You can call an API or perform any other necessary actions
        // After successful save, close the edit dialog
        console.log(selectedPlayList)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", playlistName);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/playlists/" + selectedPlayList.id + "/", requestOptions)
            .then(response => response.text())
            .then(result => {
                showToast("Playlist updated successfully")
                fetchPlaylist()
            })
            .catch(error => console.log('error', error));
        setShowEditDialog(false);
    };

    const handleCloseConfirmationDialog = () => {
        setShowConfirmationDialog(false);
    };

    const handleDeletePlaylist = () => {

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/playlists/" + selectedPlayList.id + "/", requestOptions)
            .then(response => response.text())
            .then(result => {
                showToast("Playlist deleted")
                fetchPlaylist()

            })
            .catch(error => console.log('error', error));

        setShowConfirmationDialog(false);
    };


    const sortOptions = [
        { label: "Sort by Name", value: "name" },
        { label: "Sort by Date", value: "date" },
    ];

    const handleSort = (sortBy) => {
        console.log("Sorting by:", sortBy);
        fetchPlaylist(sortBy)
    };

    const handleDeletePlaylistPopup = (playlistId) => {
        setSeletectedPlaylist(playlistId)
        setShowConfirmationDialog(true);

    }


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
                <SortButton options={sortOptions} handleSort={handleSort} />
            </div>
            {playLists.length === 0 ? <p>No Data</p> : playLists.map((playList, ix) => (
                <PlaylistRow key={ix} playList={playList} handleRowClick={handleRowClick} handleDeletePlaylistPopup={handleDeletePlaylistPopup} handleOpenEditDialog={handleOpenEditDialog}  />
            ))}


            <Dialog
                open={showConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
            >
                <DialogTitle>Are you sure you want to delete the playlist?</DialogTitle>
                <DialogContent>
                    {/* Add any additional content or information here if needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmationDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeletePlaylist} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showEditDialog}
                onClose={handleCloseEditDialog}
            >
                <DialogTitle>Edit Playlist</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Playlist Name"
                        variant="outlined"
                        fullWidth
                        value={playlistName}
                        onChange={(e) => {
                            setPlaylistName(e.target.value)
                        }}
                    />
                    {/* Add any additional content or information here if needed */}
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
}

export default PlaylistList;

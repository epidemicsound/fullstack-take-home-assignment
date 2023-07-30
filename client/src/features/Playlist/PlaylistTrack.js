import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackRow from "../Track/TrackRow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { endpoints } from "../../services/apiConfig";


function PlaylistDetail({ handlePlay, fetchPlaylist, showToast }) {
  const [playlist, setPlaylist] = useState(null);
  const { id } = useParams();



  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  const handleDeleteTrackFromPlaylist = ( trackId) => {
    fetch(endpoints.removeTrack(id,trackId), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the onDelete function provided as a prop to handle any necessary updates
        
        fetchPlaylist()
        showToast("Track removed from playlist")
        fetchPlalistDetails()
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error deleting playlist:", error);
      });
  }

  const fetchPlalistDetails = () => {
    fetch(endpoints.playlistById(id))
    .then((response) => response.json())
    .then((data) => setPlaylist(data))
    .catch((error) => console.log("Error fetching playlist details:", error));

  }
  useEffect(() => {
    // Fetch playlist details using the API endpoint
    fetchPlalistDetails()
  }, [id]);
  
  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2> <IconButton onClick={handleGoBack} style={{ color: "#fff" }}>
        <ArrowBackIcon />
      </IconButton>

        {playlist.name}</h2>
      {playlist.tracks.map((track) => (
        <TrackRow  handlePlay={handlePlay} handleDeleteTrackFromPlaylist={handleDeleteTrackFromPlaylist} showAdd={false} key={track.id} track={track} />
      ))}
    </div>
  );
}

export default PlaylistDetail;

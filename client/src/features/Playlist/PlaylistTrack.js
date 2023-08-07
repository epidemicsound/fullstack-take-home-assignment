import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackRow from "../Track/TrackRow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { endpoints } from "../../services/apiConfig";

function PlaylistDetail({ handlePlay, fetchPlaylist, showToast }) {
  const [playlist, setPlaylist] = useState(null);
  const { id: playlistId } = useParams();

  const navigate = useNavigate();

  const fetchPlaylistDetails = () => {
    fetch(endpoints.playlistById(playlistId))
      .then((response) => response.json())
      .then((data) => setPlaylist(data))
      .catch((error) => console.log("Error fetching playlist details:", error));
  };

  useEffect(() => {
    fetchPlaylistDetails();
  }, [playlistId]);

  const deleteTrackFromPlaylist = (trackId) => {
    fetch(endpoints.removeTrack(playlistId, trackId), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchPlaylist();
        showToast("Track removed from playlist");
        fetchPlaylistDetails();
      })
      .catch((error) => {
        console.error("Error deleting track from playlist:", error);
      });
  };

  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
          style={{ color: "#fff" }}
        >
          <ArrowBackIcon />
        </IconButton>
        {playlist.name}
      </h2>
      {playlist.tracks.map((track) => (
        <TrackRow
          handlePlay={handlePlay}
          handleDeleteTrackFromPlaylist={deleteTrackFromPlaylist}
          showAdd={false}
          key={track.id}
          track={track}
        />
      ))}
    </div>
  );
}

export default PlaylistDetail;

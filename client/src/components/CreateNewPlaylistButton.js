import React from "react";
import Button from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function CreateNewPlaylistButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="text"
      color="primary"
      startIcon={<PlaylistAddIcon style={{ fontSize: 24 }} />}
      style={{ color: "#fff", backgroundColor: "transparent" }}
    >
      Create new Playlist
    </Button>
  );
}

export default CreateNewPlaylistButton;

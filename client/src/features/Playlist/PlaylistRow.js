import React, { useState } from "react";
import styles from "./Playlist.module.css";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem } from "@mui/material";

function PlaylistRow({
  playList,
  handleRowClick,
  handleDeletePlaylistPopup,
  handleOpenEditDialog,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.playlistRow}>
      <QueueMusicIcon style={{ fontSize: 24, fill: "#fff" }} />
      <div
        onClick={() => handleRowClick(playList)}
        className={styles.playlistInfo}
      >
        <div className={styles.playlistTitle}>{playList.name} </div>
        <small className={styles.playlistSubTitle}>
          Tracks: {playList.tracks.length}
        </small>
      </div>
      <div className={styles.deleteIconContainer}>
        <IconButton
          aria-controls="playlist-menu"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          aria-label="menu"
          style={{ color: "#fff" }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="playlist-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleOpenEditDialog(playList);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeletePlaylistPopup(playList);
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default PlaylistRow;

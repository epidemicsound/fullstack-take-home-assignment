import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function TrackList({playlist, idToTrack, handleRemoveTrack}) {
  return <List>
    {playlist.tracks.map((trackId, ix) => {
      let trackData = idToTrack[trackId]
      if (trackData != null) {
        return <ListItem
          key={ix}
          secondaryAction={<IconButton onClick={() => handleRemoveTrack(playlist, trackId)}><DeleteIcon/></IconButton>}
        >
          <ListItemText primary={trackData.title} secondary={trackData.main_artists.join(", ")} />
        </ListItem>;
      } else {
        return null;
      }
    })}
  </List>
}

export default TrackList;

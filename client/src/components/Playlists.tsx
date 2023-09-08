import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";
import CreatePlaylistDialog from "./CreatePlaylistDialog";
import Playlist, { PlaylistType } from "./Playlist";
import styles from "./TrackRow.module.css";

interface Props {
  playlists: PlaylistType[];
}

export const PlayLists: FC<Props> = ({ playlists }) => {
  const [showCreatePlaylistDialog, setShowCreatePlaylistDialog] =
    useState<boolean>(false);
  const [playlistsData, setPlaylistsData] = useState(playlists);
  const [selectedList, setSelectedList] = useState(null);

  const deletePlaylist = (id) => {
    const updatedPlaylist = playlistsData.filter((item) => item.id !== id);
    setPlaylistsData(updatedPlaylist);
  };

  return (
    <>
      <Box display='flex' justifyContent='flex-end' marginBottom={4}>
        <Button
          variant='outlined'
          onClick={() => setShowCreatePlaylistDialog(true)}
          startIcon={<AddIcon />}
        >
          New Playlist
        </Button>
      </Box>
      <Grid container direction='row' alignItems='center'>
        {playlistsData.map((item) => (
          <Grid
            item
            key={item.id}
            md={2}
            paddingLeft={1}
            paddingRight={1}
            marginBottom={2}
          >
            <Card onClick={() => setSelectedList(item)}>
              <CardMedia className={styles.playlistCardMedia}>
                <Box className={styles.cardMediaBox}>
                  {item.tracks.length > 0 ? (
                    <Grid container className={styles.mediaBox}>
                      {item.tracks.map((track, index) => {
                        return (
                          index < 4 && (
                            <Grid
                              key={index}
                              item
                              md={item.tracks.length === 1 ? 12 : 6}
                            >
                              <img width='100%' src={track.coverArt} alt='' />
                            </Grid>
                          )
                        );
                      })}
                    </Grid>
                  ) : (
                    <IconButton>
                      <QueueMusicIcon fontSize='large' />
                    </IconButton>
                  )}
                </Box>
              </CardMedia>
              <CardHeader
                action={
                  <IconButton onClick={() => deletePlaylist(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                title={item.name}
                subheader={`${item.tracks.length} ${
                  item.tracks.length === 1 ? "Track" : "Tracks"
                }`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreatePlaylistDialog
        open={showCreatePlaylistDialog}
        onClose={() => {
          setShowCreatePlaylistDialog(false);
        }}
      />
      {selectedList && <Playlist list={selectedList} />}
    </>
  );
};
export default PlayLists;

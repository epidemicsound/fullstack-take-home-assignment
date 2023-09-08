import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LinkIcon from "@mui/icons-material/Link";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { intervalToDuration } from "date-fns";
import { FC, useState } from "react";
import { Track } from "~/App";
import AddToPlaylistDialog from "./AddToPlaylistDialog";
import { PlaylistType } from "./Playlist";
import styles from "./TrackRow.module.css";

interface Props {
  track: Track;
  playlist?: PlaylistType;
  mutateTracks?: (tracklist: Track[]) => void;
  handlePlay: (track: Track) => void;
}

export const TrackRow: FC<Props> = ({
  track,
  playlist,
  mutateTracks,
  handlePlay,
}) => {
  const [showAddToPlaylistDialog, setShowAddToPlaylistDialog] =
    useState<boolean>(false);
  const [trackIsFavorite, settrackIsFavorite] = useState<boolean>(false);

  const getFormattedDuration = (seconds: number) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return `${duration.minutes}:${duration.seconds}`;
  };

  const removeFromPlaylist = () => {
    const newList = playlist.tracks.filter((t) => t.id !== track.id);
    mutateTracks(newList);
  };

  return (
    <>
      <ListItem disableGutters>
        <Grid
          container
          direction='row'
          alignItems='center'
          className={styles.trackHover}
        >
          <Grid item md={3} paddingLeft={1} paddingRight={1}>
            <ListItemButton disableGutters onClick={() => handlePlay(track)}>
              <ListItemAvatar className={styles.playbutton}>
                <IconButton>
                  <PlayCircleFilledWhiteIcon fontSize='large' />
                </IconButton>
                <Avatar
                  className={styles.coverArt}
                  variant='square'
                  src={track.coverArt}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={track.title}
                secondary={
                  <Typography variant='subtitle2'>{track.artists}</Typography>
                }
              />
            </ListItemButton>
          </Grid>
          <Grid item md={3} paddingLeft={1} paddingRight={1}>
            <ListItemText
              primary={
                <Typography variant='subtitle1'>
                  {getFormattedDuration(track.duration)}
                </Typography>
              }
              secondary={
                <Typography variant='subtitle2'>
                  {`${track.bpm} BPM`}
                </Typography>
              }
            />
          </Grid>
          <Grid item paddingLeft={3} paddingRight={1} md={2}>
            <ListItemText
              primary={
                <Typography variant='subtitle1'>{track.genres}</Typography>
              }
              secondary={
                <Typography variant='subtitle2'>{track.moods}</Typography>
              }
            />
          </Grid>
          <Grid
            item
            md={3}
            justifyContent='flex-end'
            display='flex'
            paddingLeft={1}
            paddingRight={1}
          >
            {playlist ? (
              <Stack direction='row' gap={1}>
                <Tooltip title='Mark as favorite'>
                  <IconButton
                    onClick={() => {
                      settrackIsFavorite(!trackIsFavorite);
                    }}
                  >
                    {trackIsFavorite ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title='Remove from playlist'>
                  <IconButton onClick={removeFromPlaylist}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Stack direction='row' gap={1}>
                <Tooltip title='Copy link - Coming soon'>
                  <IconButton>
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Download - Coming soon'>
                  <IconButton>
                    <ArrowDownwardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Add to playlist'>
                  <IconButton onClick={() => setShowAddToPlaylistDialog(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <AddToPlaylistDialog
        open={showAddToPlaylistDialog}
        track={track}
        onClose={() => setShowAddToPlaylistDialog(false)}
      />
    </>
  );
};

export default TrackRow;

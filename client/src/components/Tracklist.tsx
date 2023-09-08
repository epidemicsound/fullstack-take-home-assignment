import { Box } from "@mui/material";
import { FC, useState } from "react";
import { Track } from "~/App";
import { PlaylistType } from "./Playlist";
import TrackRow from "./TrackRow";
import AudioPlayer from "../components/AudioPlayer";

interface Props {
  tracks: Track[];
  playlist?: PlaylistType;
}

export const TrackList: FC<Props> = ({ tracks, playlist }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const handlePlay = (track: Track) => setCurrentTrack(track);

  return (
    <>
      <Box>
        {tracks.map((track, ix) => (
          <TrackRow
            key={ix}
            track={track}
            playlist={playlist}
            handlePlay={handlePlay}
          />
        ))}
      </Box>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
};

export default TrackList;

import { Box } from "@mui/material";
import { FC, useState } from "react";
import { Track } from "~/App";
import TrackRow from "./TrackRow";
import AudioPlayer from "./AudioPlayer";

export interface PlaylistType {
  id: string;
  name: string;
  tracks: Track[];
}

interface Props {
  list: PlaylistType;
}

export const PlayList: FC<Props> = ({ list }) => {
  const [tracks, setTracks] = useState<Track[]>(list.tracks);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const handlePlay = (track: Track) => setCurrentTrack(track);

  return (
    <>
      <Box>
        {tracks.map((track, ix) => {
          return (
            <TrackRow
              key={ix}
              track={track}
              playlist={list}
              mutateTracks={setTracks}
              handlePlay={handlePlay}
            />
          );
        })}
      </Box>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
};
export default PlayList;

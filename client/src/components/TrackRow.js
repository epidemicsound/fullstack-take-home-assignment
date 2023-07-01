import React from "react";
import styles from "./TrackRow.module.css";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "react-query";
import { removeTrack } from "../lib/playlist";

function TrackRow({ track, handlePlay, type, playlist }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const track_id = track.id;

  const deleteDataMutation = useMutation(
    () => removeTrack(playlist.id, track.id),
    {
      onMutate: (track_id) => {
        const previousPlaylistsData = queryClient.getQueryData("playlistsData");
        const newData = previousPlaylistsData?.playlists?.map((playlist) => ({
          ...playlist,
          tracks: playlist?.tracks?.filter((track) => track.id !== track_id),
        }));

        queryClient.setQueryData("playlistsData", newData);
        return newData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("playlistsData");
      },
      onError: (rollbackData) => {
        queryClient.setQueryData("playlistsData", rollbackData);
      },
    }
  );

  const deleteTrack = async (track_id) => {
    await deleteDataMutation.mutateAsync(track_id);
  };

  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="white" />
        </svg>
      </button>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          width: "100%",
        }}
      >
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track?.main_artists.join(", ")}
          </div>
        </div>
        {type === "tracks" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginLeft: "auto" }}
            onClick={() => setIsOpen(true)}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 3a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V4a1 1 0 0 1 1-1z" />
          </svg>
        )}
        {type === "playlist" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="white"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: "auto" }}
            onClick={() => deleteTrack(track_id)}
          >
            <path d="M3 6h18M8.5 10l1.5 9h3l1.5-9M6.5 10h11" />
            <path d="M16 6h2v2h-2zM12 6h2v2h-2zM8 6h2v2H8z" />
            <path d="M3 6h18M3 6l1.5-2h16L21 6M10 11v6M14 11v6" />
          </svg>
        )}
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} id={track.id} />}
    </div>
  );
}

export default TrackRow;

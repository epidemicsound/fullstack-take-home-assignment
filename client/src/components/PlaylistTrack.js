import React, { useState } from "react";
import styles from "./TrackRow.module.css";
import TrackRow from "./TrackRow";
import { removePlaylist } from "../lib/playlist";
import { useMutation, useQueryClient } from "react-query";

export default function PlaylistTrack({ playlist, handlePlay }) {
  const [tracks, setTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  const queryClient = useQueryClient();

  const deleteDataMutation = useMutation((id) => removePlaylist(id), {
    onMutate: (id) => {
      const previousPlaylistsData = queryClient.getQueryData("playlistsData");
      const newData = previousPlaylistsData?.playlists?.filter(
        (playlist) => playlist.id !== id
      );
      queryClient.setQueryData("playlistsData", newData);
      return newData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("playlistsData");
    },
    onError: (error, id, rollbackData) => {
      queryClient.setQueryData("playlistsData", rollbackData);
    },
  });

  const handleDelete = async (id) => {
    await deleteDataMutation.mutateAsync(id);
  };
  const handleTracks = (playlist) => {
    setShowTracks(!showTracks);
    setTracks(playlist.tracks);
  };

  return (
    <>
      <div className={styles.trackRow}>
        <button
          className={styles.playlist}
          onClick={() => handleTracks(playlist)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M21.5 5.5H2.5v15h19v-15zm-1 14h-17v-13h17v13zm-4-8h-13v2h13v-2zm0-4h-13v2h13v-2zm0 8h-13v2h13v-2z" />
          </svg>
        </button>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{playlist?.name}</div>
        </div>
        <button
          onClick={() => handleDelete(playlist.id)}
          className={styles.removeButton}
        >
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
          >
            <path d="M3 6h18M8.5 10l1.5 9h3l1.5-9M6.5 10h11" />
            <path d="M16 6h2v2h-2zM12 6h2v2h-2zM8 6h2v2H8z" />
            <path d="M3 6h18M3 6l1.5-2h16L21 6M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
      {showTracks &&
        tracks?.map((track, ix) => (
          <TrackRow
            key={ix}
            track={track}
            handlePlay={handlePlay}
            type="playlist"
            playlist={playlist}
          />
        ))}
    </>
  );
}

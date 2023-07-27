import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlaylistTracks() {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Fetch tracks for the specified playlist using the playlistId
    // You can implement your API call here
    // For demonstration purposes, we'll use a dummy array of tracks
    const dummyTracks = [
      { id: 1, title: "Track 1" },
      { id: 2, title: "Track 2" },
      { id: 3, title: "Track 3" },
      // Add more tracks as needed
    ];
    setTracks(dummyTracks);
  }, [playlistId]);

  return (
    <div>
      <h1>Tracks for Playlist {playlistId}</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistTracks;

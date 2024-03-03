import { useEffect, useState } from "react";

// Read backend host from environment variable,
// but default to localhost
const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

function usePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const PLAYLISTS_ENDPOINT = `${BACKEND_HOST}/playlists/`;

    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const playlistsResponse = await fetch(PLAYLISTS_ENDPOINT, {
          mode: "cors",
        });

        if (!playlistsResponse.ok) {
          throw new Error(
            `Failed to fetch data. Response code: ${playlistsResponse.status}`,
          );
        }

        const playlistsData = await playlistsResponse.json();
        setPlaylists(playlistsData);
        setError("");
      } catch (error) {
        setError(error);
        setPlaylists([]);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  return { playlists, error, loading };
}

function usePlaylistTracks(playlistId) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const PLAYLIST_TRACKS_ENDPOINT = `${BACKEND_HOST}/playlists/${playlistId}/`;

    const fetchTracks = async () => {
      if (playlistId === undefined) {
        setLoading(false);
        setError("");
        setTracks([]);
        return;
      }
      setLoading(true);

      try {
        const tracksResponse = await fetch(PLAYLIST_TRACKS_ENDPOINT, {
          mode: "cors",
        });

        if (!tracksResponse.ok) {
          throw new Error(
            `Failed to fetch data. Response code: ${tracksResponse.status}`,
          );
        }

        const playlistTracksData = await tracksResponse.json();
        setTracks(playlistTracksData.tracks);
        setError("");
      } catch (error) {
        setError(error);
        setTracks([]);
      }
      setLoading(false);
    };

    fetchTracks();
  }, [playlistId]);

  return { tracks, error, loading };
}

export { usePlaylists, usePlaylistTracks };

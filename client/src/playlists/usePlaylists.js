import { useEffect, useState } from "react";

// Read backend host from environment variable,
// but default to localhost
const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

// Stub values for testing purposes
const STUB_PLAYLISTS = [
  { id: "1", title: "First playlist", tracks: [] },
  { id: "2", title: "As melhores", tracks: [] },
  { id: "3", title: "Festa 120 BPM", tracks: [] },
];

function usePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStubPlaylists = () => {
      setPlaylists(STUB_PLAYLISTS);
    };

    const fetchPlaylists = async () => {
      setLoading(true);
      const playlistsEndpoint = `${BACKEND_HOST}/playlists`;

      try {
        const playlistsResponse = await fetch(playlistsEndpoint, {
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

    fetchStubPlaylists();
  }, []);

  return { playlists, error, loading };
}

function usePlaylistTracks(playlistId) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStubTracks = () => {
      setTracks([]);
    };

    const fetchTracks = async () => {
      if (playlistId === undefined) {
        setLoading(false);
        setError("");
        setTracks([]);
        return;
      }
      setLoading(true);
      const playlistTracksEndpoint = `${BACKEND_HOST}/playlists/${playlistId}`;

      try {
        const tracksResponse = await fetch(playlistTracksEndpoint, {
          mode: "cors",
        });

        if (!tracksResponse.ok) {
          throw new Error(
            `Failed to fetch data. Response code: ${tracksResponse.status}`,
          );
        }

        const playlistTracksData = await tracksResponse.json();
        setTracks(playlistTracksData);
        setError("");
      } catch (error) {
        setError(error);
        setTracks([]);
      }
      setLoading(false);
    };

    fetchStubTracks();
  }, [playlistId]);

  return { tracks, error, loading };
}

export { usePlaylists, usePlaylistTracks };

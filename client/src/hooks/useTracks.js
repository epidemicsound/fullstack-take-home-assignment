import { useState, useEffect } from "react";

// Read backend host from environment variable,
// but default to localhost
const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const tracksEndpoint = `${BACKEND_HOST}/tracks`;

      try {
        const tracksResponse = await fetch(tracksEndpoint, { mode: "cors" });

        if (!tracksResponse.ok) {
          throw new Error(
            `Failed to fetch data. Response code: ${tracksResponse.status}`,
          );
        }

        const tracksData = await tracksResponse.json();
        setTracks(tracksData);
        setError("");
      } catch (error) {
        setError(error);
        setTracks([]);
      }
      setLoading(false);
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
}
export default useTracks;

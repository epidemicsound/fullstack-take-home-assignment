import axios from "axios";

const baseUrl = "http://172.26.192.1:8000/";

export const fetchTracks = async () => {
  const response = await axios.get(`${baseUrl}tracks/`);
  return response.data;
};

export const fetchPlaylist = async () => {
  const response = await axios.get(`${baseUrl}playlists`);
  return response.data;
};

export const removePlaylist = async (id) => {
  const response = await axios.delete(`${baseUrl}playlists/${id}`);
  return response.data;
};

export const createPlaylist = async (name) => {
  const response = await axios.post(`${baseUrl}playlists/`, { name });
  return response.data;
};

export const addTrack = async (id, track_id) => {
  const response = await axios.post(`${baseUrl}playlists/${id}/add_track/`, {
    track_id,
  });
  return response.data;
};

export const removeTrack = async (playlistId, trackId) => {
  const response = await axios.post(
    `${baseUrl}playlists/${playlistId}/remove_track/`,
    {
      track_id: trackId,
    }
  );
  return response.data;
};

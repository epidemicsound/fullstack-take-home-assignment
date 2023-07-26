import { deleteOne, getAll } from "./base";

export const getPlaylists = async () => {
  const resp = await getAll(`playlists/`);
  return resp.result;
};

export const deletePlaylist = async (id) => {
  const resp = await deleteOne(`playlists/${id}/`, { mode: "cors" });
  return resp.data;
};

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
  const resp = await deleteOne(
    `playlists/${playlistId}/remove-track/${trackId}/`,
    { mode: "cors" }
  );
  return resp.data;
};

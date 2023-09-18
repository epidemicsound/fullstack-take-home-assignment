const ENDPOINT = `${process.env.REACT_APP_API_HOST}/playlists/`;

function usePlaylists() {
  const createPlaylist = (data) =>
    fetch(ENDPOINT, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

  const getPlaylistById = (id) =>
    fetch(`${ENDPOINT}${id}/`, {
      mode: "cors",
    }).then((res) => res.json());

  const getAll = () =>
    fetch(ENDPOINT, {
      mode: "cors",
    }).then((res) => res.json());

  const deletePlaylist = (id) =>
    fetch(`${ENDPOINT}${id}/`, {
      mode: "cors",
      method: "DELETE",
    });

  const addTrack = ({ playlistId, data }) =>
    fetch(`${ENDPOINT}${playlistId}/tracks/`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  const deleteTrack = ({ trackId, playlistId }) =>
    fetch(`${ENDPOINT}${playlistId}/tracks/${trackId}/`, {
      mode: "cors",
      method: "DELETE",
    });

  return {
    createPlaylist,
    deleteTrack,
    getPlaylistById,
    addTrack,
    getAll,
    deletePlaylist,
  };
}

export default usePlaylists;

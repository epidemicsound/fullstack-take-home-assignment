import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

const ACTION_TYPES = {
  SET_PLAYLISTS: 'PLAYER/SET_PLAYLISTS',
  ADD_TRACK_TO_PLAYLIST: 'PLAYER/ADD_TRACK_TO_PLAYLIST',
  REMOVE_TRACK_FROM_PLAYLIST: 'PLAYER/REMOVE_TRACK_FROM_PLAYLIST',
  CREATE_PLAYLIST: 'PLAYER/CREATE_PLAYLIST',
  DELETE_PLAYLIST: 'PLAYER/DELETE_PLAYLIST',
  SET_CURRENT_TRACK: 'PLAYER/SET_CURRENT_TRACK'
};

// TODO: Use a more robust HTTP API like axios
// TODO: Store the API URL in a config file

export const setPlaylists = createAsyncThunk(
  ACTION_TYPES.SET_PLAYLISTS,
  async () => {
    const response = await fetch('http://0.0.0.0:8000/playlists/', {
      mode: 'cors'
    }).then(res => res.json());

    return response;
  }
);

export const addTrackToPlaylist = createAsyncThunk(
  ACTION_TYPES.ADD_TRACK_TO_PLAYLIST,
  async payload => {
    const { playlistId, trackId } = payload;
    const response = await fetch(
      `http://0.0.0.0:8000/playlists/${playlistId}/tracks/${trackId}/`,
      {
        method: 'POST',
        mode: 'cors'
      }
    ).then(res => res.json());

    return response;
  }
);

export const removeTrackFromPlaylist = createAsyncThunk(
  ACTION_TYPES.REMOVE_TRACK_FROM_PLAYLIST,
  async payload => {
    const { playlistId, trackId } = payload;
    const response = await fetch(
      `http://0.0.0.0:8000/playlists/${playlistId}/tracks/${trackId}/`,
      {
        method: 'DELETE',
        mode: 'cors'
      }
    ).then(res => res.json());

    return response;
  }
);

export const createPlaylist = createAsyncThunk(
  ACTION_TYPES.CREATE_PLAYLIST,
  async payload => {
    const { name } = payload;
    const response = await fetch('http://0.0.0.0:8000/playlists/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }).then(res => res.json());

    return response;
  }
);

export const deletePlaylist = createAsyncThunk(
  ACTION_TYPES.DELETE_PLAYLIST,
  async payload => {
    const { playlistId: id } = payload;

    await fetch('http://0.0.0.0:8000/playlists/', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    return { id };
  }
);

export const setCurrentTrack = createAction(
  ACTION_TYPES.SET_CURRENT_TRACK,
  track => ({
    payload: track
  })
);

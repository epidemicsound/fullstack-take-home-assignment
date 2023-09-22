import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

const ACTION_TYPES = {
  SET_PLAYLISTS: 'PLAYER/SET_PLAYLISTS',
  ADD_TRACK_TO_PLAYLIST: 'PLAYER/ADD_TRACK_TO_PLAYLIST',
  CREATE_PLAYLIST: 'PLAYER/CREATE_PLAYLIST',
  SET_CURRENT_TRACK: 'PLAYER/SET_CURRENT_TRACK'
};

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

export const setCurrentTrack = createAction(
  ACTION_TYPES.SET_CURRENT_TRACK,
  track => ({
    payload: track
  })
);

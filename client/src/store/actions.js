import { createAction } from "@reduxjs/toolkit";

const ACTION_TYPES = {
    SET_CURRENT_TRACK: "PLAYER/SET_CURRENT_TRACK",
}

export const setCurrentTrack = createAction(ACTION_TYPES.SET_CURRENT_TRACK, (track) => ({
    payload: track,
}))
import { createSlice } from "@reduxjs/toolkit";
import { setCurrentTrack } from "./actions";

const initialState = {
    currentTrack: undefined
}

const playerSlice = createSlice({
    initialState,
    name: "player",
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setCurrentTrack, (state, action) => {
            state.currentTrack = action.payload;
        })
    }
})

export default playerSlice.reducer;
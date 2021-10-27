import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const connectionStatusSlice = createSlice({
    name: "connection-status",
    initialState,
    reducers: {
        setConnectionStatus: (state, action) => action.payload,
    }
});

export const { actions: { setConnectionStatus } } = connectionStatusSlice;
export const selectConnectionStatus = (state) => state.connectionStatus;
export default connectionStatusSlice.reducer;
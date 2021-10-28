import { createSlice } from "@reduxjs/toolkit";



const initialState = {autostart:true,restart:true};

const connectionStatusSlice = createSlice({
    name: "connection-status",
    initialState,
    reducers: {
        setConnectionStatus: (state, action) => ({...state,...action.payload}),
    }
});

export const { actions: { setConnectionStatus } } = connectionStatusSlice;
export const selectConnectionStatus = (state) => state.connectionStatus;
export default connectionStatusSlice.reducer;
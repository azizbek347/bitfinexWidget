import {
    createSlice
} from "@reduxjs/toolkit";
import { deepClone } from '../../utils/deepClone';

const initialState = {
    ticker: []
};

const tickerSlice = createSlice({
    name: "ticker",
    initialState,
    reducers: {
        setTicker: (state, action) => deepClone(action.payload)
    }
});

export const { actions: { setTicker } } = tickerSlice;
export const selectTicker = (state) => state.ticker;
export default tickerSlice.reducer;
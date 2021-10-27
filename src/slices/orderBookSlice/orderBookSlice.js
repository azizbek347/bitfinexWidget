import {
    createSlice
} from "@reduxjs/toolkit";
import { deepClone } from '../../utils/deepClone';

const initialState = {
    book: {}
};

const orderBookSlice = createSlice({
    name: "orderBook",
    initialState,
    reducers: {
        setBooks: (state, action) => deepClone(action.payload),
    }
});

export const { actions: { setBooks } } = orderBookSlice;
export const selectOrderBook = (state) => state.orderBook;
export default orderBookSlice.reducer;
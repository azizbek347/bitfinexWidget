import {
    configureStore
} from '@reduxjs/toolkit';
import {
    orderBookReducer
} from "../slices/orderBookSlice";
import {
    tickerReducer
} from "../slices/tickerSlice";
import { connectionStatusReducer } from "../slices/connectionsStatusSlice";

export const store = configureStore({
    reducer: {
        orderBook: orderBookReducer,
        ticker: tickerReducer,
        connectionStatus: connectionStatusReducer
    },
});

export default store;
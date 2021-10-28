import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connect, dataHandlerWrapper } from '../utils/connect';
import { throttle } from '../utils/throttle';
import { setTicker } from '../slices/tickerSlice';
import { setBooks } from '../slices/orderBookSlice';
import { selectConnectionStatus } from '../slices/connectionsStatusSlice';

export const useSocket = () => {
    const dispatch = useDispatch();
    const connectionStatus = useSelector(selectConnectionStatus);
    const saveBook = useCallback(
        throttle((b) => dispatch(setBooks(b)), 500),
        []
    );
    const saveTicker = useCallback(
        throttle((b) => dispatch(setTicker(b)), 500),
        []
    );
    const dataHandler = dataHandlerWrapper({ book: saveBook, ticker: saveTicker });
    const connectData = connect(dataHandler);
    useEffect(() => {
        const socket = connectData(connectionStatus);
        return () => {}
    }, [connectionStatus, connectData]);
};
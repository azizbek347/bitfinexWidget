import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setConnectionStatus,
  selectConnectionStatus,
} from '../../slices/connectionsStatusSlice';
import styles from './style.module.css';

const Controls = () => {
  const status = useSelector(selectConnectionStatus);
  const { autostart } = status;
  const dispatch = useDispatch();
  const clickHanlder = () => {
    if (autostart) dispatch(setConnectionStatus({ autostart: false }));
    else dispatch(setConnectionStatus({ autostart: true }));
  };
  return (
    <div className={`${styles.container}`}>
      <button className={`${styles.btn}`} onClick={clickHanlder}>
        {!autostart ? 'Connect' : 'Disconnect'}
      </button>
    </div>
  );
};

export default Controls;

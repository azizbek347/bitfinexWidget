import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setConnectionStatus,
  selectConnectionStatus,
} from '../../slices/connectionsStatusSlice';
import styles from './style.module.css';

const Controls = () => {
  const status = useSelector(selectConnectionStatus);
  const dispatch = useDispatch();
  const clickHanlder = () => {
    if (status) dispatch(setConnectionStatus(false));
    else dispatch(setConnectionStatus(true));
  };
  return (
    <div className={`${styles.container}`}>
      <button className={`${styles.btn}`} onClick={clickHanlder}>
        {!status ? 'Подключиться' : 'Отключиться'}
      </button>
    </div>
  );
};

export default Controls;

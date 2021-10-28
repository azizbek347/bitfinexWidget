import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaSearchPlus,
  FaSearchMinus,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

import { selectOrderBook } from '../../slices/orderBookSlice';
import { bookOptions } from '../../utils/options';
import { setConnectionStatus } from '../../slices/connectionsStatusSlice';
import { TablePart } from '../TablePart';
import styles from './style.module.css';

const OrderBook = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectOrderBook) || {};
  const { bids = {}, asks = {} } = books;
  const [precision, setPrecision] = useState(0);
  const [depthBar, setDepthBar] = useState(2.5);
  const increaseDepthBar = () => {
    if (depthBar - 4.9 > Number.EPSILON) return;
    setDepthBar((prev) => prev + 0.3);
  };
  const decreaseDepthBar = () => {
    if (depthBar - 0.1 < Number.EPSILON) return;
    setDepthBar((prev) => prev - 0.3);
  };
  const changePrecision = (value) => {
    bookOptions.prec = `P${value}`;
    dispatch(setConnectionStatus({restart:false}));
    setPrecision(() => value);
    setTimeout(() => {
      dispatch(setConnectionStatus({restart:true}));
    }, 0);
  };

  const decreasePrecision = () => {
    if (precision === 4) return;
    changePrecision(precision + 1);
  };
  const increasePrecision = () => {
    if (precision === 0) return;
    changePrecision(precision - 1);
  };

  const _asks = Object.keys(asks)
    .slice(0, 24)
    .map((i) => asks[i])
    .reduce((cur, item, index, array) => {
      const total = array
        .slice(0, index + 1)
        .reduce((t, i, _) => t + array[_].amount, 0);
      return [...cur, { ...item, total }];
    }, []);
  const _bids = Object.keys(bids)
    .sort((a, b) => (+a <= +b ? 1 : -1))
    .slice(0, 24)
    .map((i) => bids[i])
    .reduce((cur, item, index, array) => {
      const total = array
        .slice(0, index + 1)
        .reduce((t, i, _) => t + array[_].amount, 0);
      return [...cur, { ...item, total }];
    }, []);

  const maxAsksTotal = _asks.reduce((t, i) => (t < i.total ? i.total : t), 0);
  const maxBidsTotal = _bids.reduce((t, i) => (t < i.total ? i.total : t), 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Order book</p>
        <ul className={styles.buttons}>
          <button
            className={`${styles.buttonReset} ${
              precision === 4 ? styles.disabled : ''
            }`}
            onClick={decreasePrecision}
            title='Decrease precision'
          >
            <FaAngleLeft />
          </button>
          <li></li>
          <li>
            <button
              className={`${styles.buttonReset} ${
                !precision ? styles.disabled : ''
              }`}
              onClick={increasePrecision}
              title='Increase precision'
            >
              <FaAngleRight />
            </button>
          </li>
          <li>
            <button
              className={`${styles.buttonReset} ${
                depthBar - 4.9 > Number.EPSILON ? styles.disabled : ''
              }`}
              onClick={increaseDepthBar}
              title='Zoom out book depth vizualization'
            >
              <FaSearchMinus />
            </button>
          </li>
          <li>
            <button
              className={`${styles.buttonReset} ${
                depthBar - 0.1 < Number.EPSILON ? styles.disabled : ''
              }`}
              onClick={decreaseDepthBar}
              title='Zoom in book depth vizualization'
            >
              <FaSearchPlus />
            </button>
          </li>
        </ul>
      </header>
      <section className={`${styles.tables}`}>
        <TablePart
          data={_bids}
          maxDataTotal={maxBidsTotal}
          depthBar={depthBar}
          precision={precision}
        />
        <TablePart
          data={_asks}
          maxDataTotal={maxAsksTotal}
          depthBar={depthBar}
          precision={precision}
          side={'right'}
        />
      </section>
    </div>
  );
};

export default OrderBook;

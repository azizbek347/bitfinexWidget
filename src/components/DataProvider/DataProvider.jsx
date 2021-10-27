import { Controls } from '../Controls';
import { OrderBook } from '../OrderBook';
import { Ticker } from '../Ticker';
import { useSocket } from '../../hooks/useSocket';
import styles from './style.module.css';

const DataProvider = (props) => {
  useSocket();
  return (
    <main className={`${styles.main}`}>
      <Controls />
      <Ticker />
      <OrderBook />
    </main>
  );
};

export default DataProvider;

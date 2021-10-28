import { useSelector } from 'react-redux';

import { selectTicker } from '../../slices/tickerSlice';
import { tickerOptions } from '../../utils/options';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { numberWithCommas } from '../../utils/formatNumber';
import styles from './style.module.css';

const Ticker = () => {
  const ticker = useSelector(selectTicker);
  const symbol = tickerOptions._symbol;
  const crypto = symbol.slice(1, 4);
  const currency = symbol.slice(4);
  const [
    DAILY_CHANGE,
    DAILY_CHANGE_PERC,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW,
  ] = Array.isArray(ticker) ? ticker : Array.from({ length: 6 }, (_) => 0);
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.tickerIcon}`}>
        <img
          src={`https://creepy-corp.eu/git/jsupa/crypto-icons/get.php?token=${crypto}`}
          alt='crypto icon'
        />
      </div>
      <div className={`${styles.tickerInner}`}>
        <div className={`${styles.row}`}>
          <p className={`${styles.tickerPairName}`}>
            {crypto}/{currency}
          </p>
          <p className={`${styles.tickerPairValue}`}>
            {numberWithCommas(LAST_PRICE)}
          </p>
        </div>
        <div className={`${styles.row}`}>
          <p className={`${styles.tickerVolName}`}>
            VOL {numberWithCommas(VOLUME)}{' '}
            <span className={`${styles.underline}`}>{crypto}</span>
          </p>
          <p
            className={`${styles.tickerVolValue} ${
              DAILY_CHANGE_PERC < 0 ? `${styles.down}` : `${styles.up}`
            }`}
          >
            {numberWithCommas(DAILY_CHANGE)}
            {DAILY_CHANGE_PERC < 0 ? <FaCaretDown /> : <FaCaretUp />} (
            {numberWithCommas(DAILY_CHANGE_PERC)})
          </p>
        </div>
        <div className={`${styles.row}`}>
          <p className={`${styles.tickerLowHighName}`}>
            LOW {numberWithCommas(LOW)}
          </p>
          <p className={`${styles.tickerLowHighValue}`}>
            HIGH {numberWithCommas(HIGH)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ticker;

import { formatNumber } from '../../utils/formatNumber';
import styles from './style.module.css';

const TablePart = ({
  data,
  maxDataTotal,
  depthBar,
  precision,
  side = 'left',
}) => {
  return (
    <div
      className={`${styles.tablesPart} ${
        side === 'left' ? styles.tablesPartLeft : styles.tablesPartRight
      }`}
    >
      <div className={`${styles.tablesRow}`}>
        <div>Количество</div>
        <div>Сумма</div>
        <div>Всего</div>
        <div>Цена</div>
      </div>
      {data &&
        data.map((k, i) => {
          const { cnt, amount, price, total } = k;
          const percentage = (100 * total) / (maxDataTotal * depthBar);
          return (
            <div
              className={`${styles.tablesRow}`}
              key={`book-${cnt}${amount}${price}${total}`}
              style={{
                backgroundImage:
                  side === 'left'
                    ? `linear-gradient(to left, #314432 ${percentage}%, #172D3E 0%)`
                    : `linear-gradient(to right, #403340 ${percentage}%, #172D3E 0%)`,
              }}
            >
              <div>{cnt}</div>
              <div>{formatNumber({number:amount,cut:true})}</div>
              <div>{formatNumber({number:total,cut:true})}</div>
              <div>{formatNumber({number:price})}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TablePart;

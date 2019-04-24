import React from 'react';
import cn from 'classnames';

import { precise } from 'utils';

import styles from './OrderBook.scss';

export function OffersTable({
  dataArray,
  dataTotal,
  rowClassName,
  reverseTotal,
  maxTotal,
  tradedCurrency,
}) {
  let currentTotal = reverseTotal ? dataTotal : 0;

  return (
    <div className={styles.tableBody}>
      {dataArray.map(({ price, amount, total }, index) => {
        if (reverseTotal) {
          if (index > 0) {
            currentTotal -= total;
          }
        } else {
          currentTotal += total;
        }

        const barStyle = {
          width: `${(currentTotal / maxTotal) * 60}%`,
        };

        return (
          <div className={cn(styles.row, rowClassName)} key={index}>
            <div className={styles.cell}>{precise(price, tradedCurrency)}</div>
            <div className={styles.cell}>{precise(amount, tradedCurrency)}</div>
            <div className={styles.cell}>{currentTotal.toFixed(4)}</div>
            <div className={styles.bar} style={barStyle} />
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import cn from 'classnames';

import { detectNilEquality, formatPercentage, precise, observer } from 'utils';
import { useLocalization, useStore } from 'hooks';

import styles from './TPInfo.scss';
import { messages } from './messages';

function TPInfo() {
  const {
    currentTP: {
      usdValue,
      name,
      lastPrice,
      change24h,
      change24hPercentage,
      high24h,
      low24h,
      tradedCurrency,
    },
  } = useStore();
  const getLn = useLocalization(__filename, messages);

  const columnsArray = [
    {
      label: getLn(messages.lastPrice),
      data: precise(lastPrice, tradedCurrency),
      appendElement:
        tradedCurrency === 'usd' ? null : (
          <div className={styles.changePercentage}>{usdValue}</div>
        ),
    },
    {
      label: getLn(messages.change24h),
      data: precise(change24h, tradedCurrency),
      classname: detectNilEquality({
        num: change24hPercentage,
        onMore: styles.up,
        onLess: styles.down,
      }),
      appendElement: (
        <div className={styles.changePercentage}>
          {formatPercentage(change24hPercentage)}
        </div>
      ),
    },
    {
      label: getLn(messages.high24h),
      data: precise(high24h, tradedCurrency),
    },
    {
      label: getLn(messages.low24h),
      data: precise(low24h, tradedCurrency),
    },
  ];

  return (
    <div className={styles.infoWrapper}>
      <div className={styles.info}>
        <div className={styles.currencyName}>{name}</div>
        <div className={styles.dataColumns}>
          {columnsArray.map(({ label, data, classname, appendElement }, i) => (
            <div key={i} className={cn(styles.column, classname)}>
              <div className={styles.columnLabel}>{label}</div>
              <div className={styles.columnData}>
                <span>{data}</span>
                {appendElement}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.options} />
      </div>
    </div>
  );
}

export const TPInfoConnected = observer(TPInfo);

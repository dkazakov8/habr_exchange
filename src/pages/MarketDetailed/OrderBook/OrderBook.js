import React from 'react';
import cn from 'classnames';

import { detectNilEquality, precise, observer } from 'utils';
import { useLocalization, useStore } from 'hooks';
import { OffersTable } from './OffersTable';

import styles from './OrderBook.scss';
import { messages } from './messages';

function OrderBook() {
  const {
    currentTP: {
      currency,
      tradedCurrency,
      lastPrice,
      offersSell,
      offersBuy,
      offersSellTotal,
      offersBuyTotal,
    },
  } = useStore();
  const getLn = useLocalization(__filename, messages);

  const currentPriceClassname = detectNilEquality({
    num: lastPrice,
    onLess: styles.down,
    onMore: styles.up,
  });

  const maxTotal = Math.max(offersSellTotal, offersBuyTotal);

  return (
    <div className={styles.block}>
      <div className={styles.blockInner}>
        <div className={styles.header}>{getLn(messages.orderBook)}</div>
        <div className={styles.body}>
          <div className={styles.tableHeader}>
            <div className={styles.cell}>
              {getLn(messages.price)} ({tradedCurrency})
            </div>
            <div className={styles.cell}>
              {getLn(messages.amount)} ({currency})
            </div>
            <div className={styles.cell}>
              {getLn(messages.total)} ({tradedCurrency})
            </div>
          </div>
          <OffersTable
            maxTotal={maxTotal}
            dataArray={offersSell}
            dataTotal={offersSellTotal}
            tradedCurrency={tradedCurrency}
            rowClassName={styles.sell}
            reverseTotal
          />
          <div className={cn(styles.currentPriceRow, currentPriceClassname)}>
            {precise(lastPrice, tradedCurrency)}
          </div>
          <OffersTable
            maxTotal={maxTotal}
            dataArray={offersBuy}
            dataTotal={offersBuyTotal}
            tradedCurrency={tradedCurrency}
            rowClassName={styles.buy}
          />
        </div>
      </div>
    </div>
  );
}

export const OrderBookConnected = observer(OrderBook);

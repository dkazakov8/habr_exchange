import React from 'react';

import { GlobalLoader } from 'components/GlobalLoader';

import { ChartConnected } from './Chart';
import { TPInfoConnected } from './TPInfo';
import { OrderBookConnected } from './OrderBook';
import { MarketsListConnected } from './MarketList';

import styles from './MarketDetailed.scss';

export function MarketDetailed({ isLoading }) {
  return (
    <div className={styles.contentWrapper}>
      <GlobalLoader isLoading={isLoading} />
      <TPInfoConnected />
      <OrderBookConnected />
      <ChartConnected />
      <MarketsListConnected />
    </div>
  );
}

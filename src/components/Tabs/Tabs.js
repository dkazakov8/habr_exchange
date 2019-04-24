import React from 'react';
import cn from 'classnames';

import { routes } from 'routes';

import { LinkConnected } from 'components/Link';

import styles from './Tabs.scss';

export function Tabs({ listArray, currentPair, currentTab }) {
  const tabStyle = { width: `${100 / listArray.length}%` };

  return (
    <div className={styles.tabs}>
      {listArray.map(symbol => (
        <LinkConnected
          key={symbol}
          route={routes.marketDetailed}
          params={{
            market: symbol,
            pair: currentPair || 'btc-usd',
          }}
          style={tabStyle}
          className={cn({
            [styles.tab]: true,
            [styles.active]: currentTab === symbol,
          })}
          id={`marketTab-${symbol}`}
        >
          {symbol}
        </LinkConnected>
      ))}
    </div>
  );
}

import React from 'react';
import cn from 'classnames';

import { useStore } from 'hooks';
import { detectNilEquality, formatPercentage, precise, observer } from 'utils';
import { LinkConnected } from 'components/Link';

import styles from './MarketList.scss';
import { routes } from 'routes';

function PairsList() {
  const {
    marketsList: { list },
    currentTP,
  } = useStore();
  const numericCellClassName = cn(styles.cell, styles.alignRight);

  return (
    <div className={styles.tableBody}>
      {list.map((TPInfo, index) => {
        const {
          currency,
          tradedCurrency,
          lastPrice,
          change24hPercentage,
        } = TPInfo;
        const highlightedCellClassName = detectNilEquality({
          num: change24hPercentage,
          onMore: styles.up,
          onLess: styles.down,
        });

        const isActive =
          currency === currentTP.currency &&
          tradedCurrency === currentTP.tradedCurrency;

        return (
          <LinkConnected
            key={index}
            route={routes.marketDetailed}
            params={{
              market: tradedCurrency,
              pair: `${currency}-${tradedCurrency}`,
            }}
            className={cn(styles.row, isActive && styles.active)}
          >
            <div className={styles.cell}>
              {currency} / {tradedCurrency}
            </div>
            <div className={cn(numericCellClassName, highlightedCellClassName)}>
              {precise(lastPrice, tradedCurrency)}
            </div>
            <div className={cn(numericCellClassName, highlightedCellClassName)}>
              {formatPercentage(change24hPercentage)}
            </div>
          </LinkConnected>
        );
      })}
    </div>
  );
}

export const PairsListConnected = observer(PairsList);

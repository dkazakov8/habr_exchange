import React from 'react';
import cn from 'classnames';

import { observer } from 'utils';
import { useLocalization } from 'hooks';

import { TogglersConnected } from './Togglers';
import { PairsListConnected } from './PairsList';
import { MarketTabsConnected } from './MarketTabs';

import styles from './MarketList.scss';
import { messages } from './messages';

function MarketsList() {
  const getLn = useLocalization(__filename, messages);

  const numericCellClassName = cn(styles.cell, styles.alignRight);

  return (
    <div className={styles.block}>
      <div className={styles.blockInner}>
        <div className={styles.header}>
          {getLn(messages.marketsList)}
          <TogglersConnected />
        </div>
        <MarketTabsConnected />
        <div className={styles.body}>
          <div className={styles.tableHeader}>
            <div className={styles.cell}>{getLn(messages.pair)}</div>
            <div className={numericCellClassName}>{getLn(messages.price)}</div>
            <div className={numericCellClassName}>{getLn(messages.change)}</div>
          </div>
          <PairsListConnected />
        </div>
      </div>
    </div>
  );
}

export const MarketsListConnected = observer(MarketsList);

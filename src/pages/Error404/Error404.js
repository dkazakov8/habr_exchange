import React from 'react';

import { routes } from 'routes';
import { LinkConnected } from 'components/Link';

import styles from './Error404.scss';

export function Error404() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>404</div>
      <div className={styles.text}>
        Try{' '}
        <LinkConnected
          route={routes.marketDetailed}
          params={{
            market: 'usd',
            pair: 'eth-usd',
          }}
        >
          this link
        </LinkConnected>
      </div>
    </div>
  );
}

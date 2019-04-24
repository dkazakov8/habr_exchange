import { observer } from 'utils';
import { useStore } from 'hooks';

import { Tabs } from 'components/Tabs';

function MarketTabs() {
  const store = useStore();
  const currentTab = store.marketsList.currentMarket;
  const currentPair = store.currentTP.urlName;

  return Tabs({
    listArray: store.marketsList.availableMarkets,
    currentTab,
    currentPair,
  });
}

export const MarketTabsConnected = observer(MarketTabs);

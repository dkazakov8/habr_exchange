import { makeObservable } from 'utils';
import { request, apiRoutes } from 'api';

@makeObservable
export class MarketsListStore {
  /**
   * @param rootStore {RootStore}
   */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  list = [];
  symbolsList = [];
  currentMarket = null;
  availableMarkets = ['btc', 'eth', 'usd'];

  fetchSymbolsList() {
    if (this.symbolsList.length > 0) {
      return Promise.resolve();
    }

    return request(apiRoutes.symbolsList)
      .then(this.fetchSymbolsSuccess)
      .catch(this.fetchSymbolsError);
  }
  fetchSymbolsSuccess(data) {
    this.symbolsList = data;
  }
  fetchSymbolsError(error) {
    console.error(error);
  }

  fetchMarketList(market, prevMarket) {
    const requestParams = {
      vs_currency: market.toLocaleLowerCase(),
      order: 'market_cap_desc',
      per_page: 13,
      page: 1,
      sparkline: false,
    };

    return request(apiRoutes.marketsList, requestParams)
      .then(data => this.fetchMarketListSuccess(data, requestParams))
      .catch(error => this.fetchMarketListError(error, prevMarket));
  }
  fetchMarketListSuccess(data, requestParams) {
    let hasDuplicatedValues = false;

    const listData = data.reduce((arr, symbolData) => {
      const { symbol, current_price, price_change_percentage_24h } = symbolData;

      if (symbol === requestParams.vs_currency) {
        hasDuplicatedValues = true;

        return arr;
      }

      arr.push({
        currency: symbol,
        tradedCurrency: requestParams.vs_currency,
        change24hPercentage: price_change_percentage_24h,
        lastPrice: current_price,
      });

      return arr;
    }, []);

    this.list = hasDuplicatedValues ? listData : listData.slice(1);
  }
  fetchMarketListError(error, prevMarket) {
    this.currentMarket = prevMarket;

    console.error(error);
  }
}

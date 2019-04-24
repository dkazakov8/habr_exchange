import _ from 'lodash';

import { sum, makeObservable, precise } from 'utils';
import { apiRoutes, request } from 'api';

@makeObservable
export class CurrentTPStore {
  /**
   * @param rootStore {RootStore}
   */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  id = '';
  symbol = '';
  fullName = '';
  currency = '';
  tradedCurrency = '';
  low24h = 0;
  high24h = 0;
  lastPrice = 0;
  marketCap = 0;
  change24h = 0;
  change24hPercentage = 0;
  offersSell = [];
  offersBuy = [];
  chartPrices = [];
  chartVolumes = [];

  get name() {
    if (!this.currency) {
      return '';
    }

    return `${this.currency} / ${this.tradedCurrency}`;
  }
  get urlName() {
    if (!this.currency) {
      return '';
    }

    return `${this.currency.toLocaleLowerCase()}-${this.tradedCurrency.toLocaleLowerCase()}`;
  }
  get usdValue() {
    const { rates } = this.rootStore;

    if (!this.symbol || !rates.rates[this.symbol]) {
      return 0;
    }

    const usdRate = rates.rates.usd.value;
    const currentRate = rates.rates[this.symbol].value;

    return `$${precise(usdRate / currentRate, 'usd')}`;
  }
  get offersSellTotal() {
    if (this.offersSell.length === 0) {
      return 0;
    }

    return this.offersSell.map(({ total }) => total).reduce(sum);
  }
  get offersBuyTotal() {
    if (this.offersSell.length === 0) {
      return 0;
    }

    return this.offersBuy.map(({ total }) => total).reduce(sum);
  }

  fetchSymbol(params) {
    const { symbol, tradedCurrency } = params;
    const { marketsList } = this.rootStore;

    if (this.symbol === symbol) {
      return Promise.resolve();
    }

    const symbolData = marketsList.symbolsList.find(v => v.symbol === symbol);

    if (!symbolData) {
      console.error(`fetchSymbol: no symbol data for ${symbol}`);

      return Promise.resolve();
    }

    const requestParams = {
      id: symbolData.id,
      localization: false,
      community_data: false,
      developer_data: false,
      tickers: false,
    };

    return request(apiRoutes.symbolInfo, requestParams)
      .then(data => this.fetchSymbolSuccess(data, tradedCurrency))
      .catch(this.fetchSymbolError);
  }
  fetchSymbolSuccess(data, tradedCurrency) {
    const {
      id,
      symbol,
      name,
      market_data: {
        high_24h,
        low_24h,
        price_change_24h_in_currency,
        price_change_percentage_24h_in_currency,
        market_cap,
        current_price,
      },
    } = data;

    this.id = id;
    this.symbol = symbol;
    this.fullName = name;
    this.currency = symbol;
    this.tradedCurrency = tradedCurrency;
    this.lastPrice = current_price[tradedCurrency];
    this.high24h = high_24h[tradedCurrency];
    this.low24h = low_24h[tradedCurrency];
    this.change24h = price_change_24h_in_currency[tradedCurrency];
    this.change24hPercentage =
      price_change_percentage_24h_in_currency[tradedCurrency];
    this.marketCap = market_cap[tradedCurrency];

    this._generateOrders();

    return this.fetchChartData();
  }
  fetchSymbolError(error) {
    console.error(error);
  }

  fetchChartData() {
    const requestParams = {
      id: this.id,
      vs_currency: this.tradedCurrency,
      days: 200,
    };

    return request(apiRoutes.chartData, requestParams)
      .then(this.fetchChartDataSuccess)
      .catch(this.fetchChartDataError);
  }
  fetchChartDataSuccess(data) {
    const prices = [];

    for (let i = 0; i < data.prices.length; i += 1) {
      const prevClose = _.get(data.prices[i - 1], '[1]') || 0;
      const [date, close] = data.prices[i];
      const open = prevClose;

      let high = _.random(0.00001, open / 10);
      if (open > close) {
        high += open;
      } else {
        high += close;
      }

      let low = _.random(0.00001, open / 10);
      if (open > close) {
        low = close - low;
      } else {
        low = open - low;
      }

      prices.push([date, open, high, low, close]);
    }

    this.chartPrices = prices;
    this.chartVolumes = data.total_volumes;
  }
  fetchChartDataError(error) {
    console.error(error);
  }

  _generateOrders() {
    const offersSell = [];
    const offersBuy = [];

    let priceSell = this.lastPrice;
    let priceBuy = this.lastPrice;

    _.range(6).forEach(() => {
      priceSell += _.random(0.00001, priceSell / 100);
      priceBuy -= _.random(0.00001, priceBuy / 100);

      const amountSell = _.random(1, 100);
      const amountBuy = _.random(1, 100);

      offersSell.push({
        price: priceSell,
        amount: amountSell,
        total: priceSell * amountSell,
      });

      offersBuy.push({
        price: priceBuy,
        amount: amountBuy,
        total: priceBuy * amountBuy,
      });
    });

    this.offersSell = offersSell.sort((a, b) => b.price - a.price);
    this.offersBuy = offersBuy;
  }
}

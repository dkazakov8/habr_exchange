import _ from 'lodash';

import {
  omitParam,
  validateRequestParams,
  makeRequestUrl,
  makeRequest,
  validateResponse,
  startMetrics,
  stopMetrics,
} from 'api/utils';

export const apiRoutes = {
  symbolInfo: {
    url: params => `https://api.coingecko.com/api/v3/coins/${params.id}`,
    params: {
      id: omitParam,
      localization: _.isBoolean,
      community_data: _.isBoolean,
      developer_data: _.isBoolean,
      tickers: _.isBoolean,
    },
    responseObject: {
      id: _.isString,
      name: _.isString,
      symbol: _.isString,
      genesis_date: v => _.isString(v) || _.isNil(v),
      last_updated: _.isString,
      country_origin: _.isString,

      coingecko_rank: _.isNumber,
      coingecko_score: _.isNumber,
      community_score: _.isNumber,
      developer_score: _.isNumber,
      liquidity_score: _.isNumber,
      market_cap_rank: _.isNumber,
      block_time_in_minutes: _.isNumber,
      public_interest_score: _.isNumber,

      image: _.isPlainObject,
      links: _.isPlainObject,
      description: _.isPlainObject,
      market_data: _.isPlainObject,
      localization(value, requestParams) {
        if (requestParams.localization === false) {
          return true;
        }

        return _.isPlainObject(value);
      },
      community_data(value, requestParams) {
        if (requestParams.community_data === false) {
          return true;
        }

        return _.isPlainObject(value);
      },
      developer_data(value, requestParams) {
        if (requestParams.developer_data === false) {
          return true;
        }

        return _.isPlainObject(value);
      },
      public_interest_stats: _.isPlainObject,

      tickers(value, requestParams) {
        if (requestParams.tickers === false) {
          return true;
        }

        return _.isArray(value);
      },
      categories: _.isArray,
      status_updates: _.isArray,
    },
  },
  symbolsList: {
    url: 'https://api.coingecko.com/api/v3/coins/list',
    responseArray: {
      id: _.isString,
      symbol: _.isString,
      name: _.isString,
    },
  },
  rates: {
    url: 'https://api.coingecko.com/api/v3/exchange_rates',
    responseObject: {
      rates: _.isPlainObject,
    },
  },
  chartData: {
    url: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
    params: {
      vs_currency: _.isString,
      id: _.isString,
      days: v => _.isNumber(v) || _.isString(v),
    },
    responseObject: {
      prices: _.isArray,
      total_volumes: _.isArray,
    },
  },
  marketsList: {
    url: 'https://api.coingecko.com/api/v3/coins/markets',
    params: {
      vs_currency: _.isString,
      order: _.isString,
      per_page: _.isNumber,
      page: _.isNumber,
      sparkline: _.isBoolean,
    },
    responseArray: {
      id: _.isString,
      symbol: _.isString,
      name: _.isString,
      image: _.isString,
      current_price: _.isNumber,
      market_cap: _.isNumber,
      market_cap_rank: _.isNumber,
      total_volume: _.isNumber,
      high_24h: _.isNumber,
      low_24h: _.isNumber,
      price_change_24h: _.isNumber,
      price_change_percentage_24h: _.isNumber,
      market_cap_change_24h: _.isNumber,
      market_cap_change_percentage_24h: _.isNumber,
      circulating_supply: _.isNumber,
    },
  },
};

export function request(route, params) {
  return Promise.resolve()
    .then(startMetrics(route, apiRoutes))
    .then(validateRequestParams(route, params))
    .then(makeRequestUrl(route, params))
    .then(makeRequest)
    .then(validateResponse(route, params))
    .then(stopMetrics(route, apiRoutes))
    .catch(error => {
      stopMetrics(route, apiRoutes)();

      throw error;
    });
}

export const routes = {
  marketDetailed: {
    name: 'marketDetailed',
    path: '/market/:market/:pair',
    masks: {
      pair: /^[a-zA-Z]{3,5}-[a-zA-Z]{3}$/,
      market: /^[a-zA-Z]{3,4}$/,
    },
    beforeEnter(route, store) {
      const {
        params: { pair, market },
      } = route;
      const [symbol, tradedCurrency] = pair.split('-');
      const prevMarket = store.marketsList.currentMarket;

      function optimisticallyUpdate() {
        store.marketsList.currentMarket = market;
      }

      return Promise.resolve()
        .then(optimisticallyUpdate)
        .then(store.marketsList.fetchSymbolsList)
        .then(store.rates.fetchRates)
        .then(() => store.marketsList.fetchMarketList(market, prevMarket))
        .then(() =>
          store.currentTP.fetchSymbol({
            symbol,
            tradedCurrency,
          })
        )
        .catch(error => {
          console.error(error);
        });
    },
  },
  error404: {
    name: 'error404',
    path: '/error404',
  },
};

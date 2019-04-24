import { makeObservable } from 'utils';
import { apiRoutes, request } from 'api';

@makeObservable
export class RatesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  rates = {};

  fetchRates() {
    if (this.rates.length > 0) {
      return Promise.resolve();
    }

    return request(apiRoutes.rates)
      .then(this.fetchRatesSuccess)
      .catch(this.fetchRatesError);
  }
  fetchRatesSuccess(data) {
    this.rates = data.rates;
  }
  fetchRatesError(error) {
    console.error(error);
  }
}

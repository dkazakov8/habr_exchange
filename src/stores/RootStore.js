import { I18nStore } from './I18nStore';
import { RatesStore } from './RatesStore';
import { GlobalStore } from './GlobalStore';
import { RouterStore } from './RouterStore';
import { CurrentTPStore } from './CurrentTPStore';
import { MarketsListStore } from './MarketsListStore';

/**
 * @name RootStore
 */
export class RootStore {
  constructor() {
    this.i18n = new I18nStore(this);
    this.rates = new RatesStore(this);
    this.global = new GlobalStore(this);
    this.router = new RouterStore(this);
    this.currentTP = new CurrentTPStore(this);
    this.marketsList = new MarketsListStore(this);
  }
}

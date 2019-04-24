import { makeObservable, setTheme } from 'utils';
import themes from 'styles/themes.scss';

const themesList = Object.keys(themes);

@makeObservable
export class GlobalStore {
  /**
   * @param rootStore {RootStore}
   */
  constructor(rootStore) {
    this.rootStore = rootStore;

    this.setTheme(themesList[0]);
  }

  shouldAppRender = false;
  themesList = themesList;
  currentTheme = '';

  setTheme(theme) {
    this.currentTheme = theme;
    document.body.className = theme;
    setTheme(theme);
  }
}

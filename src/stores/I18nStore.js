import { makeObservable } from 'utils';
import ru from 'localization/ru.json';
import en from 'localization/en.json';

const languages = {
  ru,
  en,
};

const languagesList = Object.keys(languages);

@makeObservable
export class I18nStore {
  /**
   * @param rootStore {RootStore}
   */
  constructor(rootStore) {
    this.rootStore = rootStore;

    setTimeout(() => {
      this.setLocalization('ru');
    }, 500);
  }

  i18n = {};
  languagesList = languagesList;
  currentLanguage = '';

  setLocalization(language) {
    this.currentLanguage = language;
    this.i18n = languages[language];
    this.rootStore.global.shouldAppRender = true;
  }
}

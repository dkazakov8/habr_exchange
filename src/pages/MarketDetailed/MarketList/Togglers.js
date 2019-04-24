import React from 'react';
import cn from 'classnames';

import { useStore } from 'hooks';
import { observer } from 'utils';

import styles from './MarketList.scss';

function Togglers() {
  const {
    i18n: { languagesList, currentLanguage, setLocalization },
    global: { currentTheme, themesList, setTheme },
  } = useStore();

  return (
    <div className={styles.themeBlock}>
      {themesList.map(theme => (
        <div
          key={theme}
          id={`themeSwitcher-${theme}`}
          className={cn(
            styles.themeToggler,
            styles[theme],
            theme === currentTheme && styles.active
          )}
          onClick={() => setTheme(theme)}
        />
      ))}
      {languagesList.map(lang => (
        <div
          key={lang}
          id={`langSwitcher-${lang}`}
          className={cn(
            styles.lnToggler,
            styles[lang],
            lang === currentLanguage && styles.active
          )}
          onClick={() => setLocalization(lang)}
        />
      ))}
    </div>
  );
}

export const TogglersConnected = observer(Togglers);

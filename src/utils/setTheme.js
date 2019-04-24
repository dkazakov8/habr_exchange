import themes from 'styles/themes.scss';

const root = document.documentElement;

export function setTheme(theme) {
  Object.entries(themes[theme]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

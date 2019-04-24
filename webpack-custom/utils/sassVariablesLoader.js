function convertSourceToJsObject(source) {
  const themesObject = {};
  const fullThemesArray = source.match(/\.([^}]|\s)*}/g) || [];

  fullThemesArray.forEach(fullThemeStr => {
    const theme = fullThemeStr.match(/\.\w+\s{/g)[0].replace(/\W/g, '');
    themesObject[theme] = {};

    const variablesMatches = fullThemeStr.match(/--(.*:[^;]*)/g) || [];

    variablesMatches.forEach(varMatch => {
      const [key, value] = varMatch.split(': ');
      themesObject[theme][key] = value;
    });
  });

  return themesObject;
}

function checkThemesEquality(themes) {
  const themesArray = Object.keys(themes);

  themesArray.forEach(themeStr => {
    const themeObject = themes[themeStr];
    const otherThemesArray = themesArray.filter(t => t !== themeStr);

    Object.keys(themeObject).forEach(variableName => {
      otherThemesArray.forEach(otherThemeStr => {
        const otherThemeObject = themes[otherThemeStr];

        if (!otherThemeObject[variableName]) {
          throw new Error(
            `checkThemesEquality: theme ${otherThemeStr} has no variable ${variableName}`
          );
        }
      });
    });
  });
}

module.exports = function sassVariablesLoader(source) {
  const themes = convertSourceToJsObject(source);

  checkThemesEquality(themes);

  return `module.exports = ${JSON.stringify(themes)}`;
};

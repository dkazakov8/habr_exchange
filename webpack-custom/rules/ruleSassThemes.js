const loaderSassTheme = require('../loaders/loaderSassTheme');
const { themesPath } = require('../utils/paths');

module.exports = {
  test: /\.scss$/,
  include: [themesPath],
  use: [loaderSassTheme],
};

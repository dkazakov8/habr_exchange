const loaderCss = require('../loaders/loaderCss');
const loaderStyle = require('../loaders/loaderStyle');
const loaderPostcss = require('../loaders/loaderPostcss');
const loaderExtractCss = require('../loaders/loaderExtractCss');

const { sourcePath, themesPath } = require('../utils/paths');
const { getParamAsBoolean } = require('../utils/envParams');

module.exports = {
  test: /\.scss$/,
  include: [sourcePath],
  exclude: [themesPath],
  use: [
    !getParamAsBoolean('CSS_EXTRACT') && loaderStyle,
    getParamAsBoolean('CSS_EXTRACT') && loaderExtractCss,
    loaderCss,
    loaderPostcss,
  ].filter(Boolean),
};

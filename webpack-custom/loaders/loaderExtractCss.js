/**
 * @docs: https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { getParamAsBoolean } = require('../utils/envParams');

module.exports = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: getParamAsBoolean('HOT_RELOAD'),
  },
};

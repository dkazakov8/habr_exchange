/**
 * @docs: https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { isProduction } = require('../utils/envParams');

module.exports = new MiniCssExtractPlugin({
  filename: isProduction ? '[name].[contenthash].css' : '[name].css',
});

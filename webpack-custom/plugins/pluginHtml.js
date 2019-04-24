/**
 * @docs: https://github.com/webpack-contrib/webpack-bundle-analyzer
 *
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { templatesPath } = require('../utils/paths');

module.exports = new HtmlWebpackPlugin({
  title: 'Exchange',
  filename: 'index.html',
  template: path.resolve(templatesPath, 'index.html'),
  inject: 'body',
});

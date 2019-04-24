/**
 * @docs: https://webpack.js.org/loaders/svg-inline-loader
 *
 */

const { sourcePath } = require('../utils/paths');

const loaderSvgInline = require('../loaders/loaderSvgInline');

module.exports = {
  test: /\.svg$/,
  include: [sourcePath],
  use: [loaderSvgInline],
};

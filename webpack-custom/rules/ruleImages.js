/**
 * @docs: https://webpack.js.org/loaders/url-loader
 *
 */

const { sourcePath } = require('../utils/paths');

const loaderUrl = require('../loaders/loaderUrl');

module.exports = {
  test: /\.(png|jpg|gif)$/,
  include: [sourcePath],
  use: [loaderUrl],
};

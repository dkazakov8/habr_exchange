/**
 * @docs: https://webpack.js.org/concepts/output
 *
 */

const { distPath } = require('../utils/paths');
const { isProduction, getParam } = require('../utils/envParams');

let publicUrl = getParam('PUBLIC_URL');
publicUrl = publicUrl === 'false' ? '' : publicUrl;

module.exports = {
  path: distPath,
  filename: isProduction ? '[name].[contenthash].js' : '[name].js',
  pathinfo: false,
  publicPath: `${publicUrl}/`,
};

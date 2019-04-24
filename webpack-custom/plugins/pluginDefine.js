/**
 * @docs: https://webpack.js.org/plugins/define-plugin
 *
 */

const webpack = require('webpack');

const { getParam } = require('../utils/envParams');

module.exports = new webpack.DefinePlugin({
  SENTRY_URL: JSON.stringify(getParam('SENTRY_URL')),
  HOT_RELOAD: JSON.stringify(getParam('HOT_RELOAD')),
  PUBLIC_URL: JSON.stringify(getParam('PUBLIC_URL')),
});

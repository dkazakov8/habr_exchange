/**
 * @docs: https://webpack.js.org/configuration/dev-server
 *
 */

const { getParamAsBoolean, getParamAsNumber } = require('../utils/envParams');

module.exports = {
  hot: getParamAsBoolean('HOT_RELOAD'),
  port: getParamAsNumber('DEV_SERVER_PORT'),
  stats: 'errors-only',
  overlay: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  compress: true,
  watchOptions: {
    aggregateTimeout: getParamAsNumber('AGGREGATION_TIMEOUT'),
  },
  clientLogLevel: 'none', // Disable [HRM] logging to console
  historyApiFallback: true,
};

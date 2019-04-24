/**
 * @docs: https://github.com/webpack-contrib/webpack-bundle-analyzer
 *
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { getParamAsNumber } = require('../utils/envParams');

module.exports = new BundleAnalyzerPlugin({
  analyzerMode: 'server',
  analyzerHost: '127.0.0.1',
  analyzerPort: getParamAsNumber('BUNDLE_ANALYZER_PORT'),
  reportFilename: 'report.html',
  defaultSizes: 'parsed',
  openAnalyzer: false,
  generateStatsFile: false,
  statsFilename: 'stats.json',
  statsOptions: null,
  logLevel: 'silent',
});

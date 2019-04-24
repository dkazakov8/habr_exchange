/**
 * @docs: https://github.com/stephencookdev/speed-measure-webpack-plugin
 *
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const { getParamAsBoolean } = require('../utils/envParams');

module.exports = new SpeedMeasurePlugin({
  disable: !getParamAsBoolean('SPEED_ANALYZER'),
  outputFormat: 'human',
});

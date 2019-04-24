const pluginHot = require('./plugins/pluginHot');
const pluginHtml = require('./plugins/pluginHtml');
const pluginClean = require('./plugins/pluginClean');
const pluginDefine = require('./plugins/pluginDefine');
const pluginExtract = require('./plugins/pluginExtract');
const pluginAnalyzer = require('./plugins/pluginAnalyzer');
const pluginSpeedMeasure = require('./plugins/pluginSpeedMeasure');
const pluginCircularDependency = require('./plugins/pluginCircularDependency');

const {
  getParamAsBoolean,
  getParam,
  isProduction,
} = require('./utils/envParams');

module.exports = pluginSpeedMeasure.wrap({
  mode: getParam('NODE_ENV'),
  node: require('./config/configNode'),
  stats: require('./config/configStats'),
  entry: require('./config/configEntry'),
  output: require('./config/configOutput'),
  module: require('./config/configModule'),
  resolve: require('./config/configResolve'),
  devtool: require('./config/configDevTool'),
  devServer: require('./config/configDevServer'),
  performance: require('./config/configPerformance'),
  optimization: require('./config/configOptimization'),
  plugins: [
    isProduction && pluginClean,
    pluginHtml,
    pluginDefine,
    getParamAsBoolean('HOT_RELOAD') && pluginHot,
    getParamAsBoolean('CSS_EXTRACT') && pluginExtract,
    getParamAsBoolean('BUNDLE_ANALYZER') && pluginAnalyzer,
    getParamAsBoolean('CIRCULAR_CHECK') && pluginCircularDependency,
  ].filter(Boolean),
});

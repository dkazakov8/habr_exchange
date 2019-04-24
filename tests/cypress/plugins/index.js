const webpack = require('../../../node_modules/@cypress/webpack-preprocessor');
const webpackConfig = require('../../../webpack-custom/webpack.config');

module.exports = on => {
  const options = webpack.defaultOptions;

  options.webpackOptions.module = webpackConfig.module;
  options.webpackOptions.resolve = webpackConfig.resolve;

  on('file:preprocessor', webpack(options));
};

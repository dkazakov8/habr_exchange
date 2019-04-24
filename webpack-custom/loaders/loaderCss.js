/**
 * @docs: https://github.com/webpack-contrib/css-loader
 *
 */

module.exports = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: true,
    localIdentName: '[folder]__[local]',
  },
};

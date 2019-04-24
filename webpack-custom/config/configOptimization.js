/**
 * @docs: https://webpack.js.org/configuration/optimization
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  runtimeChunk: {
    name: 'runtime',
  },
  chunkIds: 'named',
  moduleIds: 'hashed',
  mergeDuplicateChunks: true,
  splitChunks: {
    cacheGroups: {
      lodash: {
        test: module => module.context.indexOf('node_modules\\lodash') !== -1,
        name: 'lodash',
        chunks: 'all',
        enforce: true,
      },
      sentry: {
        test: module => module.context.indexOf('node_modules\\@sentry') !== -1,
        name: 'sentry',
        chunks: 'all',
        enforce: true,
      },
      highcharts: {
        test: module =>
          module.context.indexOf('node_modules\\highcharts') !== -1,
        name: 'highcharts',
        chunks: 'all',
        enforce: true,
      },
      vendor: {
        test: module => module.context.indexOf('node_modules') !== -1,
        priority: -1,
        name: 'vendor',
        chunks: 'all',
        enforce: true,
      },
    },
  },
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        keep_fnames: true,
      },
    }),
  ],
};
